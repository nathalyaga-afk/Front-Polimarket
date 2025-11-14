import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const appConfig = 
{ 
    providers: 
    [
        provideAnimations(), 
        provideRouter(routes),
         provideHttpClient() 
    ] 
};
