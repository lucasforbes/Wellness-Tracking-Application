package com.wellnessapp.demo.Diet;

import com.wellnessapp.demo.Exersize.Exersize;
import com.wellnessapp.demo.Exersize.ExersizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class DietController {
    @Autowired
    private DietRepository ddb;

    @PostMapping("/addDiet")
    @ResponseBody
    public String saveExersize(@RequestBody Diet diet){
        System.out.println("");
        ddb.save(diet);
        return "Exersize Plan Saved";
    }
    @GetMapping("/findDietByUserID/{id, name}")
    public Diet findByUserID(@PathVariable int id, @PathVariable String name){
        System.out.println("Got All Exersizes");
        return this.ddb.findByUserID(id, name);
    }
    @GetMapping("/findAllDiets")
    public List<Diet> findByUserID(){
        System.out.println("Got All Diets");
        return this.ddb.findAll();
    }
    @GetMapping("/findDietByUserID/{id}")
    public Optional<Diet> getByUserID(@PathVariable int id){
        return this.ddb.findById(id);
    }

}
