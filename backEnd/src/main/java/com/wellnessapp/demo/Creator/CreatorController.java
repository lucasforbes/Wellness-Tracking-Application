package com.wellnessapp.demo.Creator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.ImageRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class CreatorController {
    @Autowired
    private CreatorRepository cdb;
    @Autowired
    private ImageRepository idb;

    @PostMapping("/addCreator")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Creator saveCreator(@RequestParam("photo") MultipartFile photo, @RequestPart("creator") String adcreator) throws JsonProcessingException {
        int count = cdb.findAll().size();
        Creator user = new ObjectMapper().readValue(adcreator, Creator.class);
        System.out.println(user.getBirthday());
        user.setId(count);
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        Period a = Period.between(user.getBirthday(), currentDate);
        user.setAge(a.getYears());
        user.setSignUpTime(currentDate);
        user.setUserType("Creator");
        user.setDeleted(false);
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
        cdb.save(user);
        return user;
    }
    @GetMapping("/findAllCreators")
    public List<Creator> getCreators(){
        System.out.println("Got Creators");
        return this.cdb.findAll();
    }
    @GetMapping("/findAllCreators/{id}")
    public Optional<Creator> getCreators(@PathVariable int id){
        return this.cdb.findById(id);
    }

    @GetMapping("/addUserDietSubscription/{email, dietId}")
    public String setUserDietSubscription(@PathVariable String email, @PathVariable int id){
        Creator owner = cdb.findByEmail(email);
        List<Integer> userIdList = owner.getUserIdsToDietsSubscribed();
        userIdList.add(id);
        String retState = "Added user to Diet subscriber list";
        return retState;
    }
    @GetMapping("/addUserExersizeSubscription/{email, dietId}")
    public String setUserExerssizeSubscription(@PathVariable String email, @PathVariable int id){
        Creator owner = cdb.findByEmail(email);
        List<Integer> userIdList = owner.getUserIdsToExersizesSubscribed();
        userIdList.add(id);
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
