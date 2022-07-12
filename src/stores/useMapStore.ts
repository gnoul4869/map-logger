import { defineStore } from 'pinia';

interface MapState {
    map: L.Map | null;
    mapEvent: L.LeafletMouseEvent | null;
    showLocationLog: boolean;
}

const state = (): MapState => ({
    map: null,
    mapEvent: null,
    showLocationLog: false,
});

const getters = {};

const actions = {
    setMap(value: L.Map) {
        this.map = value;
        return this;
    },
    setMapEvent(value: L.LeafletMouseEvent) {
        this.mapEvent = value;
        return this;
    },
    toggleForm(value: boolean) {
        this.showLocationLog = value;
        return this;
    },
};

export const useMapStore = defineStore({
    id: 'mapStore',
    state,
    getters,
    actions,
});
