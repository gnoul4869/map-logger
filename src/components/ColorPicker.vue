<script setup lang="ts">
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';
import { onMounted } from 'vue';

onMounted(() => {
    Pickr.create({
        el: '.pickr',
        container: 'body',
        theme: 'nano',
        default: '#d7734f',
        autoReposition: true,
        swatches: null,
        components: {
            // Defines if the palette itself should be visible.
            // Will be overwritten with true if preview, opacity or hue are true
            palette: true,
            // Display comparison between previous state and new color
            preview: true,
            // Display opacity slider
            opacity: false,
            // Display hue slider
            hue: true,

            // Input / output Options
            interaction: {
                // Display 'input/output format as hex' button  (hexadecimal representation of the rgba value)
                hex: false,
                // Display 'input/output format as rgba' button (red green blue and alpha)
                rgba: false,
                // Display 'input/output format as hsla' button (hue saturation lightness and alpha)
                hsla: false,
                // Display 'input/output format as hsva' button (hue saturation value and alpha)
                hsva: false,
                // Display 'input/output format as cmyk' button (cyan mangenta yellow key)
                cmyk: false,
                // Display input/output textbox which shows the selected color value.
                // the format of the input is determined by defaultRepresentation,
                // and can be changed by the user with the buttons set by hex, rgba, hsla, etc (above).
                input: true,
                // Display Cancel Button, resets the color to the previous state
                cancel: false,
                // Display Clear Button; same as cancel, but keeps the window open
                clear: false,
                // Display Save Button
                save: false,
            },
        },
    });
});
</script>

<template>
    <div class="pickr"></div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.pickr {
    transform: translateY(-0.0625rem);
}

.pcr-button {
    border: 0.125rem solid $metal-black;
    outline: none;
    box-shadow: none !important;
}

.pcr-app {
    color: $fa-white;
    background-color: $metal-black;
    border-radius: 0.625rem;

    .pcr-current-color {
        border: 0.0625rem solid $metal-black;
    }

    .pcr-color-chooser {
        top: 0.625rem;
        margin: 0 0.8125rem 0 0.75rem !important;
    }

    .pcr-interaction {
        input {
            padding: 0.3125rem;
            margin: 0 0.3125rem;
            font-weight: 500;
            color: $dark;
            border-radius: 0.625rem !important;
            outline: none;
            box-shadow: none !important;
        }
    }
}
</style>
