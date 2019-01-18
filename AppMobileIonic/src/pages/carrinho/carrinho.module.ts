import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core'; 

import { CarrinhoPage } from './carrinho';
 
@NgModule({
    declarations: [CarrinhoPage],     
    imports: [IonicPageModule.forChild(CarrinhoPage)] 
}) 
export class CarrinhoModule {
    
}