import { ref, watch } from 'vue';
import L from 'leaflet';

const DEFAULT_LATITUDE = 9.284059;
const DEFAULT_LONGITUDE = 105.724953;

type Coordinates = {
    latitude: number;
    longtitude: number;
};

type LocationLog = {
    label: string;
    color: string;
    log: string;
    coordinates: Coordinates;
};

const _map = ref<L.Map | null>(null);
const _mapEvent = ref<L.LeafletMouseEvent | null>(null);
const _locationList = ref<LocationLog[]>([]);

const showLogModal = ref(false);

const initializeMap = (latitude: number = DEFAULT_LATITUDE, longtitude: number = DEFAULT_LONGITUDE): void => {
    _map.value = L.map('map').setView([latitude, longtitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(_map.value as L.Map);

    _map.value.on('click', (mE) => {
        if (!showLogModal.value) {
            _mapEvent.value = mE;
            showLogModal.value = true;
        }
    });
};

const addMarker = (label: string, color: string, coordinates: Coordinates): void => {
    if (!_map.value || !_mapEvent.value) return;

    const markerOptions = {
        draggable: false,
        keyboard: false,
        title: label,
    };

    const popup = L.popup({
        autoClose: false,
        className: 'popup',
        closeOnClick: false,
        maxHeight: 30,
        maxWidth: 300,
    });

    L.marker([coordinates.latitude, coordinates.longtitude], markerOptions)
        .addTo(_map.value as L.Map)
        .bindPopup(popup)
        .setPopupContent(label)
        .openPopup();

    const popupContentWrapper = popup.getElement()?.children[0] as HTMLElement;
    if (popupContentWrapper) {
        popupContentWrapper.style.borderLeft = `0.3125rem solid ${color}`;
    }
};

const addLocation = (label: string, color: string, log: string): void => {
    if (!_mapEvent.value) return;

    const coordinates = {
        latitude: _mapEvent.value.latlng.lat,
        longtitude: _mapEvent.value.latlng.lng,
    };

    const locationLog: LocationLog = {
        label,
        color,
        log,
        coordinates,
    };

    _locationList.value.push(locationLog);
};

watch(
    _locationList,
    () => {
        const newLocation = _locationList.value.at(-1);
        if (!newLocation) return;

        const { label, color, coordinates } = newLocation;
        addMarker(label, color, coordinates);
    },
    { deep: true }
);

export default function useMap() {
    return { initializeMap, showLogModal, addMarker, addLocation };
}
