<script setup lang="ts">
import InfoPanel from '@/components/InfoPanel.vue';
import LeafletMap from '@/components/LeafletMap.vue';
import FormModal from '@/components/FormModal.vue';
</script>

<template>
    <div class="wrapper">
        <InfoPanel />
        <LeafletMap />
        <FormModal />
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.wrapper {
    display: grid;
    grid-template-columns: 22% 78%;
    gap: 0;
    min-height: 100vh;
    padding: 1rem;
    color: $fa-white;
    background-color: $dark;
}
</style>
