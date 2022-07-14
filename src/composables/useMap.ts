import { ref } from 'vue';
import L from 'leaflet';

const DEFAULT_LATITUDE = 9.284059;
const DEFAULT_LONGITUDE = 105.724953;

interface LocationLog {
    label: string;
    color: string;
    log: string;
    coordinates: { latitude: number; longtitude: number };
}

const _map = ref<L.Map | null>(null);
const _mapEvent = ref<L.LeafletMouseEvent | null>(null);
const _locationLists = ref<LocationLog[]>([]);

const showLocationLog = ref(false);

export default function useMap() {
    const initializeMap = (latitude: number = DEFAULT_LATITUDE, longtitude: number = DEFAULT_LONGITUDE): void => {
        _map.value = L.map('map').setView([latitude, longtitude], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(_map.value as L.Map);

        _map.value.on('click', (mE) => {
            if (!showLocationLog.value) {
                _mapEvent.value = mE;
                showLocationLog.value = true;
            }
        });
    };

    const addMarker = (popupContent: string): void => {
        if (!_map.value || !_mapEvent.value) return;

        const customPopup = L.popup({
            autoClose: false,
            className: 'popup',
            closeOnClick: false,
            maxHeight: 30,
            maxWidth: 300,
        });

        L.marker([_mapEvent.value.latlng.lat, _mapEvent.value.latlng.lng])
            .addTo(_map.value as L.Map)
            .bindPopup(customPopup)
            .setPopupContent(popupContent)
            .openPopup();
    };

    const addLocation = (label: string, color: string, log: string): void => {
        if (!_mapEvent.value) return;

        const coordinates = {
            latitude: _mapEvent.value.latlng.lat,
            longtitude: _mapEvent.value.latlng.lng,
        };

        const locatioLog: LocationLog = {
            label,
            color,
            log,
            coordinates,
        };

        _locationLists.value.push(locatioLog);
    };

    return { initializeMap, showLocationLog, addMarker, addLocation };
}
