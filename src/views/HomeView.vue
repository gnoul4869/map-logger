<script setup lang="ts">
import MenuPanel from '@/components/MenuPanel.vue';
import LeafletMap from '@/components/LeafletMap.vue';
import FormModal from '@/components/FormModal.vue';
</script>

<template>
    <div class="wrapper">
        <MenuPanel />
        <LeafletMap />
        <FormModal />
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
