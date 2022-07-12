<script setup lang="ts"></script>

<template>
    <div class="panel">
        <h1 class="title">Map Logger</h1>
        <div class="placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                />
            </svg>
            <p>Click on a marker to display information</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.panel {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-weight: 500;
    background-color: $metal-black;
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;

    .title {
        position: absolute;
        top: 2rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: $fa-white;

        &::first-letter {
            color: coral;
        }
    }

    .placeholder {
        margin: auto 0;
        font-size: 0.9375rem;
        color: #888888;
    }
}
</style>
