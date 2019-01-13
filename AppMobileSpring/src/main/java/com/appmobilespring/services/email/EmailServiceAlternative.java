package com.appmobilespring.services.email;

import java.util.Date;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.appmobilespring.domain.Pedido;

@Service
public class EmailServiceAlternative {
	
	private static final Logger LOG = LoggerFactory.getLogger(MockEmailService.class);
	
	@Value("${default.sender}")
	private String sender;
	
	@Autowired
	private MailSender mailSender;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TemplateEngine templateEngine;

	public void sendEmail(Pedido pedido) {
		SimpleMailMessage smm = new SimpleMailMessage();
		smm.setFrom(sender);
		smm.setTo(pedido.getCliente().getEmail());
		smm.setSentDate(new Date(System.currentTimeMillis()));
		smm.setSubject("Pedido " + pedido.getId() + " confirmado com sucesso!");
		smm.setText(pedido.toString());
		
		LOG.info("Simulando envio de email alternativo...");
		mailSender.send(smm);
		LOG.info("Email enviado");
	}
	
	private String htmlFromTemplatePedido(Pedido pedido) {
		Context context = new Context();
		context.setVariable("pedido", pedido);
		return templateEngine.process("email/confirmacaoPedido", context);
	}
	
	public void sendHtmlEmail(Pedido pedido) throws MessagingException {
		MimeMessage mm = javaMailSender.createMimeMessage();
		MimeMessageHelper mmh = new MimeMessageHelper(mm, true);
		mmh.setTo(pedido.getCliente().getEmail());
		mmh.setFrom(sender);
		mmh.setSubject("Pedido de código " + pedido.getId() + " confirmado com sucesso!(Forma alternativa customizada e simplificada)");
		mmh.setSentDate(new Date(System.currentTimeMillis()));
		mmh.setText(htmlFromTemplatePedido(pedido), true);

		LOG.info("Simulando envio de email alternativo HTML...");
		javaMailSender.send(mm);
		LOG.info("Email enviado");
	}
}
