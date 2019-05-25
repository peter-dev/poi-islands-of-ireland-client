import { inject, TaskQueue } from 'aurelia-framework';
import { ApiService } from '../services/api-service';
import { Region, Island } from '../services/api-types';

@inject(ApiService)
export class Create {
  regions: Region[];
  name: string;
  description: string;
  lat: number;
  lng: number;
  regionId: string = null;

  isError: boolean;
  errMessage: string;
  isSuccess: boolean;
  successMessage: string;

  constructor(private apiService: ApiService) {
    this.regions = this.apiService.regions;
  }

  async addIsland() {
    console.log(`Trying to create new POI '${this.name}'`);
    const responseCreate = await this.apiService.addIsland(
      this.name,
      this.description,
      this.lat,
      this.lng,
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
    this.successMessage = `Island '${responseCreate.name}' has been created`;
    this.isError = false;
    this.errMessage = '';
    // reset all fields
    this.name = null;
    this.description = null;
    this.lat = null;
    this.lng = null;
    this.regionId = null;
    return;
  }

  attached() {
    this.isError = false;
    this.isSuccess = false;
    this.errMessage = '';
    this.successMessage = '';
  }
}
