import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../shared/models/menu.model';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private baseUrl = 'http://localhost:8000'; // URL de tu backend FastAPI

    constructor(private http: HttpClient) { }

    obtenerMenu(fecha: string): Observable<Menu> {
        return this.http.get<Menu>(`${this.baseUrl}/menus/date/${fecha}`);
    }
}
