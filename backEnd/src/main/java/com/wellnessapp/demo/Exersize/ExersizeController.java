package com.wellnessapp.demo.Exersize;

import com.wellnessapp.demo.Admin.Admin;
import com.wellnessapp.demo.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ExersizeController {
    @Autowired
    private ExersizeRepository edb;

    @PostMapping("/addExersize")
    @ResponseBody
    public String saveExersize(@RequestBody Exersize exersize){
        System.out.println("");
        edb.save(exersize);
        return "Exersize Plan Saved";
    }
    @GetMapping("/findByUserID/{id, name}")
    public Exersize findByUserID(@PathVariable int id, @PathVariable String name){
        System.out.println("Got All Exersizes");
        return this.edb.findByUserID(id, name);
    }
    @GetMapping("/findAllExersizes")
    public List<Exersize> findByUserID(){
        System.out.println("Got All Exersizes");
        return this.edb.findAll();
    }
    @GetMapping("/findByUserID/{id}")
    public Optional<Exersize> getUsers(@PathVariable int id){
        return this.edb.findById(id);
    }


}
