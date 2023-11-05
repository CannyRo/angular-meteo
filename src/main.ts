import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home', 
    title: 'METEO Home', 
    loadComponent: ()=> import("./app/home/home/home.component").then(module => module.HomeComponent)
  },
  {
    path: ':city',
    loadComponent: ()=> import("./app/detail/detail.component").then(module => module.DetailComponent)
  },
  {
    path: '**',
    title: 'Meteo Not Found',
    loadComponent: ()=> import("./app/page-not-found/page-not-found.component").then(module => module.PageNotFoundComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
})
  .catch((err) => console.error(err));
