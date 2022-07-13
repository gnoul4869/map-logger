<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useMapStore } from '@/stores/useMapStore';
import { useMap } from '@/composables/useMap';
import ColorPicker from '@/components/ColorPicker.vue';

const mapStore = useMapStore();
const { showLocationLog } = storeToRefs(mapStore);

const { addMarker } = useMap();

const label = ref('');
const form = ref<HTMLFormElement>();
const labelInput = ref<HTMLFormElement>();

const clearForm = (): void => {
    label.value = '';
    mapStore.toggleForm(false);
};

onClickOutside(form, (): void => {
    const IsColorPickerHidden = !document.querySelector('.pcr-app.visible');
    if (IsColorPickerHidden) {
        setTimeout(() => clearForm(), 0);
    }
});

const submitHandler = (): void => {
    if (label.value) {
        addMarker(label.value);
        clearForm();
    }
};

const onAfterEnter = () => {
    labelInput.value?.focus();
};
</script>

<template>
    <Transition name="visibility" @after-enter="onAfterEnter">
        <form v-if="showLocationLog" ref="form" autocomplete="off" @submit.prevent="submitHandler">
            <h2>Location log</h2>
            <div class="option">
                <label for="label">Label</label>
                <input id="label" ref="labelInput" v-model="label" type="text" placeholder="An interesting location..." />
            </div>
            <div class="option">
                <label for="color-picker">Color</label>
                <ColorPicker id="color-picker" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 ml-2 fill-taupe-gray cursor-pointer hover:motion-safe:animate-spin"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <div class="option">
                <label for="log">Log</label>
                <textarea id="log"></textarea>
            </div>
            <button type="submit" :disabled="!label">Add</button>
        </form>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

form {
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1.5rem;
    background-color: $outer-space;
    border-radius: 0.625rem;
    transform: translate(-50%, -50%);
    @apply shadow-2xl;

    .option {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    h2 {
        margin: 0 auto;
        margin-bottom: 1.25rem;
        font-weight: 700;
        color: $fa-white;

        &::first-letter {
            font-weight: 900;
            color: coral;
        }
    }

    label {
        width: 3.75rem;
    }

    input {
        padding: 0.3125rem;
        color: $slite-black;
        border-left: 0.3125rem solid coral;
        border-radius: 0.375rem;
        outline: none;

        &:focus {
            box-shadow: 0px 0px 5px coral;
        }

        &::placeholder {
            font-size: 0.9375rem;
        }
    }

    button[type='submit'] {
        padding: 0.3125rem 0.9375rem;
        margin: 0 auto;
        margin-top: 1.875rem;
        background-color: coral;
        border-radius: 0.3125rem;
        outline: none;
        transition: background-color 150ms ease-in-out;

        &:hover,
        &:active {
            background-color: chocolate;
        }

        &:disabled,
        &:disabled:hover {
            color: $davy-grey;
            cursor: not-allowed;
            background-color: $metal-black;
        }
    }
}
</style>
