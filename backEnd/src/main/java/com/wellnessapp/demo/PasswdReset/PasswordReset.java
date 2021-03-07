package com.wellnessapp.demo.PasswdReset;


import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.UnifiedReturnValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.Random;

public class PasswordReset {
    @Autowired
    private EmailService mailService;
    @Autowired
    private UserRepository udb;

    private UnifiedReturnValue unifiedReturnValue;


    @GetMapping("/pwdreset")
    @ResponseBody
    public Object passwdReset(@RequestParam String email, @RequestParam String newPasswd, @RequestParam String code){
        /**
         * 1. compared the code with the database
         * 2. if they are the same, change the password for the user; if not, tell user failed.
         * 3. modify the code state to 0, which means the code is out-dated.
         */


        return null;
    }

    @GetMapping("/sendcode")
    @ResponseBody
    public UnifiedReturnValue sendCode(@RequestParam String email){
        StringBuffer newcode = generateCode();
        /***
         * 1. storage the code into the database
         *    DB: verifycode(been set)
         *    column: Number(int, auto increasement)
         *            Email
         *            Code
         *            State(When send user an email, in 15 min can a user change password, the state should be 1, otherwise 0)
         *    We now don't consider the time, all of state should be 1 and when the passwd reset, change it to 0
         *    the form is like:
         *    {
         *        Number: "1",
         *        Email: "jimmy@google.com",
         *        Code: "15s2q6",
         *        State: 1
         *    }
         *
         * 2. send an email to user
         * 3. using function "passwdReset" to verify if the code is correct and if correct, modify the passwd.
         * 4. in function "passwdReset", whatever the result is, return the UnifiedReturnValue to the front end.
         */
        User user = udb.findByEmail(email);

        if(user == null){
            unifiedReturnValue = new UnifiedReturnValue(false, 404, "no user found", "there is no user's email is： "+email, "PassWordReset", new Date());
            return unifiedReturnValue;
        }
        Boolean emailSentFeedBack = new EmailServiceImpl().sendHttpEmail(email, "Please check the code", newcode.toString());
        if(emailSentFeedBack == false) {
            return new UnifiedReturnValue(false, 404, "Email sent failure", "the email wasn't sent to " + email, "sendCode", new Date());
        }else {
            return new UnifiedReturnValue(true, 200, "Email sent successfully", "the email has been sent to the user "+email, "sendCode", new Date());
        }

    }


    public StringBuffer generateCode(){
        StringBuffer flag = new StringBuffer();
        for (int i = 0; i <= 100; i++) {
            String sources = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
            Random rand = new Random();

            for (int j = 0; j < 6; j++) {
                flag.append(sources.charAt(rand.nextInt(9)));
            }
        }
        return flag;
    }



}
