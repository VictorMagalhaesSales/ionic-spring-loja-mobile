import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core'; 
 
import { LoginPage } from './login'; 
 
@NgModule({
    declarations: [LoginPage],     
    imports: [IonicPageModule.forChild(LoginPage)] 
}) 
export class LoginModule {
    
}