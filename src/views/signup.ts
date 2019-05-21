import { inject } from 'aurelia-framework';
import { ApiService } from '../services/api-service';

@inject(ApiService)
export class Signup {
  firstName = 'Marge';
  lastName: string;
  email = 'marge@simpson.com';
  password = 'secret';
  isError: boolean;
  errMessage: string;

  constructor(private apiService: ApiService) {}

  async signup() {
    console.log(`Trying to sign up ${this.email}`);
    const responseCreate = await this.apiService.signup(this.firstName, this.lastName, this.email, this.password);
    if (responseCreate.error) {
      this.isError = true;
      this.errMessage = responseCreate.message;
      return;
    }
    console.log(`Trying to authenticate ${this.email}`);
    const responseAuthenticate = await this.apiService.login(this.email, this.password);
    if (responseAuthenticate.error) {
      this.isError = true;
      this.errMessage = responseAuthenticate.message;
      return;
    }
  }

  attached() {
    this.isError = false;
    this.errMessage = '';
  }

}
