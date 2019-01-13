package com.appmobilespring.services.email;

import org.springframework.mail.SimpleMailMessage;

import com.appmobilespring.domain.Pedido;

public interface EmailService {
	
	void sendOrderConfirmationEmail(Pedido pedido);
	
	void sendEmail(SimpleMailMessage msg);
}
