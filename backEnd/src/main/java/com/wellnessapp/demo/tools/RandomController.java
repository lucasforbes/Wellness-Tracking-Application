package com.wellnessapp.demo.tools;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wellnessapp.demo.Diet.Diet;
import com.wellnessapp.demo.Diet.DietRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

public class RandomController {
    @RestController
    public class DietController {

        @PostMapping("/addRandom")
        @ResponseBody
        public String addRandom() {
            return "Hello";
        }
        @GetMapping("/getrandom")
        @ResponseBody
        public String sendRandom(){
            return "ByBy";
        }
    }
}
