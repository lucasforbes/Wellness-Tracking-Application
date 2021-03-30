package com.wellnessapp.demo.PasswdReset;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class EmailServiceImpl implements EmailService{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.from}")
    private String from;

    /***
     *
     * @param to: want to send an email to whom
     * @param subject: what is the subject of the email
     * @param content: what is the content of the email
     */
    @Override
    public Boolean sendHttpEmail(String to, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper;
        try {
            messageHelper = new MimeMessageHelper(message, true);
            //sender
            messageHelper.setFrom(from);
            //receiver
            messageHelper.setTo(to);
            //subject of the email
            message.setSubject(subject);
            //content of the email, in html style
            messageHelper.setText(content, true);

            mailSender.send(message);

            logger.info("Email Sent Successfully");
        } catch (MessagingException e) {
            logger.error("Errors While Sending Email", e);
            return false;
        }
        return true;

    }
}
