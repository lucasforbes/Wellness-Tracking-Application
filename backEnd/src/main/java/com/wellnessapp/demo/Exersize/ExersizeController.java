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
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public String saveExersize(@RequestBody Exersize exersize){
        System.out.println("");
        int id = edb.findAll().size();
        exersize.id = (id + 1);
        edb.save(exersize);
        return "Exersize Plan Saved";
    }
    @GetMapping("/findExersizeByCreatorEmail/{email, name}")
    public Exersize findByUserID(@PathVariable String email, @PathVariable String name){
        System.out.println("Got All Exersizes");
        return this.edb.findByEmail(email, name);
    }
    @GetMapping("/findAllExersizes")
    public List<Exersize> findAllExersizes(){
        System.out.println("Got All Exersizes");
        return this.edb.findAll();
    }
    @GetMapping("/findExersizeByCreatorEmail/{email}")
    public List<Exersize> findByCreatorEmail(@PathVariable String email){
        return this.edb.findByEmail(email);
    }

}
