<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';
import { onMounted, ref } from 'vue';

const DEFAULT_COLOR = '#d7734f';

const pickr = ref<any>(null);

const resetColor = () => {
    pickr.value?.setColor(DEFAULT_COLOR);
};

const initializeColorPicker = (): void => {
    const pickrApp = Pickr.create({
        el: '.pickr',
        container: 'body',
        theme: 'nano',
        default: DEFAULT_COLOR,
        defaultRepresentation: 'HEXA',
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

    pickrApp.on('init', (instance: any) => {
        pickr.value = instance;
    });

    pickrApp.on('hide', (instance: any) => {
        if (instance.getColor().a < 1) return resetColor();

        instance.applyColor();
    });
};

onMounted(() => {
    initializeColorPicker();
});
</script>

<template>
    <div class="flex items-center">
        <div class="pickr"></div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-2 fill-taupe-gray cursor-pointer hover:motion-safe:animate-spin"
            viewBox="0 0 20 20"
            fill="currentColor"
            @click="resetColor"
        >
            <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
            />
        </svg>
    </div>
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
        bottom: 0.125rem;
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
