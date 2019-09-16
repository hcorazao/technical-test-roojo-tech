import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ViewTreeComponent } from './view-tree/view-tree.component';
import { ViewDetailComponent } from './view-detail/view-detail.component';

const routes: Routes = [
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'view-tree',
    component: ViewTreeComponent,
  },
  {
    path: 'view-detail',
    component: ViewDetailComponent,
  },
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: '**', redirectTo: 'upload' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GedcomConverterRoutingModule { }
