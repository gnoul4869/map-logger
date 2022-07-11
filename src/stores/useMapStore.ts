import { defineStore } from 'pinia';

interface MapState {
    map: L.Map | null;
    mapEvent: L.LeafletMouseEvent | null;
    showForm: boolean;
}

const state = (): MapState => ({
    map: null,
    mapEvent: null,
    showForm: false,
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
        this.showForm = value;
        return this;
    },
};

export const useMapStore = defineStore({
    id: 'mapStore',
    state,
    getters,
    actions,
});
