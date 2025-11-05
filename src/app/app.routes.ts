import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Details } from './details/details';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'details/:id',
    component: Details,
  },
];
