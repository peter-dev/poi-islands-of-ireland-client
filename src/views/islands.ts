import { inject } from 'aurelia-framework';
import { ApiService } from '../services/api-service';
import { Region, Island } from '../services/api-types';

@inject(ApiService)
export class Islands {
  regions: Region[];
  islands: Island[];
  enableIslandsDropdown: boolean;
  selectedRegionName: string = 'Select Region...';
  selectedIslandName: string = 'Select Island...';
  selectedIsland: Island = null;

  constructor(private apiService: ApiService) {
    this.regions = this.apiService.regions;
  }

  async updateSelectedRegion(region) {
    this.selectedRegionName = region.name;
    this.islands = await this.apiService.getIslandsByRegion(region._id);
    this.selectedIslandName = 'Select Island...';
    this.selectedIsland = null;
    this.enableIslandsDropdown = true;
  }

  async updateSelectedIsland(island) {
    this.selectedIslandName = island.name;
    this.selectedIsland = island;
  }
}
