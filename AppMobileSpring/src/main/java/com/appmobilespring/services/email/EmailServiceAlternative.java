package com.appmobilespring.services.email;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.appmobilespring.domain.Pedido;

@Service
public class EmailServiceAlternative {
	
	private static final Logger LOG = LoggerFactory.getLogger(MockEmailService.class);
	
	@Value("${default.sender}")
	private String sender;

	public void sendEmail(Pedido pedido) {
		SimpleMailMessage smm = new SimpleMailMessage();
		smm.setFrom(sender);
		smm.setTo(pedido.getCliente().getEmail());
		smm.setSentDate(new Date(System.currentTimeMillis()));
		smm.setSubject("Pedido " + pedido.getId() + "confirmado com sucesso!");
		smm.setText(pedido.toString());
		
		LOG.info("Simulando envio de email alternativo...");
		LOG.info(smm.toString());
		LOG.info("Email enviado");
	}
}
