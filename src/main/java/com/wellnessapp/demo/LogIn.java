package com.wellnessapp.demo;

import org.apache.tomcat.util.json.Token;

public class LogIn {
    private String userID;
    private String password;
    private Token authKey;


    public LogIn(String userID, String password, Token authKey) {
        this.userID = userID;
        this.password = password;
        this.authKey = authKey;
    }

    public Boolean signIn(){
        // check if userID / password / authkey are in database and provide response
        return true;
    }
}
