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
                error = JSON.parse(error.error);
                console.log(error);

                switch(error.status) {
                    case 403: localStorage.removeItem(STORAGE_KEYS.localUser);
                    break;
                    case 401: this.erro401(error);
                    break;
                    default: this.errorDefault(error);
                    break;

                }

                return Observable.throw(error);
            }) as any;
    }

    erro401(error: any){
        const toast = this.toastCtrl.create({
            message: error.message,
            duration: 3000
        });
        toast.present();
    }

    errorDefault(error: any): void{
        const toast = this.toastCtrl.create({
            message: 'Erro ' + error.status + ': ' + error.message,
            duration: 3000
          });
          toast.present();
    }


}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};