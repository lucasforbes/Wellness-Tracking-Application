package com.wellnessapp.demo.Article;

import com.google.gson.Gson;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.WordCount;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RestController;


import java.util.Date;
import java.util.List;

@RestController
@Document(collection = "Articles")
public class Article {

    @Id
    private int id;

    private String title;
    private String subTitle;
    private String summary;
    private List<String> keywords;
    private List<User> writer;
    private Date updateTime;   //the time that article was published
    private String content;

    private List<Image> images; // the images an article may use
    private List<String> exersizePart;  //which part of body will be trained
    private List<String> fields;   //Aerobic, Anaerobic
    private Long wordCount;

    public Article(){
        this.updateTime = new Date();
    }

    public Article(String title, String subTitle, String summary, List<String> keywords, List<User> writer, String content, List<String> exersizePart, List<String> fields) {
        this.title = title;
        this.subTitle = subTitle;
        this.summary = summary;
        this.keywords = keywords;
        this.writer = writer;
        this.updateTime = new Date();
        this.content = content;
        this.exersizePart = exersizePart;
        this.fields = fields;
        this.wordCount = WordCount.count(this.content);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }


    public List<User> getWriter() {
        return writer;
    }

    public void setWriter(List<User> writer) {
        this.writer = writer;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<String> getExersizePart() {
        return exersizePart;
    }

    public void setExersizePart(List<String> exersizePart) {
        this.exersizePart = exersizePart;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }

    public Long getWordCount() {
        return wordCount;
    }



    @Override
    public String toString() {
        return "Article{" +
                "title='" + title + '\'' +
                ", subTitle='" + subTitle + '\'' +
                ", summary='" + summary + '\'' +
                ", keywords=" + keywords +
                ", writer=" + writer +
                ", updateTime=" + updateTime +
                ", content='" + content + '\'' +
                ", exersizePart=" + exersizePart +
                ", fields=" + fields +
                ", wordCount=" + wordCount +
                '}';
    }

    public String toJson(){
        return new Gson().toJson(this);
    }


}
