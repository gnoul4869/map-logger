import { ref, watch } from 'vue';
import L from 'leaflet';

const DEFAULT_LATITUDE = 9.284059;
const DEFAULT_LONGITUDE = 105.724953;

type Coordinates = {
    latitude: number;
    longtitude: number;
};

type LocationLog = {
    id: number;
    label: string;
    color: string;
    log: string;
    coordinates: Coordinates;
};

let map: L.Map | null = null;
let mapEvent: L.LeafletMouseEvent | null = null;

const locationLogList = ref<LocationLog[]>([]);
localStorage.getItem('locationLogList') &&
    locationLogList.value.push(...JSON.parse(localStorage.getItem('locationLogList') as string));

const showLogModal = ref(false);

const initializeMarkers = (): void => {
    if (!map || !locationLogList.value.length) return;

    locationLogList.value.forEach((locationLog) => {
        addMarker(locationLog.label, locationLog.color, locationLog.coordinates);
    });
};

const initializeMap = (latitude: number = DEFAULT_LATITUDE, longtitude: number = DEFAULT_LONGITUDE): void => {
    map = L.map('map').setView([latitude, longtitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map as L.Map);

    map.on('click', (mE) => {
        if (!showLogModal.value) {
            mapEvent = mE;
            showLogModal.value = true;
        }
    });

    initializeMarkers();
};

const addMarker = (label: string, color: string, coordinates: Coordinates): void => {
    if (!map) return;

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
        .addTo(map as L.Map)
        .bindPopup(popup)
        .setPopupContent(label)
        .openPopup();

    const popupContentWrapper = popup.getElement()?.children[0] as HTMLElement | undefined;
    if (popupContentWrapper) {
        popupContentWrapper.style.borderLeft = `0.3125rem solid ${color}`;
    }
};

const addLocation = (label: string, color: string, log: string): void => {
    if (!mapEvent) return;

    const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

    const coordinates = {
        latitude: mapEvent.latlng.lat,
        longtitude: mapEvent.latlng.lng,
    };

    const locationLog: LocationLog = {
        id,
        label,
        color,
        log,
        coordinates,
    };

    locationLogList.value.push(locationLog);
    addMarker(label, color, coordinates);
};

watch(
    locationLogList,
    () => {
        localStorage.setItem('locationLogList', JSON.stringify(locationLogList.value));
    },
    { deep: true }
);

export default function useMap() {
    return { initializeMap, showLogModal, addMarker, addLocation, locationLogList };
}
