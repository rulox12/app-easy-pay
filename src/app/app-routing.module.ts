import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'bills',
    loadChildren: () => import('./pages/bills/bills.module').then(m => m.BillsPageModule)
  },
  {
    path: 'commerces',
    loadChildren: () => import('./pages/commerces/commerces.module').then(m => m.CommercesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/users/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/users/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/users/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/users/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
