<script setup lang="ts">
import { onMounted } from 'vue';
import { useMap } from '@/composables/useMap';

const { initializeMap } = useMap();

onMounted(() => {
    navigator.geolocation?.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            initializeMap(latitude, longitude);
        },
        () => {
            initializeMap();
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
        border-radius: 0.3125rem;
    }

    .leaflet-popup-tip {
        background-color: $metal-black;
    }
}

.popup {
    .leaflet-popup-content-wrapper {
        border-left: 0.3125rem solid coral;
    }
}
</style>
