<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import L, { type LatLngExpression } from 'leaflet';
import { computed } from 'vue';

const latitude = ref(9.284059);
const longitude = ref(105.724953);
const coordinates = computed<LatLngExpression>(() => [latitude.value, longitude.value]);

const initializeMap = () => {
    const map = L.map('map').setView(coordinates.value, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coordinates.value).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
};

watch(coordinates, () => {
    initializeMap();
});

onMounted(() => {
    navigator.geolocation?.getCurrentPosition(
        (position) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
        },
        () => {
            initializeMap();
            alert('Could not get your position');
        }
    );
});
</script>

<template>
    <div class="wrapper">
        <div class="menu">
            <h1 class="title">Map Logger</h1>
        </div>
        <div id="map"></div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    gap: 0;
    height: 100vh;
    padding: 1rem;
    color: $fa-white;
    background-color: $dark;

    .menu {
        background-color: $metal-black;
        border-top-left-radius: 0.625rem;
        border-bottom-left-radius: 0.625rem;

        .title {
            padding: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;

            &:first-letter {
                color: coral;
            }
        }
    }

    #map {
        background-color: $raisin-black;
        border-top-right-radius: 0.625rem;
        border-bottom-right-radius: 0.625rem;
    }
}
</style>
