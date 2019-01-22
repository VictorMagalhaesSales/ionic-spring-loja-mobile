import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteDTO } from './../../models/cliente.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil-edit',
  templateUrl: 'perfil-edit.html',
})
export class PerfilEditPage {

  cliente: ClienteDTO;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController) {
      this.cliente = this.navParams.data.cliente;
      this.buildForm();
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      nome: [this.cliente.nome, Validators.required],
      email: [this.cliente.email, [ Validators.required, Validators.email ]],
      cpfOuCnpj: [this.cliente.cpfOuCnpj, Validators.required ],
      telefones: this.formBuilder.group({
        telefone1: [this.cliente.telefones[0], Validators.required ],
        telefone2: [this.cliente.telefones[1]],
        telefone3: [this.cliente.telefones[2]],
      }),
      tipo: [this.cliente.tipo == 'PESSOAFISICA'? 1: 2, Validators.required]
    });
  }
  
  editar(){
    let cliente = this.buildCliente();
    this.clienteService.update(cliente, this.cliente.id)
      .subscribe(
        response => {
          this.navCtrl.pop();
          this.buildToast("Edição finalizada com sucesso");
        },
        error => {}
      )
  }

  buildCliente(){
    let tipo = '';
    if(this.formGroup.value.tipo == 1) tipo = 'PESSOAFISICA';
    else tipo = 'PESSOAJURIDICA';
    let cliente = {
      'nome': this.formGroup.value.nome,
      'email': this.formGroup.value.email,
      'cpfOuCnpj': this.formGroup.value.cpfOuCnpj,
      'tipo': tipo,
      'enderecos': this.cliente.enderecos,
      'telefones': [
        this.formGroup.value.telefones.telefone1,
        this.formGroup.value.telefones.telefone2,
        this.formGroup.value.telefones.telefone3
      ]
    }
    return cliente;
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
}
