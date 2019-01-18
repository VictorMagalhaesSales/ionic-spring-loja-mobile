import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {

  listCategoria: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService
    ) {
  }

  
  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(
        list => this.listCategoria = list,
        error => {}
        );
  }

}
