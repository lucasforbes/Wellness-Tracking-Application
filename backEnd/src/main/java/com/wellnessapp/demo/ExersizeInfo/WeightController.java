package com.wellnessapp.demo.ExersizeInfo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * This part is for data visualization
 */
@RestController
public class WeightController {

    @Autowired
    private WeightRepository weightRepository;

    @GetMapping("/weight/save")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Boolean saveNewWeight(@RequestParam("email")String email, @RequestParam("weight")Double weight){
       try {
           Weight userWeight = new Weight(email, new Date(), weight);
           weightRepository.save(userWeight);
           return true;
       }catch (Exception e){
           e.printStackTrace();
           return false;
       }
    }


    @GetMapping("/weight/getWeight")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Weight> getWeight(@RequestParam("email")String email){
        try{
            return weightRepository.getWeightByEmail(email);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
