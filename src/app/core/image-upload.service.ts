import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private url: string = environment.backendUrl + '/markdownx/upload/';
  private IMAGE_FIELD = 'image';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<string> {
    const formData = new FormData();
    formData.append(this.IMAGE_FIELD, file);
    const request = this.http.post(this.url, formData, { headers: this.getHeaders() });
    return request.pipe(
      map((data: any) => data.image_code),
      map((imageCode: string) => this.addHost(imageCode)),
    );
  }

  private getHeaders() {
    // Explicitly tell the backend that we're doing XHR/Ajax here
    // Otherwise it would not return JSON
    return {
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  private addHost(imageCode: string) {
    const regex = /!\[\]\((.+)\)/;
    const path = regex.exec(imageCode)[1];
    if (!path.startsWith('http')) {
      return `![](${environment.backendUrl}${path})`;
    } else {
      return imageCode;
    }
  }


}
