<h1>Color Palette</h1>

<div class="palette">
    <div class="color-square" style="background-color: var(--bg-primary);">
        --bg-primary
    </div>
    <div class="color-square dark-text" style="background-color: var(--bg-primary-translucent);">
        --bg-primary-translucent
    </div>
    <div class="color-square" style="background-color: var(--fg-primary);">
        --fg-primary
    </div>
    <div class="color-square" style="background-color: var(--bg-dark-primary);">
        --bg-dark-primary
    </div>
    <div class="color-square" style="background-color: var(--fg-dark-primary);">
        --fg-dark-primary
    </div>
    <div class="color-square dark-text" style="background-color: var(--bg-warning);">
        --bg-warning
    </div>
    <div class="color-square dark-text" style="background-color: var(--fg-warning);">
        --fg-warning
    </div>
    <div class="color-square dark-text" style="background-color: var(--bg-error);">
        --bg-error
    </div>
    <div class="color-square" style="background-color: var(--fg-error);">
        --fg-error
    </div>
    <div class="color-square" style="background-color: var(--bg-success);">
        --bg-success
    </div>
    <div class="color-square" style="background-color: var(--fg-success);">
        --fg-success
    </div>
    <div class="color-square dark-text" style="background-color: var(--bg-neutral);">
        --bg-neutral
    </div>
    <div class="color-square" style="background-color: var(--fg-neutral);">
        --fg-neutral
    </div>
</div>


<style>
    :root {
        --bg-primary: #30b9b3;
        --fg-primary: #2c004b;
        --bg-dark-primary: #7bbbb0;
        --fg-dark-primary: #2f3040;
        --bg-warning: #fff7b3;
        --fg-warning: #a85400;
        --bg-error: #ffa08f;
        --fg-error: #940000;
        --bg-success: #6bff6b;
        --fg-success: #006600;
        --bg-neutral: #ffffff;
        --fg-neutral: #000000;
    }

    .palette {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: var(--bg-neutral);
        color: var(--fg-neutral);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
    }

    .color-square {
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        font-size: 14px;
        color: white;
    }

    .color-square.dark-text {
        color: black;
    }
</style>