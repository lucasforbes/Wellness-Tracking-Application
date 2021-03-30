package com.wellnessapp.demo.Chatting;

import com.google.gson.Gson;

import java.util.Date;

public class MessageFormat {

    private Date time;
    private String from;
    private String to;
    private String message;

    public MessageFormat(Date time, String from, String to, String message) {
        this.time = new Date();
        this.from = from;
        this.to = to;
        this.message = message;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "{" +
                "time=" + time +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
    public String toJson(){
        return new Gson().toJson(this);
    }
}
