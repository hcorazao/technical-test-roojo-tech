import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { DialogComponent } from './upload/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadService } from './upload/upload.service';
import { HttpClientModule } from '@angular/common/http';

import { UploadComponent } from './upload/upload.component';
import { ViewTreeComponent } from './view-tree/view-tree.component';
import { ViewDetailComponent } from './view-detail/view-detail.component';
import { GedcomConverterRoutingModule } from './gedcom-converter-routing.module';

@NgModule({
  declarations: [
  	UploadComponent, 
    DialogComponent,
  	ViewTreeComponent, 
  	ViewDetailComponent
  ],
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatListModule,
    FlexLayoutModule, 
    HttpClientModule, 
    MatProgressBarModule,
    GedcomConverterRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UploadService],
  entryComponents: [
    DialogComponent
  ]
})
export class GedcomConverterModule { 
}
