import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'user/:id', loadChildren: './user/user.module#UserPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'equipo', loadChildren: './equipo/equipo.module#EquipoPageModule' },
  { path: 'motor', loadChildren: './motor/motor.module#MotorPageModule' },
  { path: 'acerca', loadChildren: './acerca/acerca.module#AcercaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
