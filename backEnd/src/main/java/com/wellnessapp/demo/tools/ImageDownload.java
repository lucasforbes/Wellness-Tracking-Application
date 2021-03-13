package com.wellnessapp.demo.tools;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

public class ImageDownload {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping(value = "/file/image/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})//the type we want to return to the front end
    @ResponseBody
    public byte[] image(@PathVariable String id){
        byte[] data = null;
        Image file = mongoTemplate.findById(id, Image.class);
        if(file != null){
            data = file.getContent().getData();
        }
        return data;
    }

}
