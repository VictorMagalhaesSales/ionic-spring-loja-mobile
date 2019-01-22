import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosPage } from './pedidos';

@NgModule({
  declarations: [
    PedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosPage),
  ],
})
export class PedidosPageModule {}
