package com.wellnessapp.demo.PasswdReset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
public class BackUpOperations {
    @Autowired
    private VerifyCodeRepository vcdb;

    @GetMapping("/verifycode/findall")
    public List<VerifyCode> getAllVerifyCode(){
        return this.vcdb.findAll();
    }

    @GetMapping("/verifycode0/{id}")
    public void setVerifyCodeToZero(@PathVariable String id){
        System.out.println(id);
        Integer id_int = Integer.parseInt(id);
        Optional<VerifyCode> verifyCode = vcdb.findById(id_int);
        if(verifyCode != null) {
            verifyCode.get().setState(0);
            vcdb.save(verifyCode.get());
        }else {
            System.out.println("no verifycode");
        }
    }
    @GetMapping("/verifycode1/{email}")
    public void setVerifyCodeToOne(@PathVariable String email){
        VerifyCode verifyCode = vcdb.findByEmail(email);
        if(verifyCode != null) {
            verifyCode.setState(1);
            vcdb.save(verifyCode);
        }
    }


}
