package com.wellnessapp.demo.Creator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.wellnessapp.demo.WellnessApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.security.SecureRandom;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
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
    private List<String> userIdsToDietsSubscribed;
    private List<String> userIdsToExersizesSubscribed;
    private List<String> paidUsers;
    private String token;
    private int moneyRecieved;
    // need to figure out picture, for now taking out of constructor:
//    GridFsObject profilePic,
    // need to figure out Json to date, for now taking out of constructor
//    , Date signUpTime
    public Creator( String password, String email) {
        this.password = password;
        this.email = email;
//        this.profilePic = profilePic;
        this.firstName = "firstName";
        this.lastName = "lastName";
        this.birthday = LocalDate.parse("2021-01-01");
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(this.birthday, currentDate);
        this.age = a.getYears();
        this.nutritionist = true;
        this.trainer = true;
        this.signUpTime = currentDate;
//        set up age as a function of birthday
        this.userType = "Creator";
        this.level = 0;
        this.gender = "gender";
        this.online = true;
        this.isDeleted = false;
        this.userIdsToDietsSubscribed = new ArrayList<>();
        this.userIdsToExersizesSubscribed = new ArrayList<>();
        this.paidUsers = new ArrayList<>();
        this.phoneNumber = "";
        this.moneyRecieved = 0;
        this.token = "";
    }

    public Creator() {

    }

    public int getMoneyRecieved() {
        return moneyRecieved;
    }

    public void setMoneyRecieved(int moneyRecieved) {
        this.moneyRecieved = moneyRecieved;
    }

    public String printUser() {
        String r = "Name: " + getFirstName() + " " + getLastName() + ", Email: " + getEmail();
        return r;
    }
    public String getToken() {
        return this.token;
    }

    public void setToken() {
//        code for setting new token
        String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
        String CHAR_UPPER = CHAR_LOWER.toUpperCase();
        String NUMBER = "0123456789";

        String DATA_FOR_RANDOM_STRING = CHAR_LOWER + CHAR_UPPER + NUMBER;
        SecureRandom random = new SecureRandom();

        StringBuilder sb = new StringBuilder(16);

        for (int i = 0; i < 16; i++) {
            // 0-62 (exclusive), random returns 0-61
            int rndCharAt = random.nextInt(DATA_FOR_RANDOM_STRING.length());
            char rndChar = DATA_FOR_RANDOM_STRING.charAt(rndCharAt);

            sb.append(rndChar);
        }
        this.token = sb.toString();
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

    public List<String> getUserIdsToDietsSubscribed() {
        return userIdsToDietsSubscribed;
    }

    public void setUserIdsToDietsSubscribed(List<String> userIdsToDietsSubscribed) {
        this.userIdsToDietsSubscribed = userIdsToDietsSubscribed;
    }

    public List<String> getPaidUsers() {
        return paidUsers;
    }

    public void setPaidUsers(List<String> paidUsers) {
        this.paidUsers = paidUsers;
    }

    public List<String> getUserIdsToExersizesSubscribed() {
        return userIdsToExersizesSubscribed;
    }

    public void setUserIdsToExersizesSubscribed(List<String> userIdsToExersizesSubscribed) {
        this.userIdsToExersizesSubscribed = userIdsToExersizesSubscribed;
    }
}