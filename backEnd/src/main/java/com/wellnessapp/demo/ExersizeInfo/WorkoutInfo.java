package com.wellnessapp.demo.ExersizeInfo;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;


import java.util.Date;

public class WorkoutInfo {

    private String kindOfSport; // what kind of exercise the user did
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;
    private long duration;
    private int caloriesBurned;


    public WorkoutInfo() {}

    public WorkoutInfo(Date startTime, Date endTime, String kindOfSport, int caloriesBurned) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.kindOfSport = kindOfSport;
        this.caloriesBurned = caloriesBurned;
        this.duration = getDatePoor(endTime, startTime);
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getKindOfSport() {
        return kindOfSport;
    }

    public void setKindOfSport(String kindOfSport) {
        this.kindOfSport = kindOfSport;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public static long getDatePoor(Date endDate, Date nowDate) {

        long nd = 1000 * 24 * 60 * 60;
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;

        long diff = endDate.getTime() - nowDate.getTime();

        long day = diff / nd;

        long hour = diff % nd / nh;

        long min = diff % nd % nh / nm;

        return day*24*60 + hour*60 + min;
    }

    @Override
    public String toString() {
        return "WorkoutInfo{" +
                "startTime=" + startTime +
                ", endTime=" + endTime +
                ", duration='" + duration + '\'' +
                ", kindOfSport='" + kindOfSport + '\'' +
                '}';
    }
}
