import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
