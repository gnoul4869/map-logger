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

<template></template>

<style lang="scss" scoped></style>
