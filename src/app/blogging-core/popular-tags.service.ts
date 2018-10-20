import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PopularTagsService {

  private baseUrl: string = environment.apiUrl + '/popular-tags/';

  constructor(private http: HttpClient) { }

  list(options: { limit?: number } = {}): Observable<string[]> {
    const params: any = options;
    return this.http.get(this.baseUrl, { params }).pipe(
      map((data: any[]) => data.map(item => item.name)),
    );
  }
}
