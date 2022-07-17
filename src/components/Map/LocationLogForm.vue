<script setup lang="ts">
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import useMap from '@/composables/useMap';
import ColorPicker from '@/components/ColorPicker.vue';

const { showLogModal, addLocationLog } = useMap();

const form = ref<HTMLFormElement>();
const labelInput = ref<HTMLFormElement>();

const onAfterEnter = () => {
    labelInput.value?.focus();
};

onClickOutside(form, (): void => {
    const IsColorPickerHidden = !document.querySelector('.pcr-app.visible');

    if (IsColorPickerHidden) {
        setTimeout(() => clearForm(), 0);
    }
});

type FormData = {
    label: string;
    color: string;
    log: string;
};

const formData = ref<FormData>({
    label: '',
    color: '',
    log: '',
});

const isFormValid = computed((): boolean => {
    return !!(formData.value.label && formData.value.log);
});

const clearForm = (): void => {
    formData.value = {
        label: '',
        color: '',
        log: '',
    };

    showLogModal.value = false;
};

const submitHandler = (): void => {
    if (isFormValid.value) {
        const { label, color, log } = formData.value;
        addLocationLog(label, color, log);

        clearForm();
    }
};

const colorPickerHandler = (color: string): void => {
    formData.value.color = color;
};
</script>

<template>
    <Transition name="visibility" @after-enter="onAfterEnter">
        <form v-if="showLogModal" ref="form" autocomplete="off" @submit.prevent="submitHandler">
            <h1>Location log</h1>
            <div class="option">
                <label for="label">Label</label>
                <input
                    id="label"
                    ref="labelInput"
                    v-model="formData.label"
                    type="text"
                    placeholder="An interesting location..."
                />
            </div>
            <div class="option">
                <label for="color-picker">Color</label>
                <ColorPicker id="color-picker" @on-color-picker="colorPickerHandler" />
            </div>
            <div class="option">
                <label for="log">Log</label>
                <textarea id="log" v-model="formData.log" placeholder="2000 years ago..."></textarea>
            </div>
            <button type="submit" :disabled="!isFormValid">Add</button>
        </form>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

form {
    position: fixed;
    top: 45%;
    left: 50%;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1.5rem;
    color: $fa-white;
    background-color: $outer-space;
    border-radius: 0.625rem;
    transform: translate(-50%, -50%);
    @apply shadow-2xl;

    .option {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    h1 {
        margin: 0 auto;
        margin-bottom: 1.3125rem;
        font-size: 1.125rem;
        font-weight: 700;
        color: $fa-white;

        &::first-letter {
            font-weight: 900;
            color: $sienna;
        }
    }

    label {
        min-width: 3.75rem;
    }

    input {
        min-height: 2.25rem;
    }

    textarea {
        min-height: 4.75rem;
        max-height: 7.75rem;
        cursor: auto;
    }

    input,
    textarea {
        min-width: 25ch;
        padding: 0.3125rem;
        line-height: 1rem;
        color: $slite-black;
        border-left: 0.3125rem solid $sienna;
        border-radius: 0.375rem;
        outline: none;

        &:focus {
            box-shadow: 0px 0px 5px $sienna;
        }

        &::placeholder {
            font-size: 0.9375rem;
        }
    }

    button[type='submit'] {
        padding: 0.3125rem 0.9375rem;
        margin: 0 auto;
        margin-top: 1.875rem;
        background-color: $sienna;
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
