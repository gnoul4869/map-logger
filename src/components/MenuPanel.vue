<script setup lang="ts"></script>

<template>
    <div class="menu">
        <h1 class="title">Map Logger</h1>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.menu {
    font-weight: 500;
    background-color: $metal-black;
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;

    .title {
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: $fa-white;
        text-align: center;

        &:first-letter {
            color: coral;
        }
    }
}
</style>
