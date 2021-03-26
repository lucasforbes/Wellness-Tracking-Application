package com.wellnessapp.demo.Exersize;

public class SingleExersize {
//    String picture;
    String videoLink;
    String activityName;
    String activityDescription;
    String bodyPartsTargeted;
    int activitySets;
    int activityReps;
    String equiptmentNeeded;
//    minutes
    int totalDuration;

    public SingleExersize(String activityName, String activityDescription, String bodyPartsTargeted, int activitySets, int activityReps, String equiptmentNeeded, int totalDuration, String videoLink) {
//        this.picture = picture;
        this.videoLink = videoLink;
        this.activityName = activityName;
        this.activityDescription = activityDescription;
        this.bodyPartsTargeted = bodyPartsTargeted;
        this.activitySets = activitySets;
        this.activityReps = activityReps;
        this.equiptmentNeeded = equiptmentNeeded;
        this.totalDuration = totalDuration;
        System.out.println("Single Exersize made");
    }

//    public String getPicture() {
//        return picture;
//    }
//
//    public void setPicture(String picture) {
//        this.picture = picture;
//    }
//
    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getActivityDescription() {
        return activityDescription;
    }

    public void setActivityDescription(String activityDescription) {
        this.activityDescription = activityDescription;
    }

    public String getBodyPartsTargeted() {
        return bodyPartsTargeted;
    }

    public void setBodyPartsTargeted(String bodyPartsTargeted) {
        this.bodyPartsTargeted = bodyPartsTargeted;
    }

    public int getActivitySets() {
        return activitySets;
    }

    public void setActivitySets(int activitySets) {
        this.activitySets = activitySets;
    }

    public int getActivityReps() {
        return activityReps;
    }

    public void setActivityReps(int activityReps) {
        this.activityReps = activityReps;
    }

    public String getEquiptmentNeeded() {
        return equiptmentNeeded;
    }

    public void setEquiptmentNeeded(String equiptmentNeeded) {
        this.equiptmentNeeded = equiptmentNeeded;
    }

    public int getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(int totalDuration) {
        this.totalDuration = totalDuration;
    }
}
