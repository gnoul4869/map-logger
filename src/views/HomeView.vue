<script setup lang="ts">
import L from 'leaflet';

navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);

        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
    },
    () => {
        alert('Could not get your position');
    }
);
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
        background-color: $slite-black;
        border-top-right-radius: 0.625rem;
        border-bottom-right-radius: 0.625rem;
    }
}
</style>
