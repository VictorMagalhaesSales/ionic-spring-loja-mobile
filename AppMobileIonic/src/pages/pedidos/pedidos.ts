import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from './../../services/domain/pedido.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  listPedidos: ProdutoDTO[] = [];

  constructor(
    public pedidoService: PedidoService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    this.pedidoService.findByCliente(this.navParams.data.clienteId)
      .subscribe(
        response => {
          this.listPedidos = response;
        }
      )
  }

}
