package com.wellnessapp.demo.Chatting;

import com.wellnessapp.demo.User.User;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.Session;
import java.util.Date;


public class ChatRoomInfo {
    private Session session;
    private User user1;
    private User user2;
    private Date roomCreateTime;
    public ChatRoomInfo(Session session, User user1, User user2){
        this.session = session;
        this.user1 = user1;
        this.user2 = user2;
        this.roomCreateTime = new Date();
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public Date getRoomCreateTime() {
        return roomCreateTime;
    }

    public void setRoomCreateTime(Date roomCreateTime) {
        this.roomCreateTime = roomCreateTime;
    }
}
