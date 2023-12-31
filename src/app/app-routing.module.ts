import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutContainerComponent } from './layout/layout-container.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AuthAdminGuard } from './core/guards/auth-admin.guard';

const routes: Routes = [

  {
    path: 'admin',
    canActivate:[AuthAdminGuard],
    component: LayoutContainerComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
      },
      {
        path: 'apps',
        loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule),
      },
    ]
  },
  {
    path: 'auth',
    component: PublicLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'maintenance',
    component: PublicLayoutComponent,
    loadChildren: () => import('./pages/extra-pages/maintenance/maintenance.module').then(m => m.MaintenanceModule)
  },
  {
    path: 'upcoming',
    component: PublicLayoutComponent,
    loadChildren: () => import('./pages/extra-pages/upcoming/upcoming.module').then(m => m.UpcomingModule)
  },
  {
    path: 'error-404',
    component: PublicLayoutComponent,
    loadChildren: () => import('./pages/extra-pages/error404/error404.module').then(m => m.Error404Module)
  },
  {
    path: 'error-500-two',
    component: PublicLayoutComponent,
    loadChildren: () => import('./pages/extra-pages/error500two/error500two.module').then(m => m.Error500twoModule)
  },
  {
    path: 'error-500',
    component: PublicLayoutComponent,
    loadChildren: () => import('./pages/extra-pages/error500/error500.module').then(m => m.Error500Module)
  },
  {
    path: 'landing',
    component: PublicLayoutComponent,
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
  },

  { path: '',
   loadChildren: () => import('./client-side/client-side.module').then(m => m.ClientSideModule) },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
