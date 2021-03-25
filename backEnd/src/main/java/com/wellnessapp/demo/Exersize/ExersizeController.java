package com.wellnessapp.demo.Exersize;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellnessapp.demo.Admin.Admin;
import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
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
    @Autowired
    private UserRepository udb;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/addExersize")
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

//    @GetMapping("/findExersizeByCreatorEmail/{email, name}")
//    public Exersize findByUserID(@PathVariable String email, @PathVariable String name){
//        Exersize exersize = edb.findByEmail(email, name);
//        return exersize;
//    }

//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    @GetMapping("/findExersizeByUserID/{id, name}")
//    public Exersize findByUserID(@PathVariable int id, @PathVariable String name){
//
//        System.out.println("Got All Exersizes");
//        return this.edb.findById(id);
//    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/findAllExersizes")
    public List<Exersize> findAllExersizes(){
        System.out.println("Got All Exersizes");
        return this.edb.findAll();
    }

    @GetMapping("/findExersizeByCreatorEmail/{email}")
    public List<Exersize> findByCreatorEmail(@PathVariable String email){
        List<Exersize> allCreatorWorkouts = this.edb.findByEmail(email);
        return allCreatorWorkouts;
    }
    @GetMapping("/subscribeUserToExersize/{exersizeId, userId}")
    public String setUserExersizeSubscription(@PathVariable int exersizeId, @PathVariable int userId){
        Exersize exersize = edb.findById(exersizeId);
        List subscribers = exersize.getUserIdsToExersizesSubscribed();
        subscribers.add(userId);
        String retState = "Added user to Exersize subscriber list";
        return retState;
    }

    @GetMapping(value = "/findExersizePic/{exersizeId}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public byte[] getImage(@PathVariable int exersizeId) {
        System.out.println("adsfasdf");
        Image file = idb.findByOtherDbId(exersizeId);
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

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/findExersizeByUserID/{id}")
    public Exersize getUsers(@PathVariable int id){
        return this.edb.findById(id);

    }
}
