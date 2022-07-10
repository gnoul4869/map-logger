<script setup lang="ts">
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log(position);
    },
    (error) => {
        console.log(error);
    }
);
</script>

<template>
    <div class="container-fluid">
        <div class="menu">
            <h1 class="title">Map Logger</h1>
        </div>
        <div class="map"></div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.container-fluid {
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 0;
    height: 100vh;
    padding: 1rem;
    color: $fa-white;

    .menu {
        background-color: $metal-black;
        border-top-left-radius: 0.625rem;
        border-bottom-left-radius: 0.625rem;

        .title {
            padding: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;

            &::first-letter {
                color: coral;
            }
        }
    }

    .map {
        background-color: $slite-black;
        border-top-right-radius: 0.625rem;
        border-bottom-right-radius: 0.625rem;
    }
}
</style>
