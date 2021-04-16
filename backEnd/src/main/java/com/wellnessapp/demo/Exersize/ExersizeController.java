package com.wellnessapp.demo.Exersize;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wellnessapp.demo.Admin.Admin;
import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.Creator.CreatorRepository;
import com.wellnessapp.demo.Diet.Diet;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.Image;
import com.wellnessapp.demo.tools.ImageRepository;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
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

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/addExersize")
    @ResponseBody
    public Exersize saveExersize(@RequestParam("photo") MultipartFile photo, @RequestPart("exersize") Exersize exersize) throws JsonProcessingException {
        System.out.println("");
        int id = edb.findAll().size();
//        exersize.id = (id + 1);
        try{
            MultipartFile file = photo;
            int count2 = idb.findAll().size();
            Image image = new Image();
            image.setId(count2);
            image.setName(file.getOriginalFilename());
            image.setUserEmail(exersize.getEmail());
//            image.setOtherDbId(exersize.getId());
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
    @GetMapping("/subscribeUserToExersize/{exersizeId, userEmail}")
    public String setUserExersizeSubscription(@PathVariable int exersizeId, @PathVariable String userEmail){
        Exersize exersize = edb.findById(exersizeId);
        Creator creator = cdb.findByEmail(exersize.getEmail());
        User user = udb.findByEmail(userEmail);
        int userId = user.getId();
//        add exersize to userExersize subscription list
        List exersizeSubscriptions = user.getExersizesSubscribed();
        exersizeSubscriptions.add(exersizeId);
//        add userID to single exersize subscription list
        List subscribers = exersize.getUserIdsToExersizesSubscribed();
        subscribers.add(userId);
//        add userId to all subscribers of a creator
        List creatorSubscribeList = creator.getUserIdsToExersizesSubscribed();
        creatorSubscribeList.add(userId);
        String retState = "Added user to Exersize subscriber list";
        return retState;
    }
    @GetMapping("/unsubscribeUserToExersize/{exersizeId, userEmail}")
    public String unsetUserExersizeSubscription(@RequestParam String exersizeId, @RequestParam String userEmail){
        ObjectId id = new ObjectId(exersizeId);
        Exersize exersize = edb.findById(id);
        Creator creator = cdb.findByEmail(exersize.getEmail());
        User user = udb.findByEmail(userEmail);
        int userId = user.getId();
        List exersizeSubscriptions = user.getExersizesSubscribed();
        exersizeSubscriptions.remove(exersizeId);
        List subscribers = exersize.getUserIdsToExersizesSubscribed();
        subscribers.remove(userId);
        List creatorSubscribeList = creator.getUserIdsToExersizesSubscribed();
        creatorSubscribeList.remove(userId);
        String retState = "Removed user to Exersize subscriber list";
        return retState;
    }
    @GetMapping("/subscribeUserToPaidExersize/")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String setUserPaidExersizeSubscription(@RequestParam String exersizeId, @RequestParam String userEmail){
        ObjectId id = new ObjectId(exersizeId);
        Exersize exersize = edb.findById(id);
        String creatorEmail =  exersize.getEmail();
        System.out.println("did 1");
        Creator creator = cdb.findByEmail(creatorEmail);
        User user = udb.findByEmail(userEmail);
        int userId = user.getId();
        System.out.println("did 2");
//        first check if user is already subscribed to creator
        Integer creatorID = creator.getId();
        List creatorsSubscribed = user.getPaidCreatorsSubscribed();
        if(creatorsSubscribed.contains(creatorID)){
            System.out.println("did 3");
//            add subscription to lists without charging the user
            List exersizeSubscriptions = user.getExersizesSubscribed();
            exersizeSubscriptions.add(exersizeId);
            List subscribers = exersize.getUserIdsToExersizesSubscribed();
            subscribers.add(userId);
            System.out.println("did 4");
            creator.getUserIdsToExersizesSubscribed().add(user.getId());
            String retState = "Added user to Exersize subscriber list";
            return retState;
        }
        else{
//            prompt user to pay for subscription to creator
            return "Need Payment";
        }

    }
    @GetMapping("/getExersizesss/{exersizeId}")
    public Exersize getExersizesss(@PathVariable String exersizeId){
        ObjectId obj = new ObjectId("605f9c2f597547bacce7504a");
        System.out.println(obj.getClass());
        System.out.println(obj);
        return edb.findById(obj);
        }


    @GetMapping("/subscribeUserToPaidCreator/{exersizeId, userEmail}")
    public String setUserPaidExersizeSubscriptionSupport(@PathVariable int exersizeId, @PathVariable String userEmail){
//
        Exersize exersize = edb.findById(exersizeId);
        Creator creator = cdb.findByEmail(exersize.getEmail());
        User user = udb.findByEmail(userEmail);
        user.getPaidCreatorsSubscribed().remove(creator.getId());
        creator.getPaidUsers().remove(user.getId());
        return "user unsubscribed to paid creator";
    }
    @GetMapping("/unsubscribeUserFromCreator/{creatorEmail, userEmail}")
    public String unsetUserPaidExersizeSubscription(@PathVariable String creatorEmail, @PathVariable String userEmail){
        Creator creator = cdb.findByEmail(creatorEmail);
        User user = udb.findByEmail(userEmail);
        user.getPaidCreatorsSubscribed().remove(creator.getId());
        creator.getPaidUsers().remove(user.getId());
        return "user unsubscribed to paid creator";
    }
//
//    @GetMapping("/findExersizesSubscribed/{email}")
//    public List<Exersize>findExersizesSubscribed(@PathVariable String email){
//        List<Exersize> returnExersizes = new List<Exersize>() {
//            @Override
//            public int size() {
//                return 0;
//            }
//
//            @Override
//            public boolean isEmpty() {
//                return false;
//            }
//
//            @Override
//            public boolean contains(Object o) {
//                return false;
//            }
//
//            @Override
//            public Iterator<Exersize> iterator() {
//                return null;
//            }
//
//            @Override
//            public Object[] toArray() {
//                return new Object[0];
//            }
//
//            @Override
//            public <T> T[] toArray(T[] a) {
//                return null;
//            }
//
//            @Override
//            public boolean add(Exersize exersize) {
//                return false;
//            }
//
//            @Override
//            public boolean remove(Object o) {
//                return false;
//            }
//
//            @Override
//            public boolean containsAll(Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public boolean addAll(Collection<? extends Exersize> c) {
//                return false;
//            }
//
//            @Override
//            public boolean addAll(int index, Collection<? extends Exersize> c) {
//                return false;
//            }
//
//            @Override
//            public boolean removeAll(Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public boolean retainAll(Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public void clear() {
//
//            }
//
//            @Override
//            public boolean equals(Object o) {
//                return false;
//            }
//
//            @Override
//            public int hashCode() {
//                return 0;
//            }
//
//            @Override
//            public Exersize get(int index) {
//                return null;
//            }
//
//            @Override
//            public Exersize set(int index, Exersize element) {
//                return null;
//            }
//
//            @Override
//            public void add(int index, Exersize element) {
//
//            }
//
//            @Override
//            public Exersize remove(int index) {
//                return null;
//            }
//
//            @Override
//            public int indexOf(Object o) {
//                return 0;
//            }
//
//            @Override
//            public int lastIndexOf(Object o) {
//                return 0;
//            }
//
//            @Override
//            public ListIterator<Exersize> listIterator() {
//                return null;
//            }
//
//            @Override
//            public ListIterator<Exersize> listIterator(int index) {
//                return null;
//            }
//
//            @Override
//            public List<Exersize> subList(int fromIndex, int toIndex) {
//                return null;
//            }
//        };
//        User user = udb.findByEmail(email);
//        List<Integer> subscriptions = user.getExersizesSubscribed();
//        for (Integer i : subscriptions){
//            try{
//                int x = (int) i;
//                Exersize d = edb.findById(x);
//                returnExersizes.add(d);
//            }catch (Exception e){
//                e.printStackTrace();
//            }
//        }
//        return returnExersizes;
//    }

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
