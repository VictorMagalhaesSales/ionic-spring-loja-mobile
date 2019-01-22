package com.appmobilespring.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appmobilespring.domain.Cidade;
import com.appmobilespring.domain.Cliente;
import com.appmobilespring.domain.Endereco;
import com.appmobilespring.domain.enums.Perfil;
import com.appmobilespring.domain.enums.TipoCliente;
import com.appmobilespring.dto.ClienteDTO;
import com.appmobilespring.dto.ClienteNewDTO;
import com.appmobilespring.repositories.ClienteRepository;
import com.appmobilespring.repositories.EnderecoRepository;
import com.appmobilespring.resources.exception.types.AuthorizationException;
import com.appmobilespring.resources.exception.types.DataIntegrityException;
import com.appmobilespring.resources.exception.types.ObjectNotFoundException;
import com.appmobilespring.security.UserSS;
import com.appmobilespring.services.email.EmailServiceAlternative;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCPE;
	
	@Autowired
	private EmailServiceAlternative emailServiceAlternative;
	
	public Cliente find(Integer id) {
		UserSS user = UserService.authenticated();
		if(user != null && !id.equals(user.getId()) && !user.hasRole(Perfil.ADMIN)) throw new AuthorizationException("Acesso negado");
		Optional<Cliente> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName()));
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
	
	public Cliente findByEmail(String email) {
		UserSS user = UserService.authenticated();
		if (user == null || !user.hasRole(Perfil.ADMIN) && !email.equals(user.getUsername())) {
			throw new AuthorizationException("Acesso negado");
		}

		Cliente obj = repository.findByEmail(email);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + user.getId() + ", Tipo: " + Cliente.class.getName());
		}
		return obj;
	}
	
	@Transactional // Essa anotação permite que todos os inserts desse método ocorram na mesma transação
	public Cliente insert(ClienteNewDTO dto) {
		Cliente cliente = dtoToCliente(dto);
		Endereco endereco = dtoToEndereco(dto);
		cliente.setEnderecos(Arrays.asList(endereco));
		endereco.setCliente(cliente);		
		cliente = repository.save(cliente);
		endereco = enderecoRepository.save(endereco);
		try {
			emailServiceAlternative.sendHtmlEmail(dto);
		} catch (MessagingException e) {
			emailServiceAlternative.sendEmail(dto);
		}
		return cliente;
	}
	
	public Cliente update(Cliente cliente) {
		Cliente cliente2 = find(cliente.getId());
		cliente2.setNome(cliente.getNome());
		cliente2.setEmail(cliente.getEmail());
		cliente2.setCpfOuCnpj(cliente.getCpfOuCnpj());
		cliente2.setTelefones(cliente.getTelefones());
		return repository.save(cliente2);
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
		Cliente cliente = new Cliente(null, dto.getNome(), dto.getEmail(), bCPE.encode(dto.getSenha()), dto.getCpfOuCnpj(), TipoCliente.toEnum(dto.getTipo()));
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
