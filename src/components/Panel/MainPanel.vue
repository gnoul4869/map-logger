<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import MarkerInfo from '@/components/Panel/MarkerInfo.vue';
import LocationLogList from '@/components/Panel/LocationLogList.vue';

const isInfo = ref(true);

const onNavTabHandler = (isInfoTab: boolean) => {
    isInfo.value = isInfoTab;
};
</script>

<template>
    <div class="panel">
        <h1 class="title">Map Logger</h1>
        <NavBar @on-nav-tab="onNavTabHandler" />
        <Transition name="visibility">
            <MarkerInfo v-if="isInfo" />
            <LocationLogList v-else />
        </Transition>
        <div class="credit">
            Created by
            <a href="https://github.com/gnoul4869" target="_blank">gnoul_</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.panel {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: calc(100vh - 2rem);
    font-weight: 500;
    background-color: $metal-black;
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;

    .title {
        margin-top: 20px;
        font-size: 1.5rem;
        font-weight: bold;

        color: $fa-white;

        &::first-letter {
            color: $sienna;
        }
    }

    .credit {
        position: absolute;
        bottom: 0;
        left: 50%;
        font-weight: 300;
        color: gainsboro;
        transform: translate(-50%, -50%);

        a {
            font-weight: 500;
            color: inherit;
            text-decoration: none;
            transition: color 0.4s ease-out;
        }
        a:hover {
            color: #0faf87;
        }
    }
}
</style>
