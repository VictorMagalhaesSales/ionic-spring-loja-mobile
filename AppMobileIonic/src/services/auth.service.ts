import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient){}

    authenticate(credenciais: CredenciaisDTO): Observable<any>{
        // O 'observe: response' especifica que a requisição retorna um objeto do tipo response. Dessa forma, poderemos acessar o header
        return this.http.post( `${API_CONFIG.baseUrl}/login`, credenciais, {observe: 'response', responseType: 'text'});
    }
}