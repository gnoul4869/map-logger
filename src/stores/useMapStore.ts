import { defineStore } from 'pinia';

export interface LocationLog {
    label: string;
    color: string;
    log: string;
    coordinates: { latitude: number; longtitude: number };
}

interface MapState {
    map: L.Map | null;
    mapEvent: L.LeafletMouseEvent | null;
    locationList: LocationLog[];
}

const state = (): MapState => ({
    map: null,
    mapEvent: null,
    locationList: [],
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
    addLocation(value: LocationLog) {
        this.locationList.push(value);
        return this;
    },
};

export const useMapStore = defineStore({
    id: 'mapStore',
    state,
    getters,
    actions,
});
