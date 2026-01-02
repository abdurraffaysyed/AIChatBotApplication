import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { AIChatBotFrontEndComponent } from './aichat-bot-front-end/aichat-bot-front-end.component';

export const routes: Routes = [
  { path: '', redirectTo: 'aichat-bot-front-end', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'aichat-bot-front-end', component: AIChatBotFrontEndComponent, data: { text: 'Aichat-Bot-Front-End' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
