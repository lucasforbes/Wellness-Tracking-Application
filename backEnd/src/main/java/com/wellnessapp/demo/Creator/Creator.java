package com.wellnessapp.demo.Creator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.wellnessapp.demo.WellnessApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.gridfs.GridFsObject;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.net.URL;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "Creator")
public class Creator extends WellnessApplication {
    @Autowired
    private CreatorRepository cdb;
    @Id
    private int id;
    private String password;
    private String email;
    //    Possible way to store profile pictures?
    private String profilePic;
    private String firstName;
    private String lastName;
    private String gender;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate birthday;
    private int age;
    private LocalDate signUpTime;
    private String userType;
    private Boolean nutritionist;
    private Boolean trainer;
    private int level;
    //    state of user: Online/Offline
    private Boolean online;
    private Boolean isDeleted;
    private String phoneNumber;
    private List<Integer> userIdsToDietsSubscribed;
    private List<Integer> userIdsToExersizesSubscribed;
    // need to figure out picture, for now taking out of constructor:
//    GridFsObject profilePic,
    // need to figure out Json to date, for now taking out of constructor
//    , Date signUpTime
    public Creator( String password, String email, String firstName, String lastName, String birthday, Boolean nutritionist, Boolean trainer, String gender,  Boolean online) {
        this.password = password;
        this.email = email;
//        this.profilePic = profilePic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = LocalDate.parse(birthday);
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(this.birthday, currentDate);
        this.age = a.getYears();
        this.nutritionist = nutritionist;
        this.trainer = trainer;
        this.signUpTime = currentDate;
//        set up age as a function of birthday
        this.userType = "Creator";
        this.level = 0;
        this.gender = gender;
        this.online = online;
        this.isDeleted = false;
        this.userIdsToDietsSubscribed = new ArrayList<>();
        this.userIdsToExersizesSubscribed = new ArrayList<>();
        this.phoneNumber = "5743397212";
    }

    public Creator() {

    }


    public String printUser() {
        String r = "Name: " + getFirstName() + " " + getLastName() + ", Email: " + getEmail();
        return r;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getId() {
        return id;
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

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
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

    public LocalDate getSignUpTime() {
        return signUpTime;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public void setSignUpTime(LocalDate signUpTime) {
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

    public void setDeleted(Boolean isDeletedeleted) {
        isDeleted = isDeleted;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Boolean getNutritionist() {
        return nutritionist;
    }

    public void setNutritionist(Boolean nutritionist) {
        this.nutritionist = nutritionist;
    }

    public Boolean getTrainer() {
        return trainer;
    }

    public void setTrainer(Boolean trainer) {
        this.trainer = trainer;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public List<Integer> getUserIdsToDietsSubscribed() {
        return userIdsToDietsSubscribed;
    }

    public void setUserIdsToDietsSubscribed(List<Integer> userIdsToDietsSubscribed) {
        this.userIdsToDietsSubscribed = userIdsToDietsSubscribed;
    }

    public List<Integer> getUserIdsToExersizesSubscribed() {
        return userIdsToExersizesSubscribed;
    }

    public void setUserIdsToExersizesSubscribed(List<Integer> userIdsToExersizesSubscribed) {
        this.userIdsToExersizesSubscribed = userIdsToExersizesSubscribed;
    }
}