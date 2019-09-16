import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'gedcom-converter',
    loadChildren: './gedcom-converter/gedcom-converter.module#GedcomConverterModule',
  },
  { path: '', redirectTo: 'gedcom-converter', pathMatch: 'full' },
  { path: '**', redirectTo: 'gedcom-converter' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
