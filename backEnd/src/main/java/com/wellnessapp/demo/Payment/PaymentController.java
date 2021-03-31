package com.wellnessapp.demo.Payment;

import com.wellnessapp.demo.Creator.CreatorRepository;
import com.wellnessapp.demo.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;
import java.time.LocalDate;

public class PaymentController {
    @Autowired
    private UserRepository udb;
    @Autowired
    private CreatorRepository cdb;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/makePayment")
    @ResponseBody
    public String makePayment(@RequestParam("userEmail") String userEmail, @RequestParam("creatorEmail") String creatorEmail, @RequestPart("card") Payment payment){
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
//        maybe add card to user, add exersize to paid subscriptions?
        return "Payment Processed";
    }
}
