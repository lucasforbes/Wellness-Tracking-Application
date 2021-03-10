package com.wellnessapp.demo.Exersize;

public class SingleExersize {
    String title;
    String picture;
    String videoLink;
    String description;
    String[] bodyPartsTargeted;
    int totalDuration;
    String[] equiptmentNecessary;
    int reps;
    int sets;
    public SingleExersize(String title, String picture, String videoLink, String description, String[] bodyPartsTargeted, int totalDuration, String[] equiptmentNecessary, int reps, int sets) {
        this.title = title;
        this.picture = picture;
        this.videoLink = videoLink;
        this.description = description;
        this.bodyPartsTargeted = bodyPartsTargeted;
        this.totalDuration = totalDuration;
        this.equiptmentNecessary = equiptmentNecessary;
        this.reps = reps;
        this.sets = sets;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getBodyPartsTargeted() {
        return bodyPartsTargeted;
    }

    public void setBodyPartsTargeted(String[] bodyPartsTargeted) {
        this.bodyPartsTargeted = bodyPartsTargeted;
    }

    public int getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(int totalDuration) {
        this.totalDuration = totalDuration;
    }

    public String[] getEquiptmentNecessary() {
        return equiptmentNecessary;
    }

    public void setEquiptmentNecessary(String[] equiptmentNecessary) {
        this.equiptmentNecessary = equiptmentNecessary;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }
}
