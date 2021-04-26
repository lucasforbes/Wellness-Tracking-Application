package com.wellnessapp.demo.Exersize;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Id;
import java.lang.reflect.Array;
import java.util.*;

@Getter
@Setter
@ToString

//@RestController
@Document(collection = "Exersize")
public class Exersize {
    @Id
    ObjectId id;
    String email;
    String title;
    String description;
    SingleExersize[] activityList;
    Boolean paid;
    String picture;
    String videoLink;
    Boolean approved;
    String notes;
    String[] comments;
    Integer[] ratings;
    private List<String> userIdsToExersizesSubscribed;

    public Exersize(String email, SingleExersize[] activityList, String title, String description, Boolean paid) {
        this.email = email;
        this.title = title;
        this.description = description;
        this.paid = paid;
        this.activityList = activityList;
        this.notes = "";
        this.comments = new String[100];
        this.ratings = new Integer[100];
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
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

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<String> getUserIdsToExersizesSubscribed() {
        return userIdsToExersizesSubscribed;
    }

    public void setUserIdsToExersizesSubscribed(List<String> userIdsToExersizesSubscribed) {
        this.userIdsToExersizesSubscribed = userIdsToExersizesSubscribed;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
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

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public SingleExersize[] getActivityList() {
        return activityList;
    }

    public void setActivityList(SingleExersize[] activityList) {
        this.activityList = activityList;
    }
}
