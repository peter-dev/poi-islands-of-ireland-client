import { inject } from 'aurelia-framework';
import { ApiService } from '../services/api-service';

@inject(ApiService)
export class Signup {

  constructor(private apiService: ApiService) {}


}
