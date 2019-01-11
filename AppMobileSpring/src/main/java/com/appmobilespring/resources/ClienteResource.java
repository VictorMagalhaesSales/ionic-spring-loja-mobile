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

import com.appmobilespring.domain.Cliente;
import com.appmobilespring.dto.ClienteDTO;
import com.appmobilespring.resources.utils.CreateURI;
import com.appmobilespring.services.ClienteService;

@RestController
@RequestMapping(value="/clientes")
public class ClienteResource {
	
	@Autowired
	private ClienteService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<Cliente> find(@PathVariable Integer id) {
		Cliente obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping()
	public ResponseEntity<List<ClienteDTO>> findAll() {
		return ResponseEntity.ok().body(service.findAll());
	}
	
	@GetMapping("/page")
	public ResponseEntity<Page<ClienteDTO>> findPage(
								@RequestParam(value="page", defaultValue="0") Integer page,
								@RequestParam(value="size", defaultValue="24") Integer size,
								@RequestParam(value="orderBy", defaultValue="nome") String orderBy, 
								@RequestParam(value="direction", defaultValue="ASC") String direction) {
		Page<ClienteDTO> listDto = service.findPage(page, size, direction, orderBy);
		return ResponseEntity.ok().body(listDto);
	}
	
	@PostMapping()
	public ResponseEntity<Void> insert(@Valid @RequestBody ClienteDTO dto){
		Cliente cliente = service.insert(dto);
		return ResponseEntity.created(CreateURI.create(cliente.getId())).build();
	}	
	
	@PutMapping("/{id}")
	public ResponseEntity<Void> update(@RequestBody ClienteDTO dto, @PathVariable Integer id){
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