package com.wellnessapp.demo.ExersizeInfo;

/**
 * This class mainly stores the temperate data that is used to return to the front end with the top 2 sports one did for all the time
 */
public class Priority {
    private String first;
    private int firstTime;
    private String second;
    private int secondTime;

    public Priority() {
    }

    public Priority(String first, String second, int firstTime, int secondTime) {
        this.first = first;
        this.second = second;
        this.firstTime = firstTime;
        this.secondTime = secondTime;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getSecond() {
        return second;

    }

    public void setSecond(String second) {
        this.second = second;
    }

    public int getFirstTime() {
        return firstTime;
    }

    public void setFirstTime(int firstTime) {
        this.firstTime = firstTime;
    }

    public int getSecondTime() {
        return secondTime;
    }

    public void setSecondTime(int secondTime) {
        this.secondTime = secondTime;
    }

    @Override
    public String toString() {
        return "Priority{" +
                "first='" + first + '\'' +
                ", second='" + second + '\'' +
                ", firstTime=" + firstTime +
                ", secondTime=" + secondTime +
                '}';
    }
}
