import * as L from 'leaflet';
import Map = L.Map;
import Layer = L.Layer;
import Marker = L.Marker;
import LayersObject = L.Control.LayersObject;
import LayerGroup = L.LayerGroup;
import LayerControl = L.Control.Layers;
import { Location } from './api-types';

export interface MapConfig {
  location: Location;
  zoom: number;
  minZoom: number;
}

export class LeafletMap {
  imap: Map;
  marker: Marker;
  control: LayerControl;
  baseLayers = {
    Terrain: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }),
    Satellite: L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }
    )
  };

  constructor(id: string, descriptor: MapConfig, activeLayer = '') {
    let defaultLayer = this.baseLayers.Terrain;
    if (activeLayer) {
      defaultLayer = this.baseLayers[activeLayer];
    }
    this.imap = L.map(id, {
      center: [descriptor.location.lat, descriptor.location.lng],
      zoom: descriptor.zoom,
      minZoom: descriptor.minZoom,
      zoomControl: false,
      layers: [defaultLayer]
    });
  }

  showLayerControl() {
    this.control = L.control.layers(this.baseLayers).addTo(this.imap);
  }

  showZoomControl(position = 'topleft') {
    L.control
      .zoom({
        position: position
      })
      .addTo(this.imap);
  }

  moveTo(zoom: number, location: Location) {
    this.imap.setZoom(zoom);
    this.imap.panTo(new L.LatLng(location.lat, location.lng));
  }

  zoomTo(location: Location) {
    this.imap.setView(new L.LatLng(location.lat, location.lng), 8);
  }

  addMarker(location: Location, popupText = '') {
    // clear previous marker
    if (this.marker) {
      this.imap.removeLayer(this.marker);
    }
    this.marker = L.marker([location.lat, location.lng]);
    if (popupText) {
      let popup = L.popup({ autoClose: false, closeOnClick: false });
      popup.setContent(popupText);
      this.marker.bindPopup(popup);
    }
    this.marker.addTo(this.imap);
  }

  invalidateSize() {
    this.imap.invalidateSize();
    let hiddenMethodMap = this.imap as any;
    hiddenMethodMap._onResize();
  }
}