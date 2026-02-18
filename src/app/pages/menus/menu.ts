import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from './interfaces/Menu';
import { API_BASE_URL } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private apiUrl = `${API_BASE_URL}/menus`;

  constructor(private http: HttpClient) { }

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenuByDate(date: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/date/${date}`);
  }

  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }

  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  updateMenu(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, menu);
  }

  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
