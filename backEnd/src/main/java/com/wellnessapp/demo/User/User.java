package com.wellnessapp.demo.User;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Id;
import java.security.SecureRandom;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    private List<ObjectId> dietsSubscribed;
    private List<ObjectId> exersizesSubscribed;
    private List<String> paidCreatorsSubscribed;
    private String token;

    // need to figure out picture, for now taking out of constructor:
//    GridFsObject profilePic,
    // need to figure out Json to date, for now taking out of constructor
//    , Date signUpTime
//    removed , String firstName, String lastName, String birthday, String gender, Boolean online, Boolean isDeleted from constructer
    public User(String password, String email) {
        this.password = password;
        this.email = email;
//        this.profilePic = profilePic;
        // add picture to image database
        this.firstName = "firstName";
        this.lastName = "lastName";
//        date in YYYY-MM-DD format
        this.birthday = LocalDate.parse("2021-01-01");
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(this.birthday, currentDate);
        this.age = a.getYears();
        this.userType = "User";
        this.gender = "";
        this.online = true;
        this.isDeleted = false;
        this.signUpTime = currentDate;
        this.exersizesSubscribed = new ArrayList<>();
        this.dietsSubscribed = new ArrayList<>();
        this.paidCreatorsSubscribed = new ArrayList<>();
        this.phoneNumber = "";
    }

    public User() {

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

    public List<ObjectId> getDietsSubscribed() {
        return dietsSubscribed;
    }

    public void setDietsSubscribed(List<ObjectId> dietsSubscribed) {
        this.dietsSubscribed = dietsSubscribed;
    }

    public List<ObjectId> getExersizesSubscribed() {
        return exersizesSubscribed;
    }

    public void setExersizesSubscribed(List<ObjectId> exersizesSubscribed) {
        this.exersizesSubscribed = exersizesSubscribed;
    }

    public String getToken() {
        return token;
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

    public List<String> getPaidCreatorsSubscribed() {
        return paidCreatorsSubscribed;
    }

    public void setPaidCreatorsSubscribed(List<String> paidCreatorsSubscribed) {
        this.paidCreatorsSubscribed = paidCreatorsSubscribed;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", profilePic='" + profilePic + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", gender='" + gender + '\'' +
                ", birthday=" + birthday +
                ", userType='" + userType + '\'' +
                ", age=" + age +
                ", signUpTime=" + signUpTime +
                ", online=" + online +
                ", isDeleted=" + isDeleted +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return getId() == user.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmail());
    }
}