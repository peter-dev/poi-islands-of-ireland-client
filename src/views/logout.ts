import { inject } from 'aurelia-framework';
import { ApiService } from '../services/api-service';

@inject(ApiService)
export class Logout {
  constructor(private apiService: ApiService) {}

  attached() {
    this.apiService.logout();
  }
}
