<script setup lang="ts">
import { onMounted, ref } from 'vue';
const emit = defineEmits<{
    (e: 'on-nav-tab', isInfoTab: boolean): void;
}>();

const isInfo = ref(true);

const navHandler = (isInfoTab: boolean): void => {
    isInfo.value = isInfoTab;
    emit('on-nav-tab', isInfoTab);
};

onMounted(() => {
    emit('on-nav-tab', isInfo.value);
});
</script>

<template>
    <div class="nav-container">
        <div :class="['nav-btn', isInfo && 'active']" @click="navHandler(true)">Info</div>
        <span>|</span>
        <div :class="['nav-btn', !isInfo && 'active']" @click="navHandler(false)">List</div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.nav-container {
    display: flex;
    align-items: center;
    margin: 1.875rem 0;
    color: $taupe-gray;
    border: 0.0625rem solid $fa-white;
    border-radius: 1.5625rem;

    .nav-btn {
        padding: 0.5rem 1.875rem;
        cursor: pointer;
        transition: color 0.3s ease-in-out;

        &:hover,
        &.active {
            color: $sienna;
        }
    }
}
</style>
