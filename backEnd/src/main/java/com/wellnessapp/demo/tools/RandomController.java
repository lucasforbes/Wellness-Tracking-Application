package com.wellnessapp.demo.tools;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class RandomController {

    @PostMapping("/addRandom")
    @ResponseBody
    public String addRandom() {
        return "Hello";
    }
    @GetMapping("/getRandom")
    @ResponseBody
    public String sendRandom(){
        return "ByBy";
    }

}
