package com.wellnessapp.demo.ExersizeInfo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Objects;

@Document(collection = "Weight")
public class Weight {

    private String email;
    private Date time;
    private Double weight;


    public Weight() {}

    public Weight(String email, Date time, Double weight) {
        this.email = email;
        this.time = time;
        this.weight = weight;
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


    @Override
    public String toString() {
        return "Weight{" +
                "email='" + email + '\'' +
                ", time=" + time +
                ", weight=" + weight +
                '}';
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Weight)) return false;
        Weight weight = (Weight) o;
        return getEmail().equals(weight.getEmail()) && getTime().equals(weight.getTime());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getTime());
    }
}
