import { STORAGE_KEYS } from './../../config/storage_keys.config';
import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

    constructor() {}

    createOrClearCart(cart: Cart = null) : Cart {
        if (cart != null) localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        else localStorage.removeItem(STORAGE_KEYS.cart);
        cart = {items: []};
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart));
        if (cart == null) cart = this.createOrClearCart();
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1){
            cart.items.push({quantidade: 1, produto: produto});
        }
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1){
            cart.items[position].quantidade++;
        }
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1){
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) cart = this.removeProduto(produto);
        }
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        return cart;
    }

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1){
            cart.items.splice(position, 1)
        }
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}