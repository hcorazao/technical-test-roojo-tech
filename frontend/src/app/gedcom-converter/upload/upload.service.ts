import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

const url = 'http://localhost:3000/upload';

@Injectable()
export class UploadService {
  private messageSource = new BehaviorSubject(undefined);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  public upload(files: Set<File>) {
    let req;
    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      req = new HttpRequest('POST', url, formData);
    });
    return this.http.request(req);
  }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

}
