package com.appmobilespring.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.appmobilespring.domain.Categoria;
import com.appmobilespring.domain.Produto;
import com.appmobilespring.repositories.CategoriaRepository;
import com.appmobilespring.repositories.ProdutoRepository;
import com.appmobilespring.resources.exception.types.ObjectNotFoundException;
import com.appmobilespring.resources.utils.URL;

@Service
public class ProdutoService {
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;

	public Produto find(Integer id) {
		Optional<Produto> obj = produtoRepository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Produto.class.getName()));
	}
	
	public Page<Produto> search(String nome, String categoriasId, Integer page, Integer linesPerPage, String orderBy, String direction){
		PageRequest pageable = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		String nomeDecoded = URL.decodeParam(nome);
		List<Integer> ids = URL.decodeIntList(categoriasId);
		List<Categoria> categorias = categoriaRepository.findAllById(ids);
		return produtoRepository.findDistinctByNomeContainingAndCategoriasIn(nomeDecoded, categorias, pageable);
	}

}
