<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import useMap from '@/composables/useMap';

const { moveToCoordinates, locationLogList } = useMap();

const mainContainer = ref<HTMLElement | null>(null);
const numberOfLocations = computed(() => locationLogList.value.length);

watch(numberOfLocations, (newValue, oldValue): void => {
    if (newValue > oldValue && mainContainer.value) {
        mainContainer.value.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

const truncate = (str: string) => {
    return str.length <= 40 ? str : str.substring(0, 40) + '...';
};

const setBorderColor = (e: MouseEvent, color: string, isOnEnter: boolean) => {
    const target = e.target as HTMLElement;

    if (!target) return;

    if (isOnEnter) {
        target.style.border = `0.0625rem solid ${color}`;
    } else {
        target.style.border = `0.0625rem solid gainsboro`;
        target.style.borderLeft = `.3125rem solid ${color}`;
    }
};
</script>

<template>
    <div ref="mainContainer" class="main-container">
        <div v-if="locationLogList.length">
            <div
                v-for="(locationLog, index) in locationLogList.slice().reverse()"
                :key="locationLog.id"
                class="log-container"
                :style="{ borderLeft: `.3125rem solid ${locationLog.color}` }"
                @mouseenter="setBorderColor($event, locationLog.color, true)"
                @mouseleave="setBorderColor($event, locationLog.color, false)"
                @click="moveToCoordinates(locationLog.coordinates)"
            >
                <div class="id">#{{ locationLogList.length - index }}</div>
                <h1 class="title">{{ locationLog.label }}</h1>
                <div class="text-sm text-start ml-2">
                    <div><span class="text-begonia">Latitude:</span> {{ locationLog.coordinates.latitude }}</div>
                    <div><span class="text-begonia">Longtitude:</span> {{ locationLog.coordinates.longtitude }}</div>
                </div>
                <p class="italic">"{{ truncate(locationLog.log) }}"</p>
            </div>
        </div>
        <div v-else class="panel-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                    clip-rule="evenodd"
                />
            </svg>
            <p>There is no location log available</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.main-container {
    width: 100%;
    max-height: 80%;
    padding: 0 0.3125rem;
    overflow: scroll;
}

.log-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 80%;
    padding: 0.3125rem;
    padding-right: 0.5rem;
    margin: 0 0.625rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: gainsboro;
    text-align: center;
    cursor: pointer;
    background-color: $raisin-black;
    border: 0.0625rem solid gainsboro;
    border-radius: 0.375rem;
    transition: border 0.25s ease-in-out;

    .id {
        position: absolute;
        top: 0.1875rem;
        left: 0.375rem;
        font-size: 0.875rem;
        font-weight: 300;
        color: $taupe-gray;
    }

    .title {
        margin-bottom: 0.3125rem;
        font-weight: 500;
        color: $fa-white;
    }
}
</style>
