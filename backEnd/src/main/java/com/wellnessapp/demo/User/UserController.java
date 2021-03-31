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
import java.util.ArrayList;
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
//,  @RequestParam("email") String email,
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/addUserDetails")
    @ResponseBody
    public UserDetails addUserDetails(@RequestParam("photo") MultipartFile photo, @RequestParam("email") String email, @RequestPart("userDetails") UserDetails ud) throws JsonProcessingException {
        User del = udb.findByEmail(email);
        User user = udb.findByEmail(email);
//        user.setAge(ud.getAge());
//        user.setFirstName(ud.getFirstName());
//        user.setLastName(ud.getLastName());
//        user.setPhoneNumber(ud.getPhoneNumber());
//        user.setDietsSubscribed(new ArrayList<>());
//        user.setExersizesSubscribed(new ArrayList<>());
//        try{
//            MultipartFile file = photo;
//            int count2 = idb.findAll().size();
//            Image image = new Image();
//            image.setId(count2);
//            image.setName(file.getOriginalFilename());
//            image.setUserEmail(user.getEmail());
//            image.setOtherDbId(user.getId());
//            image.setBelongsTo(0);
//            image.setUpdateDate(new Date());
//            image.setContent(new Binary(file.getBytes()));
//            image.setContentType(file.getContentType());
//            image.setSize(file.getSize());
//            Image savedFile = idb.save(image);
//            String url = "https://bloom-wellness-back.herokuapp.com/file/image/" + savedFile.getId();
//            user.setProfilePic(url);
//        }catch (IOException e){
//            e.printStackTrace();
//        }
//        udb.delete(del);
//        udb.save(user);
        User ret = udb.findByEmail("bob@google.com");
        return ud;
    }
    @PostMapping("/addUser")
    public User saveUser(@RequestPart("user") String basicDetails) throws JsonProcessingException {
        int count = udb.findAll().size();
        User user = new ObjectMapper().readValue(basicDetails, User.class);
        user.setId(count);
        user.setUserType("User");
        user.setIsDeleted(false);
        user.setOnline(true);

        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        user.setSignUpTime(currentDate);
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
    @GetMapping("/subscribeDiet/{email, dietId}")
    public String setSubscribedDiets(@PathVariable String email, @PathVariable int id){
        User subscriber = udb.findByEmail(email);
        List<Integer> subscriberDietlist = subscriber.getDietsSubscribed();
        subscriberDietlist.add(id);
        String retState = "Added diet to diets subscribed to user";
        return retState;
    }
    @GetMapping("/subscribeExersize/{email, dietId}")
    public String setSubscribedExersizes(@PathVariable String email, @PathVariable int id){
        User subscriber = udb.findByEmail(email);
        List<Integer> subscriberExersizeList = subscriber.getExersizesSubscribed();
        subscriberExersizeList.add(id);
        String retState = "Added exersize to exersizes subscribed to user";
        return retState;
    }

    @GetMapping("/findUserByEmail/{email}")
    public User getUsers(@PathVariable String email){
        System.out.println("username: " + email);
        System.out.println(udb.findByEmail(email));
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
