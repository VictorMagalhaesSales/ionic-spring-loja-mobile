import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { ClienteDTO } from '../../models/cliente.dto';
import { AuthService } from './../auth.service';
import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public authService: AuthService) {}

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string): Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    insert(cliente : ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`, cliente,{observe: 'response',responseType: 'text'}); 
    }

    update(cliente : any, clienteId: string) {
        return this.http.put(`${API_CONFIG.baseUrl}/clientes/${clienteId}`, cliente,{observe: 'response',responseType: 'text'}); 
    }
}