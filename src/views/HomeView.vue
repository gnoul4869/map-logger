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
        <div class="menu"></div>
        <div class="map"></div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: grid;
    grid-template-columns: 2;

    .menu {
        width: 200px;
        height: 100%;
        background-color: red;
    }

    .map {
        width: 500px;
        height: 100%;
        background-color: coral;
    }
}
</style>
