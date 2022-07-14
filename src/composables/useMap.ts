import { ref } from 'vue';
import L from 'leaflet';
import { storeToRefs } from 'pinia';
import { type LocationLog, useMapStore } from '@/stores/useMapStore';

const DEFAULT_LATITUDE = 9.284059;
const DEFAULT_LONGITUDE = 105.724953;

const showLocationLog = ref(false);

export default function useMap() {
    const mapStore = useMapStore();
    const { map, mapEvent } = storeToRefs(mapStore);

    const initializeMap = (latitude: number = DEFAULT_LATITUDE, longtitude: number = DEFAULT_LONGITUDE): void => {
        map.value = L.map('map').setView([latitude, longtitude], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map.value as L.Map);

        map.value.on('click', (mE) => {
            if (!showLocationLog.value) {
                mapStore.setMapEvent(mE);
                showLocationLog.value = true;
            }
        });
    };

    const addMarker = (popupContent: string): void => {
        if (map.value && mapEvent.value) {
            const customPopup = L.popup({
                autoClose: false,
                className: 'popup',
                closeOnClick: false,
                maxHeight: 30,
                maxWidth: 300,
            });

            L.marker([mapEvent.value.latlng.lat, mapEvent.value.latlng.lng])
                .addTo(map.value as L.Map)
                .bindPopup(customPopup)
                .setPopupContent(popupContent)
                .openPopup();
        }
    };

    const addLocation = (
        label: string,
        color: string,
        log: string,
        coordinates: { latitude: number; longtitude: number }
    ): void => {
        const locatioLog: LocationLog = {
            label,
            color,
            log,
            coordinates,
        };

        mapStore.addLocation(locatioLog);
    };

    return { initializeMap, showLocationLog, addMarker, addLocation };
}
