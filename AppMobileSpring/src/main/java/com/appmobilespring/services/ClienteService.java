package com.appmobilespring.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appmobilespring.domain.Cidade;
import com.appmobilespring.domain.Cliente;
import com.appmobilespring.domain.Endereco;
import com.appmobilespring.domain.enums.TipoCliente;
import com.appmobilespring.dto.ClienteDTO;
import com.appmobilespring.dto.ClienteNewDTO;
import com.appmobilespring.repositories.ClienteRepository;
import com.appmobilespring.repositories.EnderecoRepository;
import com.appmobilespring.services.exceptions.DataIntegrityException;
import com.appmobilespring.services.exceptions.ObjectNotFoundException;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
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
	
	@Transactional // Essa anotação permite que todos os inserts desse método ocorram na mesma transação
	public Cliente insert(ClienteNewDTO dto) {
		Cliente cliente = dtoToCliente(dto);
		Endereco endereco = dtoToEndereco(dto);
		
		cliente.setEnderecos(Arrays.asList(endereco));
		endereco.setCliente(cliente);
		
		cliente = repository.save(cliente);
		endereco = enderecoRepository.save(endereco);
		
		return cliente;
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

	public Cliente dtoToCliente(ClienteNewDTO dto) {
		Cliente cliente = new Cliente(null, dto.getNome(), dto.getEmail(), dto.getCpfOuCnpj(), TipoCliente.toEnum(dto.getTipo()));
		List<String> list = Arrays.asList(dto.getTelefone1(),dto.getTelefone2(),dto.getTelefone3());
		Set<String> telefones = list.stream().collect(Collectors.toSet());
		cliente.setTelefones(telefones);
		return cliente;
	}

	public Endereco dtoToEndereco(ClienteNewDTO dto) {
		return new Endereco(
				null,
				dto.getLogradouro(),
				dto.getNumero(),
				dto.getComplemento(),
				dto.getBairro(),
				dto.getCep(),
				null,
				new Cidade(dto.getCidadeId(), null, null)
				);
	}

}
