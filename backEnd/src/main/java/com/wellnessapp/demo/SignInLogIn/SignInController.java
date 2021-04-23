package com.wellnessapp.demo.SignInLogIn;

import com.wellnessapp.demo.Admin.AdminRepository;
import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.Creator.CreatorRepository;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import org.h2.util.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class SignInController {
    @Autowired
    private UserRepository udb;
    @Autowired
    private CreatorRepository cdb;
    @Autowired
    private AdminRepository adb;

//    instances of blank users/creator/admins fill in with correct info if email password matches and return

    @PostMapping("/signIn")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public ReturnInfo signIn(@RequestBody SignInArray signInArray){
        System.out.println("");
        String email = signInArray.getEmail();
        String password = signInArray.getPassword();
        System.out.println("Trying to Sign In");
        try{
            String tempPassword = udb.findByEmail(email).getPassword();
            if(tempPassword.compareTo(password) == 0){
                User currentUser = udb.findByEmail(email);
                System.out.println("Signing in user:" + currentUser);
//                reset token to new 16 char token
                currentUser.setToken();
                udb.save(currentUser);
                ReturnInfo retInfo  = new ReturnInfo(currentUser);
                System.out.println("Signed In");
                return retInfo;
            }
            else{
                return new ReturnInfo(0);
            }
        }catch (Exception e){
            try{
                String tempPassword = cdb.findByEmail(email).getPassword();
                if(tempPassword.compareTo(password) == 0){
//                    reset token to new 16 char token
                    Creator creator = cdb.findByEmail(email);
                    System.out.println("Signing in creator:" + creator);
                    creator.setToken();
                    cdb.save(creator);
                    System.out.println("Signed In");
                    return new ReturnInfo(creator);
                }
                else{
                    return new ReturnInfo(0);
                }
            }
            catch (Exception f){
                try{
                    String tempPassword = adb.findByEmail(email).getPassword();
                    if(tempPassword.compareTo(password) == 0){
                        System.out.println("Signed In");
                        return new ReturnInfo(adb.findByEmail(email));
                    }
                    else{
                        return new ReturnInfo(0);
                    }
                }catch (Exception g){
                    return new ReturnInfo(1);
                }
            }
        }

    }
}
