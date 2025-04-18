import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations()],
});