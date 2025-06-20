import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiCharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private API_URL = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<ApiCharacterResponse> {
    return this.http.get<ApiCharacterResponse>(`${this.API_URL}?page=${page}`);
  }

  getCharacterDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.API_URL}/${id}`);
  }

  searchCharacters(name: string, page: number = 1): Observable<ApiCharacterResponse> {
    return this.http.get<ApiCharacterResponse>(`${this.API_URL}?name=${name}&page=${page}`);
  }
}

