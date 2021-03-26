package com.wellnessapp.demo.Exersize;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
public class ExersizeController {
    @Autowired
    private ExersizeRepository edb;
    @Autowired
    private ImageRepository idb;
    @Autowired
    private UserRepository udb;
    @Autowired
    private CreatorRepository cdb;


    @PostMapping("/addExersize")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Exersize saveExersize(@RequestParam("photo") MultipartFile photo,@RequestPart("exersize") String exersize) throws JsonProcessingException {
        System.out.println("");
        int id = edb.findAll().size();
        Exersize exersize1 = new ObjectMapper().readValue(exersize, Exersize.class);
        exersize1.id = (id + 1);
        try{
            MultipartFile file = photo;
            int count2 = idb.findAll().size();
            Image image = new Image();
            image.setId(count2);
            image.setName(file.getOriginalFilename());
            image.setUserEmail(exersize1.getEmail());
            image.setOtherDbId(exersize1.getId());
            image.setBelongsTo(2);
            image.setUpdateDate(new Date());
            image.setContent(new Binary(file.getBytes()));
            image.setContentType(file.getContentType());
            image.setSize(file.getSize());
            Image savedFile = idb.save(image);
            String url = "https://bloom-wellness-back.herokuapp.com/file/image/" + savedFile.getId();
            exersize1.setPicture(url);
        }catch (IOException e){
            e.printStackTrace();
        }
        edb.save(exersize1);
        return exersize1;
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

    @GetMapping("/findAllExersizes")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Exersize> findAllExersizes(){
        System.out.println("Got All Exersizes");
        return this.edb.findAll();
    }

    @GetMapping("/findExersizeByCreatorEmail/{email}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Exersize> findByCreatorEmail(@PathVariable String email){
        List<Exersize> allCreatorWorkouts = this.edb.findByEmail(email);
        return allCreatorWorkouts;
    }

//    @GetMapping("/subscribeUserToExersize/{exersizeId, userId}")
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    public String setUserExersizeSubscription(@PathVariable int exersizeId, @PathVariable int userId){
//        Exersize exersize = edb.findById(exersizeId);
//        Creator owner = cdb.findByEmail(exersize.email);
//        List<Integer> userIdList = owner.getUserIdsToExersizesSubscribed();
//        userIdList.add(userId);
//        List subscribers = exersize.getUserIdsToExersizesSubscribed();
//        subscribers.add(userId);
//        String retState = "Added user to Exersize subscriber list";
//        return retState;
//    }

    @GetMapping("/getUserExersizes/{email}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Exersize> getUserExersizes(@PathVariable String email){
        User user = udb.findByEmail(email);
        List<Integer> exersizeIds = user.getExersizesSubscribed();
        List<Exersize> allExersizes = new List<Exersize>() {
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
            public Iterator<Exersize> iterator() {
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
            public boolean add(Exersize exersize) {
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
            public boolean addAll(Collection<? extends Exersize> c) {
                return false;
            }

            @Override
            public boolean addAll(int index, Collection<? extends Exersize> c) {
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
            public Exersize get(int index) {
                return null;
            }

            @Override
            public Exersize set(int index, Exersize element) {
                return null;
            }

            @Override
            public void add(int index, Exersize element) {

            }

            @Override
            public Exersize remove(int index) {
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
            public ListIterator<Exersize> listIterator() {
                return null;
            }

            @Override
            public ListIterator<Exersize> listIterator(int index) {
                return null;
            }

            @Override
            public List<Exersize> subList(int fromIndex, int toIndex) {
                return null;
            }
        };
        for(int i: exersizeIds){

            Exersize exersize = edb.findById(i);
            allExersizes.add(exersize);
        }
        return allExersizes;
    }



    @GetMapping(value = "/findExersizePic/{exersizeId}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @GetMapping("/findExersizeByUserID/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Exersize getUsers(@PathVariable int id){
        return this.edb.findById(id);

    }
}
