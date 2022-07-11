<script setup lang="ts">
import L from 'leaflet';
import { onMounted } from 'vue';
import { useMapStore } from '@/stores/useMapStore';

const mapStore = useMapStore();

const DEFAULT_LATITUDE = 9.284059;
const DEFAULT_LONGITUDE = 105.724953;

const initializeMap = (latitude: number, longtitude: number): void => {
    mapStore.map = L.map('map').setView([latitude, longtitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapStore.map as L.Map);

    mapStore.map.on('click', (mE) => {
        mapStore.setMapEvent(mE);
        mapStore.toggleForm(true);
    });
};

onMounted(() => {
    navigator.geolocation?.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            initializeMap(latitude, longitude);
        },
        () => {
            initializeMap(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
        }
    );
});
</script>

<template>
    <div id="map"></div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

#map {
    background-color: $raisin-black;
    border-top-right-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
}

.leaflet-popup {
    .leaflet-popup-content {
        font-size: 0.8125rem;
        line-height: 1rem;
    }

    .leaflet-popup-content-wrapper {
        padding-right: 0.5rem;
        color: $fa-white;
        background-color: $metal-black;
        border-radius: 5px;
    }

    .leaflet-popup-tip {
        background-color: $metal-black;
    }
}

.popup {
    .leaflet-popup-content-wrapper {
        border-left: 5px solid coral;
    }
}
</style>
