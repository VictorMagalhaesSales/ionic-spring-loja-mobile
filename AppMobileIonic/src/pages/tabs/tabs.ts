import { IonicPage, Tabs } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  categorias = 'CategoriasPage';
  carrinho = 'CarrinhoPage';
  perfil = 'PerfilPage';

  constructor() {}
}
