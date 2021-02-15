package com.wellnessapp.demo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.springframework.data.annotation.Id;


public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String name;
    private String email;
    // get state from coords in registration
    private String state;

    public User(Long id, String name, String email, String state) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.state = state;
    }

    public User() {

    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String printUser() {
        String r = "User: " + getName() + ", Email: " + getEmail() + ", State: " + getState();
        return r;
    }
}