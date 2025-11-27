import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent },

    {
        path: 'details/:id',
        loadComponent: () =>
            import('./product-details/product-details.component')
                .then(m => m.ProductDetailsComponent)
    },

    { path: '**', redirectTo: 'home' }
];
