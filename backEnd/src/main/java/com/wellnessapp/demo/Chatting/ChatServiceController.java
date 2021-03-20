package com.wellnessapp.demo.Chatting;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.UnifiedReturnValue;
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

@ServerEndpoint("/chat/{email1}/{email2}")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Component
public class ChatServiceController {

    @Autowired
    private UserRepository udb;

    /**
     * Store the session using local thread
     */
    private static ThreadLocal<Session> sessions = new ThreadLocal<Session>();
    /**
     * Store the chatting room information
     * User A to User B = User B to User A
     * String is the session id
     */
    private static Map<String, ChatRoomInfo> chatRelation = new ConcurrentHashMap<>();

    /**
     * - while open the chat room, the code jump here automatically
     * @param session - the session to keep all the connect info
     * @param email1 - the user who raised a talk
     * @param email2 - the user who received the talk
     * @return the UnifiedReturnValue, keeps necessary message.
     */
    @OnOpen
    public String onOpen(Session session, @PathParam(value = "email1") String email1, @PathParam(value = "email2") String email2){
        try {
            System.out.println("onOpen");
            System.out.println(email1);
            System.out.println("111111" + udb.findByEmail(email1));
            User toUser = udb.findByEmail(email2);

            User fromUser = udb.findByEmail(email1);

            if (toUser == null) {
                return new UnifiedReturnValue(false, 404, "no user found", "there is no user with email " + email2, "onOpen", new Date()).unifiedReturnValue();
            }
            /**
             * keep the current session in the sessions(a local thread pool)
             */
            sessions.set(session);
            chatRelation.put(session.getId(), new ChatRoomInfo(session, fromUser, toUser));

            return new UnifiedReturnValue(true, 200, "connect successfully with email " + email2, session.toString(), "onOpen", new Date()).unifiedReturnValue();
        }catch (Exception e){
            return new UnifiedReturnValue(false, 404, "unknown errors", e.toString(), "onOpen", new Date()).unifiedReturnValue();
        }
    }

    /**
     * - while close the chatroom, then the code jump here
     * @param session - the session to be close
     * @return - UnifiedReturnValue
     */
    @OnClose
    public String onClose(Session session){
        try{
            ChatRoomInfo chatRoomInfo = chatRelation.get(session.getId());
            if(chatRoomInfo == null){
                return new UnifiedReturnValue(false, 404, "no chatting room found", "session info: "+session.toString(), "onClose", new Date()).unifiedReturnValue();
            }
            chatRelation.remove(session.getId());
            return new UnifiedReturnValue(true, 200, "remove room successfully", "session info: "+session.toString(), "onClose", new Date()).unifiedReturnValue();

        }catch (Exception e){
            return new UnifiedReturnValue(false, 404, "unknown error", e.toString(), "onClose", new Date()).unifiedReturnValue();
        }

    }

    /**
     * - send message to the session
     * @param message
     * @param session
     * @return
     */
    @OnMessage
    public String onMessage(String message, Session session){
        try {
            System.out.println("onMessage");
            Map<String, String> result = new HashMap<>();
            result.put("sessionID", session.getId());

            result.put("user1", chatRelation.get(session.getId()).getUser1().toString());

            result.put("user2", chatRelation.get(session.getId()).getUser2().toString());

            result.put("time", new Date().toString());

            result.put("msg", message);

            sendMsg(session, result.toString());

            return new UnifiedReturnValue(true, 200, "message sent successfully", message, "onMessage", new Date()).unifiedReturnValue();
        }catch (Exception e){
            return new UnifiedReturnValue(false, 404, "unknown error", e.toString(), "onClose", new Date()).unifiedReturnValue();
        }
    }


    @OnError
    public String onError(Session session, Throwable throwable){
        throwable.printStackTrace();
        return new UnifiedReturnValue(false, 404, "unknown error", throwable.toString(), "onClose", new Date()).unifiedReturnValue();
    }
    /**
     *  - while send message to the front end
     * @param session
     * @param msg
     */
    private synchronized void sendMsg(Session session, String msg) {
        try {
            session.getBasicRemote().sendText(msg);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }






}
