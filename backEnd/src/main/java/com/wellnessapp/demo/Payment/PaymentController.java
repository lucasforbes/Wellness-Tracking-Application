package com.wellnessapp.demo.Payment;

import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.Creator.CreatorRepository;
import com.wellnessapp.demo.Diet.Diet;
import com.wellnessapp.demo.Diet.DietRepository;
import com.wellnessapp.demo.Exersize.Exersize;
import com.wellnessapp.demo.Exersize.ExersizeRepository;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.Clock;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @ResponseBody
    public String makePayment(@RequestParam String userEmail, @RequestParam String obj, @RequestParam Payment payment){
        ObjectId id = new ObjectId(obj);
        List<Object> jawns = new ArrayList<>();
        try{
            Exersize jawn = edb.findById(id);
            jawns.add(jawn);
        }catch (Exception e){
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
            if (flag == false) {
                return "Please enter valid 16 digit credit card number";
            }
        }
        for(int i=0; i < cvv.length(); i++) {
            Boolean flag = Character.isDigit(cvv.charAt(i));
            if (flag == false) {
                return "Please enter valid 3 digit cvv";
            }
        }
        if (date.compareTo(currentDate) < 0){
            return "Card expired, try another one";
        }
//        payment was accepted so first add the user to creatorSubscirptions and vice versA
        User user = udb.findByEmail(userEmail);
        Creator creator;
        List<String> contentSubscription;
        try{
            Exersize exersize = (Exersize) jawns.get(0);
            creator = cdb.findByEmail(exersize.getEmail());
            //        perform the normal opperations to subscription lists
            contentSubscription = exersize.getUserIdsToExersizesSubscribed();
            contentSubscription.add(user.getEmail());
            user.getExersizesSubscribed().add(exersize.getId());
            creator.getUserIdsToExersizesSubscribed().add(user.getId());
        }catch (Exception e){
            Diet diet = (Diet) jawns.get(0);
            creator = cdb.findByEmail(diet.getEmail());
            contentSubscription = diet.getUserIdsToDietsSubscribed();
            contentSubscription.add(user.getEmail());
            user.getDietsSubscribed().add(diet.getId());
            creator.getUserIdsToDietsSubscribed().add(user.getId());
        }
        List<Integer> creatorsSubscribed = user.getPaidCreatorsSubscribed();
        creatorsSubscribed.add(creator.getId());
        List<Integer> usersSubscribed = creator.getPaidUsers();
        usersSubscribed.add(user.getId());
        return "Payment Processed, Subscription Added";
    }
}
