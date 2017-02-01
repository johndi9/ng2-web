import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';
import { Home } from './components/pages/home/home.component';
import { NoContent } from './components/pages/no-content/no-content.component';


export const ROUTES: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: '**', component: NoContent },
  // { path: 'detail', loadChildren: './+detail#DetailModule'},
];
