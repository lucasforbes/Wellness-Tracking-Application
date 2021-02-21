package com.wellnessapp.demo.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Integer> {
    // possible functions for querrying the db
    public User findByEmail(String email);

}