package com.wellnessapp.demo.tools;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.lang3.ObjectUtils;
import org.h2.util.json.JSONObject;

import javax.print.attribute.standard.JobSheets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

public class UnifiedReturnValue {
    private Boolean state;
    private int stateCode;
    private String subject;
    private String description;
    private String functionName;
    private Date timestamp;

    public HashMap<String, Object> toJson = new HashMap<String, Object>();


    public UnifiedReturnValue(Boolean state, int stateCode, String subject, String description, String functionName, Date timestamp) {

        if (state == null) {
            this.state = false;
        } else {
            this.state = state;
        }
        if (stateCode == 0) {
            this.stateCode = 404;
        } else {
            this.stateCode = stateCode;
        }
        if (subject == null) {
            this.subject = "No Subject";
        } else {
            this.subject = subject;
        }
        if (description == null) {
            this.description = "No Description";
        } else {
            this.description = description;
        }
        if (functionName == null) {
            this.functionName = "No FunctionName";
        } else {
            this.functionName = functionName;
        }
        if (timestamp == null) {
            Date now = new Date();
            this.timestamp = now;
        } else {
            this.timestamp = timestamp;
        }


        toJson.put("state", state);
        toJson.put("stateCode", stateCode);
        toJson.put("subject", subject);
        toJson.put("description", description);
        toJson.put("functionName", functionName);
        toJson.put("date", timestamp);
    }

    public String unifiedReturnValue() {
        Gson gson = new Gson();
        return gson.toJson(toJson);

    }


}
