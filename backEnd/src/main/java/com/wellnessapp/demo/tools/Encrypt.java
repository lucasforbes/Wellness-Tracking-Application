package com.wellnessapp.demo.tools;


import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;

@Component
public class Encrypt {
    public static String md5Encrypt(String content){
        return DigestUtils.md5Hex(content);
    }
}
