package com.wellnessapp.demo.tools;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;

@RestController
@Document(collection = "Images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name; // the name of the image
    private String userEmail;
    private int otherDbId;
    private Date updateDate; // the time the image was updated
    // belongsTo: 0-user profile pic, 1-creator profile pic, 2-creator exersize, 3-creator diet, 4-creator
    private int belongsTo;
    private Binary content; //storage the image matrix
    private String contentType; // the type of the image
    private long size;  // the size of the image

    public Image(int id, String name, String userEmail, int otherDbId, Date updateDate, int belongsTo, Binary content, String contentType, long size) {
        this.id = id;
        this.name = name;
        this.userEmail = userEmail;
        this.otherDbId = otherDbId;
        this.updateDate = updateDate;
        this.belongsTo = belongsTo;
        this.content = content;
        this.contentType = contentType;
        this.size = size;
    }
    public Image(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public int getOtherDbId() {
        return otherDbId;
    }

    public void setOtherDbId(int otherDbId) {
        this.otherDbId = otherDbId;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public int getBelongsTo() {
        return belongsTo;
    }

    public void setBelongsTo(int belongsTo) {
        this.belongsTo = belongsTo;
    }

    public Binary getContent() {
        return content;
    }

    public void setContent(Binary content) {
        this.content = content;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
