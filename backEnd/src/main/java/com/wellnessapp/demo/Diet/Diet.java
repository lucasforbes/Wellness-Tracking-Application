package com.wellnessapp.demo.Diet;

import javax.persistence.Id;
import java.util.List;

public class Diet {
    @Id
    int id;
    String email;
    String title;
    String description;
    SingleDiet[] dietList;
    Boolean paid;
    String picture;
    String videoLink;
    private List<Integer> userIdsToExersizesSubscribed;
    public Diet(String email, String title, String description, SingleDiet[] dietList, Boolean paid) {
        this.email = email;
        this.title = title;
        this.description = description;
        this.dietList = dietList;
        this.paid = paid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SingleDiet[] getDietList() {
        return dietList;
    }

    public List<Integer> getUserIdsToExersizesSubscribed() {
        return userIdsToExersizesSubscribed;
    }

    public void setUserIdsToExersizesSubscribed(List<Integer> userIdsToExersizesSubscribed) {
        this.userIdsToExersizesSubscribed = userIdsToExersizesSubscribed;
    }

    public void setDietList(SingleDiet[] dietList) {
        this.dietList = dietList;
    }

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }
}
