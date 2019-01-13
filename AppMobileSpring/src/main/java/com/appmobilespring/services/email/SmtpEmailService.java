package com.appmobilespring.services.email;

import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class SmtpEmailService extends AbstractEmailService{
	
	private static final Logger LOG = LoggerFactory.getLogger(MockEmailService.class);
	
	@Autowired
	private MailSender mailSender;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Override
	public void sendEmail(SimpleMailMessage smm) {
		LOG.info("Simulando envio de email...");
		mailSender.send(smm);
		LOG.info("Email enviado");
	}

	@Override
	public void sendHtmlEmail(MimeMessage mm) {
		LOG.info("Simulando envio de email HTML...");
		javaMailSender.send(mm);
		LOG.info("Email enviado");
	}

}
