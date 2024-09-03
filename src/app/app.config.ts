import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { AdminReducer } from './states/admin/admin.reducer';
import { provideEffects } from '@ngrx/effects';
import { AdminEffects } from './states/admin/admin.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), 
    provideStore(),
    provideState({ name:"admin", reducer: AdminReducer }),
    provideEffects(AdminEffects)
  ]
};
