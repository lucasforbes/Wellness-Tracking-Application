package com.wellnessapp.demo.Chatting;


import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.UnifiedReturnValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/chat/{email}")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Component
public class ChatServiceController {

    @Autowired
    private UserRepository udb;

    Logger logger = LoggerFactory.getLogger(getClass());

    private static Map<String, ChatServiceController> onLineUsers = new ConcurrentHashMap<>();

    private static int totalNumber = 0;

    private String email;

    private Session session;


    /**
     * - while open the chat room, the code jump here automatically
     * @param session - the session to keep all the connect info
     * @return the UnifiedReturnValue, keeps necessary message.
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value = "email") String email){
        try {
            this.session = session;
            this.email = email;
            this.totalNumber++;
            onLineUsers.put(email, this);
            logger.info("User: " + email + " came. Time: " + new Date() + ". There is total " + totalNumber + " people.");

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * - while close the chatroom, then the code jump here
     * @param session - the session to be close
     * @return - UnifiedReturnValue
     */
    @OnClose
    public void onClose(Session session){
        try{
            this.totalNumber--;
            onLineUsers.remove(this.email);
            logger.info(session.getId() + " disconnected, " + "there are " + totalNumber + " users chatting");
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    /**
     * - send message to the session
     * @param message
     * @param session
     * @return
     */
    @OnMessage
    public void onMessage(String message, Session session){
        try {
            Gson gson = new Gson();
            MessageFormat msg = gson.fromJson(message, MessageFormat.class);
            logger.info(msg.toString());
            sendMsg(email, msg.toJson());
            String to = msg.getTo();
            sendMsg(to, msg.toJson());
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    @OnError
    public String onError(Session session, Throwable throwable){
        throwable.printStackTrace();
        return new UnifiedReturnValue(false, 404, "unknown error", throwable.toString(), "onClose", new Date()).unifiedReturnValue();
    }
    /**
     *  - while send message to the front end
     * @param email
     * @param msg
     */
    private synchronized void sendMsg(String email, String msg) {
        try {
            for (ChatServiceController chatServiceController : onLineUsers.values()) {
                if (email.equals(chatServiceController.email)) {
                   chatServiceController.session.getBasicRemote().sendText(msg);
                }
            }
        }catch (IOException e){
            e.printStackTrace();
        }
    }






}
