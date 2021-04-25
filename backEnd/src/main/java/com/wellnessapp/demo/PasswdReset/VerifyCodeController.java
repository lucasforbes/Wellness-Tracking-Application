package com.wellnessapp.demo.PasswdReset;

import com.google.gson.Gson;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.Encrypt;
import com.wellnessapp.demo.tools.UnifiedReturnValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import static java.lang.Thread.sleep;


@RestController
public class VerifyCodeController{

    @Autowired
    private UserRepository udb;
    @Autowired
    private VerifyCodeRepository vcdb;

    VerifyCode verifyCode = new VerifyCode();

//adding comment to make change to file so heroku will build quickly

    @PostMapping("/findcode")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String isInvalidCode(@RequestParam("email") String email, @RequestParam("code") String code, @RequestParam("pwd")String password){
        List<VerifyCode> codeCollection = vcdb.findAllByEmail(email);
        for(VerifyCode verifyCode: codeCollection) {
            if (verifyCode.getState() == 1 && code.equals(verifyCode.getVerifyCode())) {
                User user = udb.findByEmail(email);
                user.setPassword(Encrypt.md5Encrypt(user.getPassword()));
                verifyCode.setState(0);
                vcdb.save(verifyCode);
                udb.save(user);
                return new UnifiedReturnValue(true, 200, "Successfully", "password for "+email + " has been reset", "isInvalidCode", new Date()).unifiedReturnValue();
            }
        }
        return new UnifiedReturnValue(false, 404, "No verifyCode", "new verifyCode found Failed", "isInvalidCode", new Date()).unifiedReturnValue();
    }
}
