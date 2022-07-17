<script setup lang="ts">
import useMap from '@/composables/useMap';
import type { Coordinates, LocationLog } from '@/composables/useMap';

const { moveToCoordinates, deleteLocationLog, currentLocationLog } = useMap();
</script>

<template>
    <Transition name="visibility" mode="out-in">
        <div v-if="currentLocationLog" :key="currentLocationLog.id" class="main-container">
            <h1
                class="title"
                :style="{
                    borderTop: `.0625rem solid ${currentLocationLog.color}`,
                    borderBottom: `.0625rem solid ${currentLocationLog.color}`,
                }"
            >
                {{ currentLocationLog.label }}
            </h1>
            <div class="coordinates-container">
                <div><span class="text-begonia">Latitude:</span> {{ currentLocationLog.coordinates.latitude }}</div>
                <div><span class="text-begonia">Longtitude:</span> {{ currentLocationLog.coordinates.longtitude }}</div>
            </div>
            <p class="italic">"{{ currentLocationLog.log }}"</p>
            <div class="btn-container">
                <button @click="moveToCoordinates(currentLocationLog?.coordinates as Coordinates, 18)">View on map</button>
                <button @click="deleteLocationLog(currentLocationLog as LocationLog)">Delete</button>
            </div>
        </div>
        <div v-else class="panel-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                />
            </svg>
            <p>Click on a marker to display information</p>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.main-container {
    width: 100%;
    max-height: 80%;
    padding: 0 15px;
    color: gainsboro;

    .title {
        padding: 5px 0;
        margin-bottom: 0.3125rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: $fa-white;
        text-align: center;
        border-top: 0.0625rem solid;
    }

    .coordinates-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap-reverse;
        max-width: max-content;
        margin: 20px auto;
        font-size: 1rem;
    }

    p {
        font-size: 1.125rem;
        color: papayawhip;
    }

    .btn-container {
        display: flex;
        gap: 2.5rem;
        justify-content: center;
        margin-top: 2rem;
        color: $taupe-gray;

        button {
            outline: none;
            transition: color 0.25s ease-out;

            &:first-child:hover {
                color: $v-green;
            }

            &:nth-child(2):hover {
                color: $tart-orange;
            }
        }
    }
}
</style>
