package com.wellnessapp.demo.Creator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CreatorController {
    @Autowired
    private CreatorRepository cdb;

    @PostMapping("/addCreator")
    @ResponseBody
    public String saveCreator(@RequestBody Creator creator){
        System.out.println("");
        cdb.save(creator);
        return "Creator added to database: " + creator.getId();
    }
    @GetMapping("/findAllCreators")
    public List<Creator> getCreators(){
        System.out.println("Got Creators");
        return this.cdb.findAll();
    }
    @GetMapping("/findAllCreators/{id}")
    public Optional<Creator> getCreators(@PathVariable int id){
        return this.cdb.findById(id);
    }
}
