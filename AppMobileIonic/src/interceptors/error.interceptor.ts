import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ToastController } from 'ionic-angular';
import { STORAGE_KEYS } from './../config/storage_keys.config';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public toastCtrl: ToastController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                error
                if(error.error) error = error.error;
                console.log(error);
                switch(error.status) {
                    case 403: localStorage.removeItem(STORAGE_KEYS.localUser);
                    break;
                    case 404: this.buildToast('Página não encontrada');
                    break;
                    default: this.buildToast('Erro ' + error.status + ': ' + error.message);
                    break;

                }

                return Observable.throw(error);
            }) as any;
    }

    buildToast(message: string, duration: number = 3000){
        const toast = this.toastCtrl.create({
            message: message,
            duration: duration
          });
          toast.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};