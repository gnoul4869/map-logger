<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useMapStore } from '@/stores/useMapStore';
import { useMap } from '@/composables/useMap';

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

onClickOutside(form, () => setTimeout(() => clearForm(), 0));

watch(showLocationLog, async () => {
    if (showLocationLog.value) {
        await nextTick();
        labelInput.value?.focus();
    }
});

const submitHandler = (): void => {
    if (label.value) {
        addMarker(label.value);
        clearForm();
    }
};
</script>

<template>
    <Transition name="visibility">
        <form v-if="showLocationLog" ref="form" autocomplete="off" @submit.prevent="submitHandler">
            <h2>Location log</h2>
            <div class="option">
                <label for="label">Label</label>
                <input id="label" ref="labelInput" v-model="label" type="text" placeholder="An interesting location..." />
            </div>
            <div class="option">
                <label for="color">Color</label>
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
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background-color: $outer-space;
    border-radius: 0.625rem;
    transform: translate(-50%, -50%);
    @apply shadow-2xl;

    .option {
        margin-bottom: 1rem;
    }

    h2 {
        margin-bottom: 20px;
        font-weight: 700;
        color: $fa-white;

        &::first-letter {
            font-weight: 900;
            color: coral;
        }
    }

    label {
        margin-right: 0.9375rem;
    }

    input {
        padding: 0.3125rem;
        color: $slite-black;
        border-left: 5px solid coral;
        border-radius: 0.375rem;
        outline: none;

        &::placeholder {
            font-size: 0.9375rem;
        }
    }

    button[type='submit'] {
        padding: 5px 15px;
        margin-top: 30px;
        background-color: coral;
        border-radius: 5px;
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
