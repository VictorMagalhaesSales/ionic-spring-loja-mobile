import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilEditPage } from './perfil-edit';

@NgModule({
  declarations: [
    PerfilEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilEditPage),
  ],
})
export class PerfilEditPageModule {}
