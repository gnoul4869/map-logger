<script setup lang="ts">
import useMap from '@/composables/useMap';

const { locationLogList } = useMap();

const truncate = (str: string) => {
    return str.length <= 120 ? str : str.substring(0, 120) + '...';
};
</script>

<template>
    <div v-if="locationLogList.length">
        <div
            v-for="locationLog in locationLogList.slice().reverse()"
            :key="locationLog.id"
            class="log-container"
            :style="{ borderLeft: `.3125rem solid ${locationLog.color}` }"
        >
            <h1 class="title">{{ locationLog.label }}</h1>
            <div class="text-start ml-2">
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
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.log-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 80%;
    padding: 0.3125rem 0.125rem;
    padding-right: 0.5rem;
    margin: 1.25rem 0.625rem 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: gainsboro;
    text-align: center;
    background-color: $metal-black;
    border: 0.0625rem solid gainsboro;

    border-radius: 0.625rem;

    .title {
        margin-bottom: 0.3125rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: $fa-white;
    }
}
</style>
