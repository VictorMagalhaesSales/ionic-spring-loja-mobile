import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core'; 

import { CategoriasPage } from './categorias';
 
@NgModule({
    declarations: [CategoriasPage],     
    imports: [IonicPageModule.forChild(CategoriasPage)] 
}) 
export class CategoriasModule {
    
}