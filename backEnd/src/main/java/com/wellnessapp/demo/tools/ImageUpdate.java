package com.wellnessapp.demo.tools;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
@RestController
public class ImageUpdate {


    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("file/uploadImage")
    @ResponseBody
    public String updateImage(@RequestParam(value = "image") MultipartFile file) {
        if (file.isEmpty()) {
            return new UnifiedReturnValue(false, 404, "image upload", "no image selected", "updateImage", new Date()).unifiedReturnValue();
        }
        try {
            Image image = new Image();
            image.setName(file.getOriginalFilename());
            image.setUpdateDate(new Date());
            image.setContent(new Binary(file.getBytes()));
            image.setContentType(file.getContentType());
            image.setSize(file.getSize());

            Image savedFile = mongoTemplate.save(image);
            String url = "https://bloom-wellness-back.herokuapp.com/file/image/" + savedFile.getId();

            return new UnifiedReturnValue(true, 200, "image upload", url, "updateImage", new Date()).unifiedReturnValue();
        } catch (IOException e) {
            e.printStackTrace();
            return new UnifiedReturnValue(false, 404, "image upload", "no image selected", "updateImage", new Date()).unifiedReturnValue();
        }
    }

}
