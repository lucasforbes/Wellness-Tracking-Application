package com.wellnessapp.demo.User;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.print.DocFlavor;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.wellnessapp.demo.WellnessApplication;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.gridfs.GridFsObject;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.Locale;

@Getter
@Setter
@ToString

@RestController
@Document(collection = "User")
public class User {
    @Autowired
    private UserRepository udb;
    @Id
    private int id;
    private String password;
    private String email;
    //    Possible way to store profile pictures?
    private URL profilePic;
    private String firstName;
    private String lastName;
    private String gender;

    private LocalDate birthday;
    private String userType;
    private int age;
    private Date signUpTime;
    //    state of user: Online/Offline
    private Boolean online;
    private Boolean isDeleted;

    // need to figure out picture, for now taking out of constructor:
//    GridFsObject profilePic,
    // need to figure out Json to date, for now taking out of constructor
//    , Date signUpTime
    public User(String password, String email, URL profilePic, String firstName, String lastName, String birthday, String gender, Boolean online, Boolean isDeleted) {
        this.password = password;
        this.email = email;
        this.profilePic = profilePic;
        this.firstName = firstName;
        this.lastName = lastName;
        //set up age as a function of now to birthday
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy", Locale.ENGLISH);
        this.birthday = LocalDate.parse(birthday);
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(this.birthday, currentDate);
        this.age = a.getYears();
        this.userType = "User";
        this.gender = gender;
        this.online = online;
        this.isDeleted = isDeleted;
    }

    public User() {

    }


    public String printUser() {
        String r = "Name: " + getFirstName() + " " + getLastName() + ", Email: " + getEmail();
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

    public URL getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(URL profilePic) {
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

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}