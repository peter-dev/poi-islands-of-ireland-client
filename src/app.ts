import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'islands'],
        name: 'Islands',
        moduleId: PLATFORM.moduleName('views/islands'),
        nav: true,
        title: 'Dashboard'
      },
      {
        route: 'logout',
        name: 'Logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }
    ]);
    this.router = router;
  }
}
