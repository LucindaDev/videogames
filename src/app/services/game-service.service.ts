import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/Game';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  private apiUrl = 'api';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl + '/games');
  }

  getGamesByPlatform(platform: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl + '/games?platform=' + platform);
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl + '/games?category=' + category);
  }
}