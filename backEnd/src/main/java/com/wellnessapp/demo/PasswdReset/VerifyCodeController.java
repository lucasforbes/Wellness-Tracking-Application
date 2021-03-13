package com.wellnessapp.demo.PasswdReset;

import com.google.gson.Gson;
import com.wellnessapp.demo.tools.UnifiedReturnValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

import static java.lang.Thread.sleep;


@RestController
public class VerifyCodeController{

    @Autowired
    private VerifyCodeRepository vcdb;

    VerifyCode verifyCode = new VerifyCode();

    @GetMapping("/newcode")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public String saveNewVerifyCode(@RequestParam(name = "email") String email, @RequestParam(name = "code") String code){
        try {

            verifyCode.setEmail(email);
            verifyCode.setVerifyCode(code);
            verifyCode.setState(1);
            vcdb.save(verifyCode);


            /***
             * new thread to deal with 60s invalidate verifyCode
             */
            new Thread(new Runnable() {
                public void run() {
                    try {
                        sleep(60000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    verifyCode.setState(0);
                    vcdb.save(verifyCode);
                }
            }).start();
        }catch (Exception e){
            e.printStackTrace();
            return new UnifiedReturnValue(false, 404, "new verifyCode", "new verifyCode created Failed", "saveNewVerifyCode", new Date()).unifiedReturnValue();
        }
        return new UnifiedReturnValue(true, 200, "new verifyCode", "new verifyCode created successfully", "saveNewVerifyCode", new Date()).unifiedReturnValue();
    }



    @GetMapping("/findcode/{email}")
    public String isInvalidCode(@PathVariable String email){
        VerifyCode verifyCode = vcdb.findByEmail(email);
        if(verifyCode.getState() == 1){
            return new UnifiedReturnValue(true, 200, "Has verifyCode", "new verifyCode found successfully", "isInvalidCode", new Date()).unifiedReturnValue();
        }
        return new UnifiedReturnValue(false, 404, "No verifyCode", "new verifyCode found Failed", "isInvalidCode", new Date()).unifiedReturnValue();
    }
}
