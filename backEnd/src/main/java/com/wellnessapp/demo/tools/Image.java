package com.wellnessapp.demo.tools;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;

import java.util.Date;

public class Image {
    @Id
    private int id;
    private String name; // the name of the image
    private Date updateDate; // the time the image was updated
    private Binary content; //storage the image matrix
    private String contentType; // the type of the image
    private long size;  // the size of the image

    public Image(){

    }

    public Image(String name, Date updateDate, Binary content, String contentType, long size) {
        this.name = name;
        this.updateDate = updateDate;
        this.content = content;
        this.contentType = contentType;
        this.size = size;
    }

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

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
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
