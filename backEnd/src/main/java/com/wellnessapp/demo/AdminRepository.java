package com.wellnessapp.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AdminRepository extends MongoRepository<Admin, Long> {
    // possible functions for querrying the db
    public Admin findByUsername(String username);
    public List<Admin> findByPhone(String phone);

}