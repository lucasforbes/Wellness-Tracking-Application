package com.wellnessapp.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, Integer> {
    // possible functions for querrying the db
    public User findByEmail(String email);

}