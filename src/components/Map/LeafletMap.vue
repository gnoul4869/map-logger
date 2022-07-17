<script setup lang="ts">
import { onMounted } from 'vue';
import useMap from '@/composables/useMap';
import LogModal from '@/components/Map/LogModal.vue';

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
    <LogModal />
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
        color: $fa-white;
    }

    .leaflet-popup-content-wrapper {
        padding-right: 0.5rem;
        background-color: $metal-black;
        border-left: 0.3125rem solid $sienna;
        border-radius: 0.3125rem;
    }

    .leaflet-popup-tip {
        background-color: $metal-black;
    }
}
</style>
