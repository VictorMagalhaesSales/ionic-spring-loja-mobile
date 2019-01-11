package com.appmobilespring.resources;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appmobilespring.domain.Categoria;
import com.appmobilespring.dto.CategoriaDTO;
import com.appmobilespring.resources.utils.CreateURI;
import com.appmobilespring.services.CategoriaService;

@RestController
@RequestMapping(value="/categorias")
public class CategoriaResource {
	
	@Autowired
	private CategoriaService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<Categoria> find(@PathVariable Integer id) {
		Categoria obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping()
	public ResponseEntity<List<CategoriaDTO>> findAll() {
		return ResponseEntity.ok().body(service.findAll());
	}
	
	@GetMapping("/page")
	public ResponseEntity<Page<CategoriaDTO>> findPage(
								@RequestParam(value="page", defaultValue="0") Integer page,
								@RequestParam(value="size", defaultValue="24") Integer size,
								@RequestParam(value="orderBy", defaultValue="nome") String orderBy, 
								@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<CategoriaDTO> listDto = service.findPage(page, size, direction, orderBy);
		return ResponseEntity.ok().body(listDto);
	}
	
	@PostMapping()
	public ResponseEntity<Void> insert(@Valid @RequestBody CategoriaDTO dto){
		Categoria categoria = service.insert(dto);
		return ResponseEntity.created(CreateURI.create(categoria.getId())).build();
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<Void> update(@RequestBody CategoriaDTO dto, @PathVariable Integer id){
		dto.setId(id);
		service.update(dto);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}