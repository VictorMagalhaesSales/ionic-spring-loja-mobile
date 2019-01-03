package com.appmobilespring.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appmobilespring.domain.Categoria;
import com.appmobilespring.dto.CategoriaDTO;
import com.appmobilespring.repositories.CategoriaRepository;
import com.appmobilespring.services.exceptions.ObjectNotFoundException;

@Service
public class CategoriaService {

	@Autowired
	private CategoriaRepository repository;

	public Categoria find(Integer id) {
		Optional<Categoria> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Categoria.class.getName()));
	}
	
	public Categoria insert(CategoriaDTO dto) {
		return repository.save(new Categoria(dto.getId(), dto.getNome()));
	}
	
	public Categoria update(CategoriaDTO dto) {
		find(dto.getId());
		return repository.save(new Categoria(dto.getId(), dto.getNome()));
	}

}
