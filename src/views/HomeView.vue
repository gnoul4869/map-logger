<script setup lang="ts">
import LeafletMap from '@/components/LeafletMap.vue';
</script>

<template>
    <div class="wrapper">
        <div class="menu">
            <h1 class="title">Map Logger</h1>
        </div>
        <LeafletMap />
    </div>
</template>

<style lang="scss">
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
}
</style>
