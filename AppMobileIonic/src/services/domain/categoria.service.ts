import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaDTO } from '../../models/categoria.dto';

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){ }

    findAll(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}   