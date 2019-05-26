import { inject } from 'aurelia-framework';
import { ApiService } from '../services/api-service';
import { Region, Island, Rating } from '../services/api-types';

@inject(ApiService)
export class Islands {
  regions: Region[];
  islands: Island[];
  enableIslandsDropdown: boolean;
  selectedRegionName: string = 'Select Region...';
  selectedIslandName: string = 'Select Island...';
  selectedIsland: Island = null;
  ratings: Rating[] = [];
  avgRating: string = null;

  constructor(private apiService: ApiService) {
    this.regions = this.apiService.regions;
  }

  async updateSelectedRegion(region) {
    this.selectedRegionName = region.name;
    this.islands = await this.apiService.getIslandsByRegion(region._id);
    this.selectedIslandName = 'Select Island...';
    this.selectedIsland = null;
    this.enableIslandsDropdown = true;
    this.ratings = [];
    this.avgRating = null;
  }

  async updateSelectedIsland(island) {
    this.ratings = await this.apiService.getRatingsByIsland(island._id);
    let totalRatingScore = 0;
    if (this.ratings.length > 0) {
      for (let r of this.ratings) {
        totalRatingScore = totalRatingScore + r.score;
      }
      this.avgRating = (totalRatingScore / this.ratings.length).toFixed(1);
    }
    this.selectedIslandName = island.name;
    this.selectedIsland = island;
  }

  async rateIsland(score) {
    console.log(`Trying to add score ${score}`);
    const responseAdd = await this.apiService.addRating(parseInt(score), this.selectedIsland._id);
    if (!responseAdd.error) {
      await this.updateSelectedIsland(this.selectedIsland);
    }
  }
}
