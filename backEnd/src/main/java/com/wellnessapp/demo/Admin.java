package com.wellnessapp.demo;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.gridfs.GridFsObject;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Document(collection="Admin")
public class Admin {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;

    public Admin(int id, String password, String email,  String firstName, String lastName, String phone) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    public Admin() {

    }


    public String printAdmin() {
        String r = "Name: " + getFirstName() + " " + getLastName() + ", Email: " + getEmail() + ", Phone: " + getPhone();
        return r;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}