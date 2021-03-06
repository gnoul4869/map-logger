import { ref, watch } from 'vue';
import L from 'leaflet';

const DEFAULT_LATITUDE = 9.284059;
const DEFAULT_LONGITUDE = 105.724953;
const DEFAULT_ZOOM_LEVEL = 16;

export type Coordinates = {
    latitude: number;
    longtitude: number;
};

export type LocationLog = {
    id: number;
    label: string;
    color: string;
    log: string;
    coordinates: Coordinates;
};

let map: L.Map | null = null;
let mapMarkers: L.LayerGroup | null = null;
let mapEvent: L.LeafletMouseEvent | null = null;

const locationLogList = ref<LocationLog[]>([]);
localStorage.getItem('locationLogList') &&
    locationLogList.value.push(...JSON.parse(localStorage.getItem('locationLogList') as string));

const showLogModal = ref(false);
const currentLocationLog = ref<LocationLog | null>(null);

const initializeMarkers = (): void => {
    if (!map || !mapMarkers) return;

    mapMarkers.clearLayers();

    if (locationLogList.value.length) {
        locationLogList.value.forEach((locationLog) => {
            addMarker(locationLog.label, locationLog.color, locationLog.coordinates);
        });
    }
};

const initializeMap = (latitude: number = DEFAULT_LATITUDE, longtitude: number = DEFAULT_LONGITUDE): void => {
    map = L.map('map').setView([latitude, longtitude], DEFAULT_ZOOM_LEVEL);

    mapMarkers = new L.LayerGroup();

    map.addLayer(mapMarkers);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map as L.Map);

    map.on('click', (e: L.LeafletMouseEvent) => {
        mapEvent = e;

        if (!showLogModal.value) {
            showLogModal.value = true;
        }
    });

    initializeMarkers();
};

const addMarker = (label: string, color: string, coordinates: Coordinates): void => {
    if (!map || !mapMarkers) return;

    const markerOptions = {
        draggable: false,
        keyboard: false,
        riseOnHover: true,
        title: label,
    };

    const popup = L.popup({
        autoClose: false,
        className: 'popup',
        closeOnClick: false,
        maxHeight: 30,
        maxWidth: 300,
    });

    const marker = L.marker([coordinates.latitude, coordinates.longtitude], markerOptions)
        .addTo(mapMarkers as L.LayerGroup)
        .bindPopup(popup)
        .setPopupContent(label)
        .openPopup();

    const popupContentWrapper = popup.getElement()?.children[0] as HTMLElement | undefined;
    if (popupContentWrapper) {
        popupContentWrapper.style.borderLeft = `0.3125rem solid ${color}`;
    }

    // Remove all click events from the marker
    marker.off('click');

    marker.on('click', (e: L.LeafletMouseEvent) => {
        mapEvent = e;

        if (!e.target.isPopupOpen()) return e.target.openPopup();

        const locationLog = locationLogList.value.find(
            (ll) => ll.coordinates.latitude === e.latlng.lat && ll.coordinates.longtitude === e.latlng.lng
        );

        if (locationLog) {
            currentLocationLog.value = locationLog;
        }
    });
};

const moveToCoordinates = (coordinates: Coordinates, zoomLevel = DEFAULT_ZOOM_LEVEL): void => {
    if (!map) return;

    map.setView([coordinates.latitude, coordinates.longtitude], zoomLevel);
};

const addLocationLog = (label: string, color: string, log: string): void => {
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

const deleteLocationLog = (locationLog: LocationLog): void => {
    moveToCoordinates(locationLog.coordinates);

    currentLocationLog.value?.id === locationLog.id && (currentLocationLog.value = null);

    locationLogList.value = locationLogList.value.filter((ll) => ll.id !== locationLog.id);

    initializeMarkers();
};

watch(
    locationLogList,
    () => {
        localStorage.setItem('locationLogList', JSON.stringify(locationLogList.value));
    },
    { deep: true }
);

export default function useMap() {
    return {
        initializeMap,
        showLogModal,
        addMarker,
        addLocationLog,
        moveToCoordinates,
        deleteLocationLog,
        locationLogList,
        currentLocationLog,
    };
}
