<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

    map.on('click', (mapEvent) => {
        console.log(mapEvent);

        latitude.value = mapEvent.latlng.lat;
        longitude.value = mapEvent.latlng.lng;

        const customPopup = L.popup({
            autoClose: false,
            className: 'popup',
            closeOnClick: false,
            maxHeight: 30,
            maxWidth: 300,
        });

        L.marker(coordinates.value).addTo(map).bindPopup(customPopup).setPopupContent('Hello world').openPopup();
    });
};

onMounted(() => {
    navigator.geolocation?.getCurrentPosition(
        (position) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
        },
        () => {
            alert('Could not get your position');
        }
    );

    initializeMap();
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
