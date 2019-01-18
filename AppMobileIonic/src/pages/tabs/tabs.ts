import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  categorias = 'CategoriasPage';
  carrinho = 'CarrinhoPage';
  perfil = 'PerfilPage';

  constructor() {

  }
}
