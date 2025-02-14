<script>
	import { onMount } from 'svelte';
	import * as ort from 'onnxruntime-web';
	import * as Jimp from 'jimp';

	ort.env.wasm.wasmPaths = {
		'ort-wasm-simd-threaded.wasm': '/ort-wasm-simd-threaded.wasm'
	};

	//ort.env.wasm.wasmPaths = 'https://unpkg.com/onnxruntime-web@dev/dist/';

	// Reactive state variables.
	let image_file; // Holds the selected file(s) from the input.
	let processed_canvas; // The off-screen canvas showing the resized/preprocessed image.
	let crop_canvas; // The canvas containing the cropped insect.
	let processedContainer; // Container DOM element for the preprocessed canvas.
	let cropContainer; // Container DOM element for the cropped image.
	let session; // ONNX InferenceSession for the YOLO model.

	// Load the ONNX model once when the component initializes.
	onMount(async () => {
		try {
			session = await ort.InferenceSession.create('/arthropod_dectector_wave21_best.onnx');
			console.log('ONNX Model loaded successfully.');
		} catch (err) {
			console.error('Failed to load ONNX model:', err);
		}
	});
	// Function to process the image when a file is loaded.

	function IoU(bb1, bb2) {
		let x1 = Math.max(bb1[0], bb2[0]);
		let y1 = Math.max(bb1[1], bb2[1]);
		let x2 = Math.min(bb1[0] + bb1[2], bb2[0] + bb2[2]);
		let y2 = Math.min(bb1[1] + bb1[3], bb2[1] + bb2[3]);

		let intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
		let union = bb1[2] * bb1[3] + bb2[2] * bb2[3] - intersection;

		return intersection / union;
	}

	function postprocess_BB(boundingboxes) {
		console.log('Bounding boxes : ', boundingboxes);
		for (let i = 0; i < boundingboxes.length; i++) {
			let x1 = boundingboxes[i][0];
			let y1 = boundingboxes[i][1];
			let w = boundingboxes[i][2];
			let h = boundingboxes[i][3];

			for (let j = i; j < boundingboxes.length; j++) {
				if (i != j) {
					let x2 = boundingboxes[j][0];
					let y2 = boundingboxes[j][1];
					let w2 = boundingboxes[j][2];
					let h2 = boundingboxes[j][3];

					if (IoU([x1, y1, w, h], [x2, y2, w2, h2]) > 0.5) {
						boundingboxes.splice(j, 1);
						j--;
					}
				}
			}
		}
		return boundingboxes;
	}

	async function imload(files, targetWidth, targetHeight) {
		const float32Data = new Float32Array(targetHeight * targetWidth * 3 * files.length);
		for (let f = 0; f < files.length; f++) {
			let file = files[f];

			var img_tensor = await Jimp.Jimp.read(await file.arrayBuffer());
			img_tensor.resize({ w: targetWidth, h: targetHeight });

			var imageBufferData = img_tensor.bitmap.data;

			const [redArray, greenArray, blueArray] = new Array(new Array(), new Array(), new Array());
			for (let i = 0; i < imageBufferData.length; i += 4) {
				redArray.push(imageBufferData[i]);
				greenArray.push(imageBufferData[i + 1]);
				blueArray.push(imageBufferData[i + 2]);
			}

			const transposedData = redArray.concat(greenArray).concat(blueArray);
			let i,
				l = transposedData.length;

			for (i = 0; i < l; i++) {
				float32Data[f * l + i] = transposedData[i] / 255.0; // convert to float
			}
		}

		console.log('done !');
		var tensor = new ort.Tensor('float32', float32Data, [
			files.length,
			3,
			targetHeight,
			targetWidth
		]);
		return tensor;
	}

	async function processImage() {
		if (image_file && image_file.length > 0) {
			// 1. Ask the user to load the image: get the first file.
			const file = image_file[0];
			console.log('image_file :', image_file);
			console.log('num files : ', image_file.length);
			const img = await createImageBitmap(file);

			// 2. Load and preprocess the image using an off-screen canvas.
			const targetWidth = 640;
			const targetHeight = 640;

			const canvas = document.createElement('canvas');
			canvas.width = targetWidth;
			canvas.height = targetHeight;

			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

			processed_canvas = canvas;

			// Extract pixel data from the canvas.
			const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
			ctx.putImageData(imageData, 0, 0);

			var tensor = await imload(image_file, targetWidth, targetHeight);

			const feeds = { images: tensor };
			let results;
			try {
				console.log('inference...');
				results = await session.run(feeds);
				console.log('done !');
			} catch (err) {
				console.error('Error during inference:', err);
				return;
			}
			console.log('Model results:', results);

			//  Process the model output.
			console.log('postprocessing...');
			let detections = results.output0.data;
			// extract only the dections for the first image :
			detections = detections.slice(0, detections.length / image_file.length);

			let bestScore = -Infinity;
			let bestBox = null;
			const numDetections = detections.length / 5;
			console.log('numDetections : ', numDetections);

			for (let i = 0; i < numDetections; i++) {
				const offset = i * 5;
				const score = detections[offset + 4 * numDetections];

				if (score > bestScore) {
					bestScore = score;
				}
			}
			console.log('Best score : ', bestScore);

			let best_boxes = [];

			for (let i = 0; i < numDetections; i++) {
				const offset = i * 5;
				const score = detections[offset + 4 * numDetections];

				if (score > 0.5 * bestScore && score > 0.2) {
					let x1 = detections[offset];
					let y1 = detections[offset + numDetections];

					let w = detections[offset + 2 * numDetections];
					let h = detections[offset + 3 * numDetections];

					x1 = x1 - w / 2;
					y1 = y1 - h / 2;

					best_boxes.push([x1, y1, w, h]);
				}
			}
			best_boxes = postprocess_BB(best_boxes);

			console.log('Best boxes : ', best_boxes);

			for (let i = 0; i < best_boxes.length; i++) {
				ctx.strokeStyle = 'green';
				ctx.lineWidth = 2;
				ctx.strokeRect(best_boxes[i][0], best_boxes[i][1], best_boxes[i][2], best_boxes[i][3]);
			}

			if (bestScore > 0.2) {
				console.log('Best bounding box:', bestBox);
				// 5. Crop the image to show the insect.
				// Create a new canvas with dimensions matching the bounding box.
				const cropCanvasEl = document.createElement('canvas');
				cropCanvasEl.width = best_boxes[0][2];
				cropCanvasEl.height = best_boxes[0][3];

				const cropCtx = cropCanvasEl.getContext('2d');
				cropCtx.drawImage(
					canvas,
					best_boxes[0][0],
					best_boxes[0][1],
					best_boxes[0][2],
					best_boxes[0][3],
					0,
					0,
					best_boxes[0][2],
					best_boxes[0][3]
				);

				crop_canvas = cropCanvasEl;
			} else {
				console.warn('No bounding box detected.');
			}
		}
	}

	// Reactive statement: when processedContainer and processed_canvas are set,
	// update the container's content to display the preprocessed image.
	$: if (processedContainer && processed_canvas) {
		processedContainer.innerHTML = '';
		processedContainer.appendChild(processed_canvas);
	}

	// Reactive statement: similarly update the container for the cropped image.
	$: if (cropContainer && crop_canvas) {
		cropContainer.innerHTML = '';
		cropContainer.appendChild(crop_canvas);
	}
</script>

<h1>Insect Detection and Cropping with ONNX Runtime</h1>

<!-- Step 1: Ask the user to load an image -->
<input type="file" accept="image/*" bind:files={image_file} on:change={processImage} multiple />

<!-- Step 3: Display the preprocessed image -->
<h2>Preprocessed Image</h2>
<div bind:this={processedContainer}></div>

<!-- Step 5: Display the cropped insect image -->
<h2>Cropped Insect</h2>
<div bind:this={cropContainer}></div>
