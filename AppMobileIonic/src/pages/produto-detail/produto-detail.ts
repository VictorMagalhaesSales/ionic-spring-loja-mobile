import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  parent : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService,
    public app: App,
    public nav: NavController) {
  }
  
  ionViewCanEnter() {
    let produtoId: string = this.navParams.get('produtoId');
    this.produtoService.findById(produtoId)
      .subscribe(response => {
        this.item = response; 
      },
      error => {}
    );
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.push('CarrinhoPage');
  }

}
