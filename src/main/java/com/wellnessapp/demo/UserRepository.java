package com.wellnessapp.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, Long> {
    // possible functions for querrying the db
    public User findByName(String name);
    public List<User> findByState(String State);

}