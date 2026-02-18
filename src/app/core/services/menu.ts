import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../shared/models/menu.model';
import { API_BASE_URL } from '../../app.config';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private baseUrl = `${API_BASE_URL}/menus`;

    constructor(private http: HttpClient) { }

    obtenerMenu(fecha: string): Observable<Menu> {
        return this.http.get<Menu>(`${this.baseUrl}/date/${fecha}`);
    }
}
