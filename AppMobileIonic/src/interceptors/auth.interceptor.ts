import { API_CONFIG } from './../config/api.config';
import { AuthService } from './../services/auth.service';
import { LocalUser } from './../models/local_user';
import { ErrorInterceptor } from './error.interceptor';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser: LocalUser = this.authService.getUser();
        // Teste para saber se a requisição está sendo feita da API
        let lenght: number = API_CONFIG.baseUrl.length;
        let teste: boolean = req.url.substring(0, lenght) == API_CONFIG.baseUrl;
        if(localUser && teste){
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}

export const AuthInterceptorProvider  = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};