import { inject } from 'aurelia-framework';
import { ApiService } from '../services/api-service';
import { Region, Island } from '../services/api-types';

@inject(ApiService)
export class Edit {
  regions: Region[];
  name: string;
  description: string;
  lat: number;
  lng: number;
  regionId: string = null;

  originalIsland: Island = null;

  isError: boolean;
  errMessage: string;
  isSuccess: boolean;
  successMessage: string;

  constructor(private apiService: ApiService) {
    this.regions = this.apiService.regions;
  }

  async updateIsland() {
    console.log(`Trying to update POI '${this.name}'`);
    const responseCreate = await this.apiService.updateIsland(
      this.name,
      this.description,
      this.lat,
      this.lng,
      this.originalIsland.createdBy,
      this.originalIsland._id,
      this.regionId
    );
    if (responseCreate.error) {
      this.isSuccess = false;
      this.successMessage = '';
      this.isError = true;
      this.errMessage = responseCreate.message;
      return;
    }
    this.isSuccess = true;
    this.successMessage = `Island '${responseCreate.name}' has been updated`;
    this.isError = false;
    this.errMessage = '';
    return;
  }

  attached() {
    this.isError = false;
    this.isSuccess = false;
    this.errMessage = '';
    this.successMessage = '';
  }

  async activate(params: { id: any; }) {
    this.originalIsland = await this.apiService.getIslandById(params.id);
    this.name = this.originalIsland.name;
    this.description = this.originalIsland.description;
    this.lat = this.originalIsland.location.lat;
    this.lng = this.originalIsland.location.lng;
    this.regionId = this.originalIsland.region;
  }
}
