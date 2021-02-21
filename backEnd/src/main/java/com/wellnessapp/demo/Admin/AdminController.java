package com.wellnessapp.demo.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminController {
        @Autowired
        private AdminRepository adb;

        @PostMapping("/addAdmin")
        @ResponseBody
        public String saveAdmin(@RequestBody Admin admin){
        System.out.println("");
        adb.save(admin);
        return "Admin added to database: " + admin.getId();
    }
        @GetMapping("/findAllAdmins")
        public List<Admin> getAdmins(){
        System.out.println("Got Admins");
        return this.adb.findAll();
    }
        @GetMapping("/findAllAdmins/{id}")
        public Optional<Admin> getUsers(@PathVariable int id){
        return this.adb.findById(id);
    }
}