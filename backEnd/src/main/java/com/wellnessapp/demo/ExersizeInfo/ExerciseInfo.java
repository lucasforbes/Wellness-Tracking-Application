package com.wellnessapp.demo.ExersizeInfo;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@Document(collection = "ExerciseInfo")
public class ExerciseInfo {

    @Id
    private int id;

    private String email;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;

    private List<WorkoutInfo> workoutInfo;
    private int caloriesIntake;
    private int caloriesBurned;
    private long duration;

    private boolean isInUse = true;

    public ExerciseInfo() {}

    public ExerciseInfo(String email, Date date, List<WorkoutInfo> workoutInfo, int caloriesIntake) {
        this.email = email;
        this.date = date;
        this.workoutInfo = workoutInfo;
        this.caloriesIntake = caloriesIntake;

        for(WorkoutInfo workoutInfo1: workoutInfo) {
            this.duration += getDatePoor(workoutInfo1.getEndTime(), workoutInfo1.getStartTime());
            this.caloriesBurned += workoutInfo1.getCaloriesBurned();
        }
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

    public List<WorkoutInfo> getWorkoutInfo() {
        return workoutInfo;
    }

    public void setWorkoutInfo(List<WorkoutInfo> workoutInfo) {
        this.workoutInfo = workoutInfo;
    }

    public int getCaloriesIntake() {
        return caloriesIntake;
    }

    public void setCaloriesIntake(int caloriesIntake) {
        this.caloriesIntake = caloriesIntake;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isInUse() {
        return isInUse;
    }

    public void setInUse(boolean inUse) {
        isInUse = inUse;
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
        return "ExerciseInfo{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", date=" + date +
                ", workoutInfo=" + workoutInfo +
                ", caloriesIntake=" + caloriesIntake +
                ", caloriesBurned=" + caloriesBurned +
                ", duration=" + duration +
                ", isInUse=" + isInUse +
                '}';
    }
}
