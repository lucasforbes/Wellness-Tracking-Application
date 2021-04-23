package com.wellnessapp.demo.SignInLogIn;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.wellnessapp.demo.Admin.Admin;
import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.tools.Image;
import org.h2.util.json.JSONArray;
import org.h2.util.json.JSONObject;

import java.net.URL;
import java.time.LocalDate;
import java.util.Date;

import static org.h2.value.Value.JSON;


public class ReturnInfo {
    private boolean status;
    private String errorMessage;
    private int id;
    private String password;
    private String email;
    private String profilePic;
    private String firstName;
    private String lastName;
    private String gender;
    private LocalDate birthday;
    private int age;
    private LocalDate signUpTime;
    private String userType;
    private Boolean nutritionist;
    private Boolean trainer;
    private int level;
    //    state of user: Online/Offline
    private Boolean online;
    private String phone;
    private Boolean isDeleted;
    private String token;
//    JsonArray with the current user info to send to front end
    ObjectNode retInfo;

    // constructor for Users
    public ReturnInfo(User user){
        this.status = true;
        this.id = user.getId();
        this.password = user.getPassword();
        this.profilePic = user.getProfilePic();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.age = user.getAge();
        this.lastName = user.getLastName();
        this.gender = user.getGender();
        this.birthday = user.getBirthday();
        this.signUpTime = user.getSignUpTime();
        this.userType = user.getUserType();
        this.online = user.getOnline();
        this.isDeleted = user.getIsDeleted();
        this.token = user.getToken();
        System.out.println("Got return info for user");
    }
//    constructor for Creators
    public ReturnInfo(Creator creator){
        this.status = true;
        this.id = creator.getId();
        this.password = creator.getPassword();
        this.email = creator.getEmail();
        this.profilePic = creator.getProfilePic();
        this.firstName = creator.getFirstName();
        this.lastName = creator.getLastName();
        this.gender = creator.getGender();
        this.birthday = creator.getBirthday();
        this.age = creator.getAge();
        this.nutritionist = creator.getNutritionist();
        this.trainer = creator.getTrainer();
        this.level = creator.getLevel();
        this.signUpTime = creator.getSignUpTime();
        this.userType = creator.getUserType();
        this.online = creator.getOnline();
        this.isDeleted = creator.getDeleted();
        this.token = creator.getToken();
        System.out.println("Got return info for creator");
    }
//    constructor for Admins
    public ReturnInfo(Admin admin){
        this.status = true;
        this.id = admin.getId();
        this.profilePic = "";
        this.password = admin.getPassword();
        this.email = admin.getEmail();
        this.firstName = admin.getFirstName();
        this.lastName = admin.getLastName();
        this.phone = admin.getPhone();
        this.userType = admin.getUserType();
    }

    public ReturnInfo(int i){
        if(i == 0){
            this.status = false;
            this.errorMessage = "Incorrect Password";
        }
        else{
            this.status = false;
            this.errorMessage = "No Account Associated With This Email";
        }
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
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

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public int getAge() {
        return age;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public ObjectNode getRetInfo() {
        return retInfo;
    }

    public void setRetInfo(ObjectNode retInfo) {
        this.retInfo = retInfo;
    }
}
