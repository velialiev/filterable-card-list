import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilters } from '../../models/filtersModel';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../models/api-urls';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  public constructor(private http: HttpClient) { }

  public getCardsFilters(): Observable<IFilters> {
    return this.http.get<IFilters>(API_URLS.getFilters);
  }
}
