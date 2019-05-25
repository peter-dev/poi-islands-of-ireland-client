import { inject } from 'aurelia-framework';
import { ApiService } from '../services/api-service';

@inject(ApiService)
export class Login {
  email: string = 'marge@simpson.com';
  password: string = 'secret';
  isError: boolean;
  errMessage: string;

  constructor(private apiService: ApiService) {}

  async login() {
    console.log(`Trying to log in ${this.email}`);
    const response = await this.apiService.login(this.email, this.password);
    if (response.error) {
      this.isError = true;
      this.errMessage = response.message;
    }
  }

  attached() {
    this.isError = false;
    this.errMessage = '';
  }
}
