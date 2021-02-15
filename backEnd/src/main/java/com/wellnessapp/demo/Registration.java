package com.wellnessapp.demo;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class Registration {
    // variables that we may or may not request upon registering
    private String name;
    private String userID;
    private String password;
    private Date birthday;
    private int age;
    // gps coords based on IP address?
    private Pair coords;

    public void showRegistration(){
        System.out.println("got the registration object");
    }
//    params for the constructor
// String name, String, userID, String password, Date birthday, int age, Pair coords
    public Registration() {
//        this.name = name;
//        this.userID = userID;
//        this.password = password;
//        this.birthday = birthday;
//        this.age = age;
//        this.coords = coords;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Pair getCoords() {
        return coords;
    }

    public void setCoords(Pair coords) {
        this.coords = coords;
    }
    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }



}
