import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {}

  findByCategoria(categoriaId : string) {
    console.log(categoriaId);
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/page/?categoriasid=${categoriaId}`);
  }
}