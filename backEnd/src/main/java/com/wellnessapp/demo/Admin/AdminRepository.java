package com.wellnessapp.demo.Admin;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AdminRepository extends MongoRepository<Admin, Integer> {
    // possible functions for querrying the db
    public Admin findByEmail(String email);
    public List<Admin> findByPhone(String phone);

}