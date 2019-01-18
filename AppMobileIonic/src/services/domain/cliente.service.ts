import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { ClienteDTO } from '../../models/cliente.dto';
import { AuthService } from './../auth.service';
import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public authService: AuthService) {}

    findByEmail(email: string): Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }
}