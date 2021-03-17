package com.wellnessapp.demo.Exersize;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellnessapp.demo.Admin.Admin;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class ExersizeController {
    @Autowired
    private ExersizeRepository edb;
    @Autowired
    private ImageRepository idb;

    @PostMapping("/addExersize")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Exersize saveExersize(@RequestParam("photo") MultipartFile photo, @RequestPart("exersize") Exersize exersize) throws JsonProcessingException {
        System.out.println("");
        int id = edb.findAll().size();
        exersize.id = (id + 1);
        try{
            MultipartFile file = photo;
            int count2 = idb.findAll().size();
            Image image = new Image();
            image.setId(count2);
            image.setName(file.getOriginalFilename());
            image.setUserEmail(exersize.getEmail());
            image.setOtherDbId(exersize.getId());
            image.setBelongsTo(2);
            image.setUpdateDate(new Date());
            image.setContent(new Binary(file.getBytes()));
            image.setContentType(file.getContentType());
            image.setSize(file.getSize());
            Image savedFile = idb.save(image);
            String url = "https://bloom-wellness-back.herokuapp.com/file/image/" + savedFile.getId();
            exersize.setPicture(url);
        }catch (IOException e){
            e.printStackTrace();
        }
        edb.save(exersize);
        return exersize;
    }
    @GetMapping("/findExersizeByCreatorEmail/{email, name}")
    public Exersize findByUserID(@PathVariable String email, @PathVariable String name){
        System.out.println("Got All Exersizes");
        return this.edb.findByEmail(email, name);
    }
    @GetMapping("/findAllExersizes")
    public List<Exersize> findAllExersizes(){
        System.out.println("Got All Exersizes");
        return this.edb.findAll();
    }
    @GetMapping("/findExersizeByCreatorEmail/{email}")
    public List<Exersize> findByCreatorEmail(@PathVariable String email){
        return this.edb.findByEmail(email);
    }

    @GetMapping(value = "/findExersizePic/{email}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] getImage(@PathVariable String email) {
        Image file = idb.findByUserEmail(email);
        byte[] data = null;
        if (file != null) {
            data = file.getContent().getData();
            System.out.println(data.toString() + "55555555555555555555555");
            //  return new UnifiedReturnValue(true, 200, "file download", data.toString(), "image", new Date()).unifiedReturnValue();
        }
        System.out.println("no file found");
        //return new UnifiedReturnValue(false,404, "file download", "failed", "image", new Date()).unifiedReturnValue();
        return data;
    }
    @GetMapping(value = "/findExersizePic/{email, id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] getImage(@PathVariable String email, @PathVariable int id) {
        Image file = idb.findByUserEmail(email, id);
        byte[] data = null;
        if (file != null) {
            data = file.getContent().getData();
            System.out.println(data.toString() + "55555555555555555555555");
            //  return new UnifiedReturnValue(true, 200, "file download", data.toString(), "image", new Date()).unifiedReturnValue();
        }
        System.out.println("no file found");
        //return new UnifiedReturnValue(false,404, "file download", "failed", "image", new Date()).unifiedReturnValue();
        return data;
    }
}
