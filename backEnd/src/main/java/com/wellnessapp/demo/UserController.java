package com.wellnessapp.demo;

import com.fasterxml.jackson.annotation.JsonAlias;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository udb;

//    @PostMapping("/addUser")
    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST, value = "/addUser")
    public String saveUser(@RequestBody JsonAlias user){
        System.out.println("");
//        udb.save(user);
        return "User added to database: " ;
//                + user.getId();
    }
    @GetMapping("/findAllUsers")
    public List<User> getUsers(){
        System.out.println("Got users");
        return this.udb.findAll();
    }
    @GetMapping("/findAllUsers/{id}")
    public Optional<User> getUsers(@PathVariable int id){
        return this.udb.findById(id);
    }
}
