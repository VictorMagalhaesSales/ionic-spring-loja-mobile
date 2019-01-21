import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html'
})
export class CarrinhoPage {

  items: CartItem[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewWillEnter() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
  } 

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }  

  continuarComprando() {
    let page: string = this.navCtrl.root;
    if(page == 'CarrinhoPage') this.navCtrl.parent.select(0);
    else if(page == 'CategoriasPage') this.navCtrl.pop();
  }
}