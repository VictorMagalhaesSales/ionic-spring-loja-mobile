import { CategoriaDTO } from './../../models/categoria.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];
  categoria: CategoriaDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.categoria = JSON.parse(this.navParams.get('categoria'));
    this.produtoService.findByCategoria(this.categoria.id)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }

  showDetail(produtoId : string) {
    this.navCtrl.push('ProdutoDetailPage', {produtoId: produtoId});
  }

}
