package com.wellnessapp.demo.ExersizeInfo;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Objects;

@Document(collection = "BodyInfo")
public class BodyInfo {

    private String email;
    private Date time;
    private Double height;
    private Double weight;
    private Double BMI;


    public BodyInfo() {}

    public BodyInfo(String email, Date time, Double weight) {
        this.email = email;
        this.time = time;
        this.weight = weight;
    }

    public BodyInfo(String email, Date time, Double height, Double weight) {
        this.email = email;
        this.time = time;
        this.height = height;
        this.weight = weight;
        if(this.height.intValue() == 0){
            this.BMI = 0.0;
        }else {
            this.BMI = (weight) / Math.pow(height, 2);
        }
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getBMI() {
        return BMI;
    }

    public void setBMI(Double BMI) {
        this.BMI = BMI;
    }

    @Override
    public String toString() {
        return "BodyInfo{" +
                "email='" + email + '\'' +
                ", time=" + time +
                ", height=" + height +
                ", weight=" + weight +
                ", BMI=" + BMI +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BodyInfo)) return false;
        BodyInfo weight = (BodyInfo) o;
        return getEmail().equals(weight.getEmail()) && getTime().equals(weight.getTime());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getTime());
    }
}
