import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),  // no routes yet, but required
    provideHttpClient() // enables HttpClient for your Project component
  ]
};
