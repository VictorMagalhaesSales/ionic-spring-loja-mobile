package com.appmobilespring.services.email;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;

import com.appmobilespring.domain.Pedido;

public interface EmailService {
	
	void sendOrderConfirmationEmail(Pedido pedido);
	
	void sendEmail(SimpleMailMessage smm);
	
	void sendOrderConfirmationHtmlEmail(Pedido pedido);
	
	void sendHtmlEmail(MimeMessage mm);
}
