package com.wellnessapp.demo.ExersizeInfo;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Document(collection = "Statistic")
public class Statistic {

    @Id
    private Integer id;

    private String email;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;

    private int yoga = 0;
    private int cardio = 0;
    private int bodyBuilding = 0;
    private int caloriesBurned = 0;
    private int caloriesIntake = 0;
    private long totalTime = 0;

    private Boolean isInUse = true;


    public Statistic() {
    }

    public Statistic(String email, Date date, int yoga, int cardio, int bodyBuilding, int caloriesBurned, int caloriesIntake) {
        this.email = email;
        this.date = date;
        this.yoga = yoga;
        this.cardio = cardio;
        this.bodyBuilding = bodyBuilding;
        this.caloriesBurned = caloriesBurned;
        this.caloriesIntake = caloriesIntake;
        this.totalTime = yoga + cardio + bodyBuilding;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getYoga() {
        return yoga;
    }

    public void setYoga(int yoga) {
        this.yoga = yoga;
    }

    public int getCardio() {
        return cardio;
    }

    public void setCardio(int cardio) {
        this.cardio = cardio;
    }

    public int getBodyBuilding() {
        return bodyBuilding;
    }

    public void setBodyBuilding(int bodyBuilding) {
        this.bodyBuilding = bodyBuilding;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public int getCaloriesIntake() {
        return caloriesIntake;
    }

    public void setCaloriesIntake(int caloriesIntake) {
        this.caloriesIntake = caloriesIntake;
    }

    public long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(long totalTime) {
        this.totalTime = totalTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getInUse() {
        return isInUse;
    }

    public void setInUse(Boolean inUse) {
        isInUse = inUse;
    }

    @Override
    public String toString() {
        return "Statistic{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", date=" + date +
                ", yoga=" + yoga +
                ", cardio=" + cardio +
                ", bodyBuilding=" + bodyBuilding +
                ", caloriesBurned=" + caloriesBurned +
                ", caloriesIntake=" + caloriesIntake +
                ", totalTime=" + totalTime +
                '}';
    }
}
