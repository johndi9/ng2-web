import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';
import { Home } from './components/pages/home/home.component';
import { NoContent } from './components/pages/no-content/no-content.component';

export const ROUTES: Routes = [
  { path: '', component: Home },
  { path: 'personal', component: Home },
  { path: 'projects', component: Home },
  { path: 'projects/:id', component: Home },
  { path: 'employers', component: Home },
  { path: 'employers/:id', component: Home },
  { path: 'education', component: Home },
  { path: 'other', component: Home },
  { path: 'contact', component: Home },
  { path: '**', component: NoContent },
  // { path: 'detail', loadChildren: './+detail#DetailModule'},
];
