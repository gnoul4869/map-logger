<script setup lang="ts">
import L from 'leaflet';
import { useMapStore } from '@/stores/useMapStore';
import { ref } from 'vue';

const mapStore = useMapStore();

const label = ref('');

const submitHandler = () => {
    if (mapStore.map && mapStore.mapEvent) {
        const customPopup = L.popup({
            autoClose: false,
            className: 'popup',
            closeOnClick: false,
            maxHeight: 30,
            maxWidth: 300,
        });

        L.marker([mapStore.mapEvent?.latlng.lat, mapStore.mapEvent?.latlng.lng])
            .addTo(mapStore.map as L.Map)
            .bindPopup(customPopup)
            .setPopupContent(label.value)
            .openPopup();
    }
};
</script>

<template>
    <div class="menu">
        <h1 class="title">Map Logger</h1>

        <div v-if="mapStore.showForm">
            <form class="form-container" @submit.prevent="submitHandler">
                <div class="block">
                    <label for="label">Label</label>
                    <input id="label" v-model="label" type="text" />
                </div>
                <button type="submit" :disabled="!label">Save</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.menu {
    font-weight: 500;
    background-color: $metal-black;
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;

    .title {
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: $fa-white;
        text-align: center;

        &:first-letter {
            color: coral;
        }
    }

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 2.5rem 0;

        label {
            margin-right: 0.9375rem;
        }

        input {
            padding: 0.3125rem;
            color: $slite-black;
            border-radius: 0.5rem;
            outline: none;
        }

        button[type='submit'] {
            padding: 5px 15px;
            margin-top: 30px;
            background-color: coral;
            border-radius: 5px;

            &:disabled {
                color: $raisin-black;
                background-color: $slite-black;
            }
        }
    }
}
</style>
