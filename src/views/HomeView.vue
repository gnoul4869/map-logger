<script setup lang="ts">
import MainPanel from '@/components/Panel/MainPanel.vue';
import LeafletMap from '@/components/Map/LeafletMap.vue';
</script>

<template>
    <div class="wrapper">
        <MainPanel />
        <LeafletMap />
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.wrapper {
    display: grid;
    grid-template-columns: 25% 75%;
    min-width: 62.5rem;
    min-height: 100vh;
    max-height: 100vh;
    padding: 1rem;
    background-color: $dark;
}
</style>
