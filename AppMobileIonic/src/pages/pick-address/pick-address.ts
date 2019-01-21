import { CartService } from './../../services/domain/cart.service';
import { AuthService } from './../../services/auth.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public authService: AuthService,
    public app: App,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.authService.getUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response.enderecos;

          let cart = this.cartService.getCart();
          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }
        },
        error => {
          if (error.status == 403) this.app.getRootNav().setRoot('LoginPage');
        });
      }
      else {
        this.app.getRootNav().setRoot('LoginPage');
      }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido); 
  }


}
