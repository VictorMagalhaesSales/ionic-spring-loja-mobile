import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core'; 

import { PerfilPage } from './perfil';
 
@NgModule({
    declarations: [PerfilPage],     
    imports: [IonicPageModule.forChild(PerfilPage)] 
}) 
export class PerfilModule {
    
}