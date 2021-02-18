package com.wellnessapp.demo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.gridfs.GridFsObject;

import java.util.Date;
@Getter
@Setter
@ToString

@Document(collection="User")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private String username;
    private String password;
    private String email;
    //    Possible way to store profile pictures?
    private GridFsObject profilePic;
    private String firstName;
    private String lastName;
    private String gender;
    // get city/state from coords in registration or manual entry
    private String city;
    private String state;
    private String phone;
    private Date signUpTime;
//    state of user: Online/Offline
    private Boolean online;
    private Boolean isDeleted;

    // need to figure out picture, for now taking out of constructor:
//    GridFsObject profilePic,
    // need to figure out Json to date, for now taking out of constructor
//    , Date signUpTime
    public User(int id, String username, String password, String email,  String firstName, String lastName, String gender, String city, String state, String phone, Boolean online, Boolean isDeleted) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
//        this.profilePic = profilePic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.city = city;
        this.state = state;
        this.phone = phone;

        this.online = online;
        this.isDeleted = isDeleted;
    }

    public User() {

    }


    public String printUser() {
        String r = "Username: " + getUsername() + ", Email: " + getEmail() + ", State: " + getState();
        return r;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public GridFsObject getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(GridFsObject profilePic) {
        this.profilePic = profilePic;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getSignUpTime() {
        return signUpTime;
    }

    public void setSignUpTime(Date signUpTime) {
        this.signUpTime = signUpTime;
    }

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}