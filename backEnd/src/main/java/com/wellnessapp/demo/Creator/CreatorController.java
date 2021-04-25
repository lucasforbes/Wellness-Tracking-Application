package com.wellnessapp.demo.Creator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.tools.Encrypt;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class CreatorController {
    @Autowired
    private CreatorRepository cdb;
    @Autowired
    private ImageRepository idb;

    @PostMapping("/addCreatorDetails")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Creator addCreatorDetails(@RequestParam("photo") MultipartFile photo, @RequestParam("email") String email1, @RequestParam("creatorDetails") CreatorDetails cd) throws JsonProcessingException {
        String email = email1.replace("\"", "");
        Creator user = cdb.findByEmail(email);
        Creator c = cdb.findByEmail(email);
        user.setFirstName(cd.getFirstName());
        user.setLastName(cd.getLastName());
        user.setBirthday(cd.getBirthday());
        user.setGender(cd.getGender());
        user.setAge(cd.getAge());
        user.setPhoneNumber(cd.getPhoneNumber());

        try{
            MultipartFile file = photo;
            int count2 = idb.findAll().size();
            Image image = new Image();
            image.setId(count2);
            image.setName(file.getOriginalFilename());
            image.setUserEmail(user.getEmail());
            image.setOtherDbId(user.getId());
            image.setBelongsTo(1);
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
        cdb.delete(c);
        cdb.save(user);
        return user;
    }

    @PostMapping("/addCreator")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Creator saveCreator(@RequestBody Creator creator) {
        System.out.println("got here");
        int count = cdb.findAll().size();
        creator.setId(count);
        creator.setPassword(Encrypt.md5Encrypt(creator.getPassword()));
        creator.setUserType("Creator");
        creator.setDeleted(false);
        creator.setOnline(true);
        System.out.println("added creator info");
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        creator.setSignUpTime(currentDate);
        creator.setBirthday(currentDate);
        creator.setFirstName("firstName");
        creator.setLastName("lastName");
        creator.setGender("gender");
        creator.setNutritionist(true);
        creator.setTrainer(true);
        creator.setDeleted(false);
        creator.setPhoneNumber("");
        creator.setUserIdsToDietsSubscribed(new ArrayList<>());
        creator.setUserIdsToExersizesSubscribed(new ArrayList<>());
        creator.setPaidUsers(new ArrayList<>());
//        add 16 char token to db
        creator.setToken();
        cdb.save(creator);
        return creator;
    }
    @GetMapping("/findAllCreators")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Creator> getCreators(){
        System.out.println("Got Creators");
        return this.cdb.findAll();
    }
    @GetMapping("/findAllCreators/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Optional<Creator> getCreators(@PathVariable int id){
        return this.cdb.findById(id);
    }

    @GetMapping("/getCreatorBalance/{creatorEmail}/")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public int getCreatorBalance(@PathVariable("creatorEmail") String creatorEmail){
        Creator creator = cdb.findByEmail(creatorEmail);
        try {
            int balance = creator.getMoneyRecieved();
            System.out.println("Got Balance");
            return balance;
        }catch (Exception e){
            creator.setMoneyRecieved(0);
            System.out.println("Balance is 0");
            return 0;
        }
    }
    @PostMapping("/withdrawBalance")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public String withdrawBalance(@RequestBody WithdrawDetails wd){
        String creatorEmail = wd.getEmail();
        String accountNumber = wd.getAccountNumber();
        String routingNumber = wd.getRoutingNumber();
        Creator creator = cdb.findByEmail(creatorEmail);
        if(accountNumber.length() != 10){
            return "Please enter account number that is 10 digits";
        }
        if(routingNumber.length() != 9){
            return "Please enter routing number that is 9 digits";
        }
        try {
            int balance = creator.getMoneyRecieved();
            System.out.println("Got Balance");
            System.out.println("Balance Withdrawn");
            creator.setMoneyRecieved(0);
            cdb.save(creator);
            return "Balance Succesfully Withdrawn";
        }catch (Exception e){
            creator.setMoneyRecieved(0);
            cdb.save(creator);
            System.out.println("Balance is 0");
            return "Balance is 0, No Money to Withdraw";
        }
    }


    @GetMapping("/addUserDietSubscription/{email, dietId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String setUserDietSubscription(@PathVariable String email, @PathVariable String userEmail){
        Creator owner = cdb.findByEmail(email);
        List<String> userIdList = owner.getUserIdsToDietsSubscribed();
        userIdList.add(userEmail);
        String retState = "Added user to Diet subscriber list";
        return retState;
    }
    @GetMapping("/addUserExersizeSubscription/{email, dietId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String setUserExerssizeSubscription(@PathVariable String email, @PathVariable String userEmail){
        Creator owner = cdb.findByEmail(email);
        List<String> userIdList = owner.getUserIdsToExersizesSubscribed();
        userIdList.add(userEmail);
        String retState = "Added user to Exersize subscriber list";
        return retState;
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
    @GetMapping(value = "/findCreatorPic/{email}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
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
    @GetMapping(value = "/findUserPic/{email, id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @CrossOrigin(origins = "*", allowedHeaders = "*")
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
