<script setup lang="ts">
import UserMenu from '@/components/UserMenu.vue';
import LeafletMap from '@/components/LeafletMap.vue';
</script>

<template>
    <div class="wrapper">
        <UserMenu />
        <LeafletMap />
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.wrapper {
    display: grid;
    grid-template-columns: 25% 75%;
    gap: 0;
    height: 100vh;
    padding: 1rem;
    color: $fa-white;
    background-color: $dark;
}
</style>
