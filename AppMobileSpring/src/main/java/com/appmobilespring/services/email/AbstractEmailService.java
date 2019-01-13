package com.appmobilespring.services.email;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;

import com.appmobilespring.domain.Pedido;

public abstract class AbstractEmailService implements EmailService {

	@Value("${default.sender}")
	private String sender;
	
	@Override
	public void sendOrderConfirmationEmail(Pedido pedido) {
		SimpleMailMessage smm = prepareSimpleMailMessageFromPedido(pedido);
		sendEmail(smm);
	}

	private SimpleMailMessage prepareSimpleMailMessageFromPedido(Pedido pedido) {
		SimpleMailMessage smm = new SimpleMailMessage();
		smm.setFrom(sender);
		smm.setTo(pedido.getCliente().getEmail());
		smm.setSentDate(new Date(System.currentTimeMillis()));
		smm.setSubject("Pedido " + pedido.getId() + "confirmado com sucesso!");
		smm.setText(pedido.toString());
		return smm;
	}
}
