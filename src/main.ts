import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Root component with router outlet
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient()
  ]
})
.catch(err => console.error(err));
