import { bindable } from 'aurelia-framework';
import { LeafletMap } from '../../services/leaflet-map';
import { Island } from '../../services/api-types';

export class IslandMap {
  mapId = 'island-map';
  map: LeafletMap;
  @bindable
  selectedIsland: Island;

  attached() {
    const mapConfig = {
      location: this.selectedIsland.location,
      zoom: 8,
      minZoom: 7
    };
    if (!this.map) {
      this.map = new LeafletMap(this.mapId, mapConfig);
      this.map.showZoomControl();
      this.map.showLayerControl();
    }
    this.map.addMarker(this.selectedIsland.location, this.selectedIsland.name);
    this.map.moveTo(8, this.selectedIsland.location);
    console.log(`Attached island location:: ${JSON.stringify(this.selectedIsland.location)}`);
  }
}
