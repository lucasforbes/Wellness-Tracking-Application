package com.wellnessapp.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class SignInController {
    @Autowired
    private UserRepository udb;
    @Autowired
    private CreatorRepository cdb;
    @Autowired
    private AdminRepository adb;

    @PostMapping("/signIn")
    @ResponseBody
    public Boolean signIn(@RequestBody SignInArray signInArray){
        System.out.println("");
        String email = signInArray.getEmail();
        String password = signInArray.getPassword();
        try{
            String tempPassword = udb.findByEmail(email).getPassword();
            if(tempPassword.compareTo(password) == 0){
                return true;
            }
            else{
                return false;
            }
        }catch (Exception e){
            try{
                String tempPassword = cdb.findByEmail(email).getPassword();
                if(tempPassword.compareTo(password) == 0){
                    return true;
                }
                else{
                    return false;
                }
            }
            catch (Exception f){
                try{
                    String tempPassword = adb.findByEmail(email).getPassword();
                    if(tempPassword.compareTo(password) == 0){
                        return true;
                    }
                    else{
                        return false;
                    }
                }catch (Exception g){
                    return false;
                }
            }
        }

    }
}
