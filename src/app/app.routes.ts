import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WomenComponent } from './women/women.component';
import { MenComponent } from './men/men.component';
import { LoginComponent } from './login/login.component'
import { SigninComponent } from './signin/signin.component';
import { CartComponent } from './cart/cart.component';
import { PoohComponent } from './Type_Woman_Product/Pooh/pooh/pooh.component';
import { NainaComponent } from './Type_Woman_Product/Naina/naina/naina.component';
import { AllWomenComponent } from './Type_Woman_Product/All_Women/all-women/all-women.component';
import { AishaComponent } from './Type_Woman_Product/Aisha/aisha/aisha.component';
import { GeetComponent } from './Type_Woman_Product/Geet/geet/geet.component';
import { OurStoryComponent } from './our-story/our-story.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent },
    { path: 'pooh', component: PoohComponent },
    { path: 'naina', component: NainaComponent },
    { path: 'all-women', component: AllWomenComponent },
    { path: 'aisha', component: AishaComponent },
    { path: 'geet', component: GeetComponent },
    { path: 'our-story', component: OurStoryComponent },
    { path: 'details/:category/:id', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    { path: 'women', component: WomenComponent },
    { path: 'men', component: MenComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'product/:id', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
    { path: 'cart', component: CartComponent },

    { path: '**', redirectTo: 'home' }   // ALWAYS LAST
];
