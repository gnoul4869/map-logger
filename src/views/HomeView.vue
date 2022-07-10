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
    <div class="container">
        <div class="menu">
            <h1 class="title">Map Logger</h1>
        </div>
        <div class="map"></div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.container {
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 0;
    height: 100vh;
    padding: 2rem;
    margin: 0 auto;
    color: $fa-white;

    .menu {
        background-color: $metal-black;

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
        // background-color: #201f1c;
        background-color: $slite-black;
    }
}
</style>
