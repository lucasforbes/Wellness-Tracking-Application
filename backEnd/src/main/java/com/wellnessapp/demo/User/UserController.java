package com.wellnessapp.demo.User;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wellnessapp.demo.tools.Encrypt;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@Document("Images")
public class UserController {
    @Autowired
    private UserRepository udb;
    @Autowired
    private ImageRepository idb;
//,  @RequestParam("email") String email,

    @PostMapping("/addUserDetails")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public User addUserDetails(@RequestParam("photo") MultipartFile photo, @RequestParam("email") String email, @RequestPart("userDetails") UserDetails ud) throws JsonProcessingException {
        String e = email.replace("\"", "");
        User del = udb.findByEmail(e);
        User user = udb.findByEmail(e);
        System.out.println("user: " + e);
        user.setFirstName(ud.getFirstName());
        user.setLastName(ud.getLastName());
        user.setBirthday(ud.getBirthday());
        user.setGender(ud.getGender());
        user.setAge(ud.getAge());
        user.setPhoneNumber(ud.getPhoneNumber());
        try {
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
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        udb.delete(del);
        udb.save(user);
        return user;
    }

    @PostMapping("/addUser")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User saveUser(@RequestBody User user) {
        System.out.println("trying to add user");
        int count = udb.findAll().size();
        user.setId(count);
        user.setPassword(Encrypt.md5Encrypt(user.getPassword()));
        user.setUserType("User");
        user.setDeleted(false);
        user.setOnline(true);
        user.setFirstName("firstName");
        user.setLastName("lastName");
        System.out.println("added user info");
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        user.setSignUpTime(currentDate);
        user.setDietsSubscribed(new ArrayList<>());
        user.setExersizesSubscribed(new ArrayList<>());
        user.setPaidCreatorsSubscribed(new ArrayList<>());
//        add 16 char token to database
        user.setToken();
        udb.save(user);
        return user;
    }

    @GetMapping("/findAllUsers")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<User> getUsers() {
        System.out.println("Got users");
        return this.udb.findAll();
    }

    @GetMapping("/findUser/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional<User> getUsers(@PathVariable int id) {
        System.out.println("Trying to get user with id: " + id);
        return this.udb.findById(id);
    }
//    @GetMapping("/subscribeDiet/{email, dietId}")
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    public String setSubscribedDiets(@PathVariable String email, @PathVariable int id){
//        User subscriber = udb.findByEmail(email);
//        List<Integer> subscriberDietlist = subscriber.getDietsSubscribed();
//        subscriberDietlist.add(id);
//        String retState = "Added diet to diets subscribed to user";
//        return retState;
//    }
//    @GetMapping("/subscribeExersize/{email, dietId}")
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    public String setSubscribedExersizes(@PathVariable String email, @PathVariable int id){
//        User subscriber = udb.findByEmail(email);
//        List<Integer> subscriberExersizeList = subscriber.getExersizesSubscribed();
//        subscriberExersizeList.add(id);
//        String retState = "Added exersize to exersizes subscribed to user";
//        return retState;
//    }

    @GetMapping("/findUserByEmail/{email}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User getUsers(@PathVariable String email) {
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
    @CrossOrigin(origins = "*", allowedHeaders = "*")
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

    public List<User> getUsersByName(String name) {
        return this.udb.findByFirstNameOrLastName(name, name);
    }
}
