package com.wellnessapp.demo.PasswdReset;


import org.springframework.web.bind.annotation.GetMapping;

public interface EmailService {
    /***
     * Send an email with html style not just a simple text.
     * @param to
     * @param subject
     * @param content
     */

    @GetMapping("")
    Boolean sendHttpEmail(String to, String subject, String content);


}
