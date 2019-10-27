import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICard } from '../../models/cardModel';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../../models/api-urls';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public constructor(private http: HttpClient) { }

  public getCards(): Observable<ICard[]> {
    return this.http.get<ICard[]>(API_URLS.getCards);
  }
}
