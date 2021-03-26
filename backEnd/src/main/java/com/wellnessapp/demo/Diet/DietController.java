package com.wellnessapp.demo.Diet;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.Creator.CreatorRepository;
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
import java.util.*;

@RestController
public class DietController {
    @Autowired
    private DietRepository ddb;
    @Autowired
    private ImageRepository idb;
    @Autowired
    private UserRepository udb;
    @Autowired
    private CreatorRepository cdb;

    @PostMapping("/addDiet")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Diet saveExersize(@RequestParam("photo") MultipartFile photo, @RequestPart("diet") Diet diet) throws JsonProcessingException {
        System.out.println("");
        int id = ddb.findAll().size();
        diet.id = (id + 1);
        try{
            MultipartFile file = photo;
            int count2 = idb.findAll().size();
            Image image = new Image();
            image.setId(count2);
            image.setName(file.getOriginalFilename());
            image.setUserEmail(diet.getEmail());
            image.setOtherDbId(diet.getId());
            image.setBelongsTo(3);
            image.setUpdateDate(new Date());
            image.setContent(new Binary(file.getBytes()));
            image.setContentType(file.getContentType());
            image.setSize(file.getSize());
            Image savedFile = idb.save(image);
            String url = "https://bloom-wellness-back.herokuapp.com/file/image/" + savedFile.getId();
            diet.setPicture(url);
        }catch (IOException e){
            e.printStackTrace();
        }
        ddb.save(diet);
        return diet;
    }
    @GetMapping("/findDietByEmail/{email, name}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Diet findByEmail(@PathVariable String email, @PathVariable String name){
        System.out.println("Got All Exersizes");
        return this.ddb.findByEmail(email, name);
    }
    @GetMapping("/findAllDiets")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Diet> findAllDiets(){
        System.out.println("Got All Diets");
        return this.ddb.findAll();
    }
    @GetMapping("/findDietByEmail/{email}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Diet> getByUserID(@PathVariable String email){
        return this.ddb.findByEmail(email);
    }

    @GetMapping(value = "/findDietePic/{email}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
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
    @GetMapping("/subscribeUserToDiet/{dietId, userId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String setUserDietSubscription(@PathVariable int dietId, @PathVariable int userId){
        Diet diet = ddb.findById(dietId);
        Creator owner = cdb.findByEmail(diet.email);
        List<Integer> userIdList = owner.getUserIdsToExersizesSubscribed();
        userIdList.add(userId);
        List subscribers = diet.getUserIdsToExersizesSubscribed();
        subscribers.add(userId);
        String retState = "Added user to Diet subscriber list";
        return retState;
    }
    @GetMapping("/getUserDiets/{email}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Diet> getUserDiets(@PathVariable String email){
        User user = udb.findByEmail(email);
        List<Integer> dietIds = user.getDietsSubscribed();
        List<Diet> allDiets = new List<Diet>() {
            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean contains(Object o) {
                return false;
            }

            @Override
            public Iterator<Diet> iterator() {
                return null;
            }

            @Override
            public Object[] toArray() {
                return new Object[0];
            }

            @Override
            public <T> T[] toArray(T[] a) {
                return null;
            }

            @Override
            public boolean add(Diet diet) {
                return false;
            }

            @Override
            public boolean remove(Object o) {
                return false;
            }

            @Override
            public boolean containsAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean addAll(Collection<? extends Diet> c) {
                return false;
            }

            @Override
            public boolean addAll(int index, Collection<? extends Diet> c) {
                return false;
            }

            @Override
            public boolean removeAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean retainAll(Collection<?> c) {
                return false;
            }

            @Override
            public void clear() {

            }

            @Override
            public Diet get(int index) {
                return null;
            }

            @Override
            public Diet set(int index, Diet element) {
                return null;
            }

            @Override
            public void add(int index, Diet element) {

            }

            @Override
            public Diet remove(int index) {
                return null;
            }

            @Override
            public int indexOf(Object o) {
                return 0;
            }

            @Override
            public int lastIndexOf(Object o) {
                return 0;
            }

            @Override
            public ListIterator<Diet> listIterator() {
                return null;
            }

            @Override
            public ListIterator<Diet> listIterator(int index) {
                return null;
            }

            @Override
            public List<Diet> subList(int fromIndex, int toIndex) {
                return null;
            }
        };
        for(int i: dietIds){
            Diet diet = ddb.findById(i);
            allDiets.add(diet);
        }
        return allDiets;
    }
    @GetMapping(value = "/findDietPic/{email, id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
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
