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

  list(options = { limit: 5 }): Observable<string[]> {
    const params: any = { limit: options.limit };
    return this.http.get(this.baseUrl, { params }).pipe(
      map((data: any[]) => data.map(item => item.name)),
    );
  }
}
