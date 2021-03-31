package com.wellnessapp.demo.Creator;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

public class CreatorDetails {
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

    public CreatorDetails(String firstName, String lastName, String birthday, String gender, String phoneNumber){
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = LocalDate.parse(birthday);
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(this.birthday, currentDate);
        this.age = a.getYears();
        this.gender = gender;
        this.phoneNumber = phoneNumber;
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

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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
