package com.appmobilespring.services.email;

import java.util.Date;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.appmobilespring.domain.Pedido;

public abstract class AbstractEmailService implements EmailService {

	@Value("${default.sender}")
	private String sender;
	
	@Autowired
	private TemplateEngine templateEngine;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
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
		smm.setSubject("Pedido de código " + pedido.getId() + " confirmado com sucesso!");
		smm.setText(pedido.toString());
		return smm;
	}
	
	protected String htmlFromTemplatePedido(Pedido pedido) {
		Context context = new Context();
		context.setVariable("pedido", pedido);
		return templateEngine.process("email/confirmacaoPedido", context);
	}
	
	@Override
	public void sendOrderConfirmationHtmlEmail(Pedido pedido) {
		try {
			MimeMessage mm = prepareMimeMessageFromPedido(pedido);
			sendHtmlEmail(mm);
		} catch (MessagingException e) {
			sendOrderConfirmationEmail(pedido);
		}
	}

	private MimeMessage prepareMimeMessageFromPedido(Pedido pedido) throws MessagingException {
		MimeMessage mm = javaMailSender.createMimeMessage();
		MimeMessageHelper mmh = new MimeMessageHelper(mm, true);
		mmh.setTo(pedido.getCliente().getEmail());
		mmh.setFrom(sender);
		mmh.setSubject("Pedido de código " + pedido.getId() + " confirmado com sucesso!");
		mmh.setSentDate(new Date(System.currentTimeMillis()));
		mmh.setText(htmlFromTemplatePedido(pedido), true);
		return mm;
	}
	
}
