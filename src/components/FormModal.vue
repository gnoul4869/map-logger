<script setup lang="ts">
import L from 'leaflet';
import { onClickOutside } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useMapStore } from '@/stores/useMapStore';
import { ref, watch, nextTick } from 'vue';

const mapStore = useMapStore();
const { map, mapEvent, showForm } = storeToRefs(mapStore);

const label = ref('');
const form = ref<HTMLFormElement>();
const labelInput = ref<HTMLFormElement>();

const clearForm = (): void => {
    label.value = '';
    mapStore.toggleForm(false);
};

onClickOutside(form, () => setTimeout(() => clearForm(), 0));

watch(showForm, async () => {
    if (showForm.value) {
        await nextTick();
        labelInput.value?.focus();
    }
});

const submitHandler = (): void => {
    if (map.value && mapEvent.value) {
        const customPopup = L.popup({
            autoClose: false,
            className: 'popup',
            closeOnClick: false,
            maxHeight: 30,
            maxWidth: 300,
        });

        L.marker([mapEvent.value.latlng.lat, mapEvent.value.latlng.lng])
            .addTo(mapStore.map as L.Map)
            .bindPopup(customPopup)
            .setPopupContent(label.value)
            .openPopup();

        clearForm();
    }
};
</script>

<template>
    <Transition name="visibility">
        <form v-if="showForm" ref="form" autocomplete="off" @submit.prevent="submitHandler">
            <h2>Location log</h2>
            <div class="block">
                <label for="label">Label</label>
                <input id="label" ref="labelInput" v-model="label" type="text" placeholder="An interesting location..." />
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
        border-radius: 0.5rem;
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
