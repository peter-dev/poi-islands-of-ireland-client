import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient, Aurelia, Router)
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private au: Aurelia,
    private router: Router
  ) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    try {
      const response = await this.httpClient.post('/api/users', user);
      const createdUser = await response.content;
      console.log('Created user: ' + JSON.stringify(createdUser));
      return createdUser;
    } catch (err) {
      const errResponse = await err.content;
      console.log('Error: ' + JSON.stringify(errResponse));
      return errResponse;
    }
  }

  async login(email: string, password: string) {
    const user = {
      firstName: 'n/a',
      lastName: 'n/a',
      email: email,
      password: password
    };
    try {
      const response = await this.httpClient.post('/api/users/authenticate', user);
      const status = await response.content;
      if (status.success) {
        this.httpClient.configure(configuration => {
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });
        localStorage.apitoken = JSON.stringify(response.content);
        this.changeRouter(PLATFORM.moduleName('app'));
        return true;
      }
    } catch (err) {
      const errResponse = await err.content;
      console.log('Error: ' + JSON.stringify(errResponse));
      return errResponse;
    }
  }

  logout() {
    localStorage.apitoken = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.apitoken !== undefined && localStorage.apitoken !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.apitoken);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }
}
