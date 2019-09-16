import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, 
    public uploadService: UploadService,
    private router: Router
    ) { }

  ngOnInit() { }

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  upload() {
    this.uploadService.upload(this.files).subscribe((response: any) => {
      if (!!response.body) {
        this.dialogRef.close();
        this.uploadService.changeMessage(response.body);
        this.router.navigate(['/gedcom-converter/view-tree']);
      }
    });
  }
}
