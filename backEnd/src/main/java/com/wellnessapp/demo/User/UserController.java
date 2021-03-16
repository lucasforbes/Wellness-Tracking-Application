package com.wellnessapp.demo.User;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.Date;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.spi.LocaleServiceProvider;

@RestController
@Document("Images")
public class UserController {
    @Autowired
    private UserRepository udb;
    @Autowired
    private ImageRepository idb;

    @PostMapping("/addUser")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public User saveUser(@RequestParam("photo") MultipartFile photo, @RequestPart("user") String adUser) throws JsonProcessingException {
        int count = udb.findAll().size();
        User user = new ObjectMapper().readValue(adUser, User.class);
        System.out.println(user.getBirthday());
        user.setId(count);
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(user.getBirthday(), currentDate);
        user.setAge(a.getYears());
        user.setSignUpTime(new Date());
        user.setUserType("User");
        System.out.println(user.getAge());
        System.out.println("Trying to add new User");
        System.out.println("");
        try{
            MultipartFile file = photo;
            int count2 = idb.findAll().size();
            Image image = new Image();
            image.setId(count2);
            image.setName(file.getOriginalFilename());
            image.setUserEmail(user.getEmail());
            image.setOtherDbId(user.getId());
            image.setBelongsTo(0);
            image.setUpdateDate(new Date());
            image.setContent(new Binary(file.getBytes()));
            image.setContentType(file.getContentType());
            image.setSize(file.getSize());
            Image savedFile = idb.save(image);
            String url = "https://bloom-wellness-back.herokuapp.com/file/image/" + savedFile.getId();
            user.setProfilePic(url);
        }catch (IOException e){
            e.printStackTrace();
        }
        udb.save(user);
        return user;
    }
    @GetMapping("/findAllUsers")
    public List<User> getUsers(){
        System.out.println("Got users");
        return this.udb.findAll();
    }
    @GetMapping("/findUser/{id}")
    public Optional<User> getUsers(@PathVariable int id){
        System.out.println("Trying to get user with id: " + id);
        return this.udb.findById(id);
    }

    @GetMapping("/findUserByUsername/{email}")
    public User getUsers(@PathVariable String email){
        System.out.println("username: " + email);
        return this.udb.findByEmail(email);
    }
//    @GetMapping(value = "/findUserPic/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
//    public byte[] getImage(@PathVariable int id){
//        Image file = idb.findByOtherDbId(id);
//        byte[] data = null;
//        if(file != null){
//            data = file.getContent().getData();
//            System.out.println(data.toString()+"55555555555555555555555");
//            //  return new UnifiedReturnValue(true, 200, "file download", data.toString(), "image", new Date()).unifiedReturnValue();
//        }
//        System.out.println("no file found");
//        //return new UnifiedReturnValue(false,404, "file download", "failed", "image", new Date()).unifiedReturnValue();
//        return data;
//    }
    @GetMapping(value = "/findUserPic/{email}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
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
}
