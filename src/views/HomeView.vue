<script setup lang="ts">
import InfoPanel from '@/components/Panel/MainPanel.vue';
import LeafletMap from '@/components/Map/LeafletMap.vue';
</script>

<template>
    <div class="wrapper">
        <InfoPanel />
        <LeafletMap />
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.wrapper {
    display: grid;
    grid-template-columns: 25% 75%;
    gap: 0;
    min-width: 62.5rem;
    min-height: 100vh;
    padding: 1rem;
    color: $fa-white;
    background-color: $dark;
}
</style>
