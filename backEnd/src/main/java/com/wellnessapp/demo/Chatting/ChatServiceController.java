package com.wellnessapp.demo.Chatting;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wellnessapp.demo.tools.UnifiedReturnValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/chat/{email}")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Component
public class ChatServiceController {


    private  Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * Store the session using local thread
     */
    private static ThreadLocal<Session> sessions = new ThreadLocal<Session>();
    /**
     * Store the chatting room information
     * User A to User B = User B to User A
     * String is the session id
     */
    private static Map<String, ChatServiceController> onlineClient = new ConcurrentHashMap<>();

    private String username;
    private Session session;

    /**
     * - while open the chat room, the code jump here automatically
     *
     * @param session - the session to keep all the connect info
     * @param email  - the user who raised a talk
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value = "email") String email) {
        logger.info("user " + email + " has opened the chatting room with session id " + session.getId());
        this.username = email;
        this.session = session;
        try {
            /**
             * 1. put user into the online clients map and waiting for message
             */
            onlineClient.put(email, this);

        }catch (Exception e){
            e.printStackTrace();
        }

    }

    /**
     * - while close the chatroom, then the code jump here
     */
    @OnClose
    public void onClose(){
        /**
         * remove current online user
         */
        onlineClient.remove(username);
    }

    /**
     * - send message to the session
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        try {
            logger.info("User " + username + " send a message: " + message + ". Session id is: " + session.getId());
            JSONObject jsonObject = JSON.parseObject(message);
            String textMessage = jsonObject.getString("message");
            String fromusername = jsonObject.getString("from");
            String tousername = jsonObject.getString("to");
            Map<String, Object> map = new HashMap<>();
            map.put("to", tousername);
            map.put("from", fromusername);
            map.put("message", textMessage);
            /**
             * send a massage to user
             */
            sendMsg(tousername, JSON.toJSONString(map));
            /**
             * send send myself a same one
             */
            sendMsg(username, JSON.toJSONString(map));
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    @OnError
    public String onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
        return new UnifiedReturnValue(false, 404, "unknown error", throwable.toString(), "onClose", new Date()).unifiedReturnValue();
    }

    /**
     * - while send message to the front end
     */
    private synchronized void sendMsg(String toUser, String msg) {
        try{
            for(ChatServiceController c: onlineClient.values()) {
                if (toUser.equals(c.username)) {
                    c.session.getAsyncRemote().sendText(msg);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }

    }


}
