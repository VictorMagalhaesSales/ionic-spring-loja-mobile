import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {}

  findByCategoria(categoriaId: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/page/?categoriasid=${categoriaId}`);
  }

  findById(produtoId: string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
  }

}