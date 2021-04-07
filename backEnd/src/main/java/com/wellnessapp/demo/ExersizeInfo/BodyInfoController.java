package com.wellnessapp.demo.ExersizeInfo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * This part is for data visualization, BMI is auto calculated and height is input optionally
 */
@RestController
public class BodyInfoController {

    @Autowired
    private BodyInfoRepository bodyInfoRepositoryRepository;

    @GetMapping("/bodyinfo/save")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Boolean saveNewBodyInfo(@RequestParam("email")String email, @RequestParam("weight")Double weight, @RequestParam(value = "height", required = false)Double height){
       try {
           /**
            * 1. the height should use meter as unit, which means a man maybe 1.80m tall.
            * 2. the weight should use kilogram as unit, which means a man maybe 80kg weight.
            */
           if(height == null || height > 3 || height < 0){
               List<BodyInfo> bodyInfos = bodyInfoRepositoryRepository.getWeightByEmail(email);
               int lastTimeRecord = bodyInfos.size() - 1;
               if(lastTimeRecord < 0){
                   height = 0.0;
               }else {
                   height = bodyInfos.get(bodyInfos.size() - 1).getHeight();
               }
           }
           if(weight < 0 || weight > 500){
               weight = 0.0;
           }
           BodyInfo userWeight = new BodyInfo(email, new Date(), height, weight);
           bodyInfoRepositoryRepository.save(userWeight);
           return true;
       }catch (Exception e){
           e.printStackTrace();
           return false;
       }
    }


    @GetMapping("/bodyinfo/getBodyInfo")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<BodyInfo> getBodyInfo(@RequestParam("email")String email){
        try{
            return bodyInfoRepositoryRepository.getWeightByEmail(email);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
