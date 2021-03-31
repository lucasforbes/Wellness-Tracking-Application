package com.wellnessapp.demo.User;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

public class UserDetails {
    private String password;
    private String email;
    //    Possible way to store profile pictures?
    private String profilePic;
    private String firstName;
    private String lastName;
    private String gender;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate birthday;
    private String userType;
    private int age;
    private LocalDate signUpTime;
    private String phoneNumber;
    //    state of user: Online/Offline
    private Boolean online;
    private Boolean isDeleted;
    private List<Integer> dietsSubscribed;
    private List<Integer> exersizesSubscribed;

    public UserDetails(String firstName, String lastName, String birthday, String gender, String phoneNumber){
        this.firstName = firstName;
        this.lastName = lastName;
//        date in YYYY-MM-DD format
        this.birthday = LocalDate.parse(birthday);
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(this.birthday, currentDate);
        this.age = a.getYears();
        this.userType = "User";
        this.gender = gender;
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePic() {
        return this.profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirthday() {
        return this.birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getUserType() {
        return this.userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public LocalDate getSignUpTime() {
        return signUpTime;
    }

    public void setSignUpTime(LocalDate signUpTime) {
        this.signUpTime = signUpTime;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public List<Integer> getDietsSubscribed() {
        return dietsSubscribed;
    }

    public void setDietsSubscribed(List<Integer> dietsSubscribed) {
        this.dietsSubscribed = dietsSubscribed;
    }

    public List<Integer> getExersizesSubscribed() {
        return exersizesSubscribed;
    }

    public void setExersizesSubscribed(List<Integer> exersizesSubscribed) {
        this.exersizesSubscribed = exersizesSubscribed;
    }
}
