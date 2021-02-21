package com.wellnessapp.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserRepository udb;

    @PostMapping("/addUser")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public String saveUser(@RequestBody User user){
        System.out.println("Trying to add new User");
        System.out.println("");
        udb.save(user);
        return "User added to database: " + user.getId();
    }
    @GetMapping("/findAllUsers")
    public List<User> getUsers(){
        System.out.println("Got users");
        return this.udb.findAll();
    }
    @GetMapping("/findUser/{id}")
    public Optional<User> getUsers(@PathVariable int id){
        System.out.println("Trying to get user with id: " + id);
        return this.udb.findById(id);
    }

    @GetMapping("/findUserByUsername/{email}")
    public User getUsers(@PathVariable String email){
        System.out.println("username: " + email);
        return this.udb.findByEmail(email);
    }

}
