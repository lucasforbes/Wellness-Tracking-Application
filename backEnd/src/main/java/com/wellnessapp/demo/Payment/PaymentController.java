package com.wellnessapp.demo.Payment;

import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.Creator.CreatorRepository;
import com.wellnessapp.demo.Diet.Diet;
import com.wellnessapp.demo.Diet.DietRepository;
import com.wellnessapp.demo.Exersize.Exersize;
import com.wellnessapp.demo.Exersize.ExersizeRepository;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.data.mongodb.core.MongoActionOperation;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PaymentController {
    @Autowired
    private UserRepository udb;
    @Autowired
    private CreatorRepository cdb;
    @Autowired
    private ExersizeRepository edb;
    @Autowired
    private DietRepository ddb;

//    Change to JSON


    @PostMapping("/makePayment")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String makePayment(@RequestBody PaymentStruct paymentStruct){
        String userEmail = paymentStruct.getUserEmail();
        String obj = paymentStruct.getObj();
        Payment payment = paymentStruct.getPayment();
        ObjectId id = new ObjectId(obj);
        List<Object> jawns = new ArrayList<>();
        try{
            System.out.println("Trying to get exersize object id");
            Exersize jawn = edb.findById(id);
            System.out.println("Got exersize id: " + jawn);
            jawns.add(jawn);
        }catch (Exception e){
            System.out.println("Trying to get Diet object id");
            Diet jawn = ddb.findById(id);
            jawns.add(jawn);
        }
        String num = payment.getCardNumber();
        String cvv = payment.getCvv();
        LocalDate date = payment.getDate();
        Clock cl = Clock.systemUTC();
        LocalDate currentDate = LocalDate.now(cl);
        for(int i=0; i < num.length(); i++) {
            Boolean flag = Character.isDigit(num.charAt(i));
            if (flag == false || num.length() != 16) {
                return "Please enter valid 16 digit credit card number";
            }
        }
        for(int i=0; i < cvv.length(); i++) {
            Boolean flag = Character.isDigit(cvv.charAt(i));
            if (flag == false || cvv.length() != 3) {
                return "Please enter valid 3 digit cvv";
            }
        }
        if (date.compareTo(currentDate) < 0){
            return "Card expired, try another one";
        }
        System.out.println("PAYment accepted");
//        payment was accepted so first add the user to creatorSubscirptions and vice versA
        User user = udb.findByEmail(userEmail);
        udb.delete(user);
        System.out.println("User info: " + user);
        Creator creator;
        List<String> contentSubscription;
        try{
            Exersize exersize = (Exersize) jawns.get(0);
            System.out.println("E1");
//            edb.delete(exersize);
            System.out.println("E2");
            creator = cdb.findByEmail(exersize.getEmail());
            System.out.println("Creator info: " + creator);
//            save in edb
            exersize.getUserIdsToExersizesSubscribed().add(user.getEmail());
            System.out.println("E3");
            edb.save(exersize);
            System.out.println("saved exersize");
//          save in udb - some users don't have this list so ignore:
//            List exersizesSubscribed = user.getExersizesSubscribed();
//            exersizesSubscribed.add(exersize.getId());
//            System.out.println("Exersize id added to list: " + exersize.getId());
//            udb.save(user);
//            System.out.println("Saved in user");
//            save in cdb -
            creator.getUserIdsToExersizesSubscribed().add(user.getEmail());
            cdb.save(creator);
            System.out.println("E4");
        }catch (Exception e){
            System.out.println("D1");
            Diet diet = (Diet) jawns.get(0);
//            ddb.delete(diet);
            System.out.println("D2");
            creator = cdb.findByEmail(diet.getEmail());
//            save in ddb
            contentSubscription = diet.getUserIdsToDietsSubscribed();
            contentSubscription.add(user.getEmail());
            ddb.save(diet);
            System.out.println("D3");
////            save in udb - not all users have this list
//            user.getDietsSubscribed().add(diet.getId());
//            udb.save(user);
//            save in cdb
            creator.getUserIdsToDietsSubscribed().add(user.getEmail());
            cdb.save(creator);
            System.out.println("D4");
        }
//        save to paid subscription lists
        List<String> creatorsSubscribed = user.getPaidCreatorsSubscribed();
        if(!creatorsSubscribed.contains(creator.getEmail())){
            creatorsSubscribed.add(creator.getEmail());
        }
        List<String> usersSubscribed = creator.getPaidUsers();
        if(!usersSubscribed.contains(user.getEmail())){
            usersSubscribed.add(user.getEmail());
        }

        try{
            int balance = creator.getMoneyRecieved();
            balance = balance + 2;
            creator.setMoneyRecieved(balance);
        }catch (Exception e){
            creator.setMoneyRecieved(2);
        }
        cdb.save(creator);
        System.out.println("saved creator now to user");
        udb.save(user);
        return "Payment Processed, Subscription Added";
    }
}
