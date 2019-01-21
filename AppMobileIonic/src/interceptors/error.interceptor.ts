import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ToastController, App, Nav } from 'ionic-angular';

import { STORAGE_KEYS } from './../config/storage_keys.config';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    nav: Nav;

    constructor(public toastCtrl: ToastController, public app: App, public authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                if(error.error) error = error.error;
                if(!error.status) error = JSON.parse(error);
                console.log(error);
                switch(error.status) {
                    case 403: this.error403();
                    break;
                    case 404: this.buildToast('Página não encontrada');
                    break;
                    case 422: this.buildToast(this.listErrorsValidation(error.errors));
                    break;
                    default: this.buildToast(error.message);
                    break;

                }

                return Observable.throw(error);
            }) as any;
    }

    error403() {
        this.authService.logout();
        console.log(this.nav.getActive().component.name); 
        this.app.getRootNav().setRoot('LoginPage');
    }

    buildToast(message: string, duration: number = 3000){
        const toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            showCloseButton: true,
            closeButtonText: "Fechar"
          });
          toast.present();
    }

    private listErrorsValidation(messages : FieldMessage[]){
        let errors : string = '';
        for (var i=0; i<messages.length; i++) {
            errors += ' • ' + messages[i].message + '! ';
        }
        return errors;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};