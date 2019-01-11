package com.appmobilespring.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.appmobilespring.domain.Cliente;
import com.appmobilespring.dto.ClienteDTO;
import com.appmobilespring.repositories.ClienteRepository;
import com.appmobilespring.services.exceptions.DataIntegrityException;
import com.appmobilespring.services.exceptions.ObjectNotFoundException;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;

	public Cliente find(Integer id) {
		Optional<Cliente> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName()));
	}
	
	public List<ClienteDTO> findAll(){
		List<Cliente> lista = repository.findAll();
		return ListToDTO(lista);
	}
	
	public Page<ClienteDTO> findPage(Integer page, Integer size, String direction, String orderBy){
		Pageable pageable = PageRequest.of(page, size, Direction.valueOf(direction), orderBy);
		Page<Cliente> list = repository.findAll(pageable);
		Page<ClienteDTO> listDto = list.map(obj -> new ClienteDTO(obj));
		return listDto;
	}
	
	public Cliente insert(ClienteDTO dto) {
		return repository.save(new Cliente(dto.getId(), dto.getNome(), dto.getEmail(), null, null));
	}
	
	public Cliente update(ClienteDTO dto) {
		Cliente cliente = find(dto.getId());
		cliente.setNome(dto.getNome());
		cliente.setEmail(dto.getEmail());
		return repository.save(cliente);
	}
	
	public void delete(Integer id){
		find(id);
		try {
			repository.deleteById(id);
		}catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma cliente que possui produtos");
		}
	}
	
	public List<ClienteDTO> ListToDTO(List<Cliente> lista){
		List<ClienteDTO> listaDTO = lista.stream().map(obj -> new ClienteDTO(obj)).collect(Collectors.toList());
		return listaDTO;
	}

}
