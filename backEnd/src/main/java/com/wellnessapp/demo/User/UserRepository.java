package com.wellnessapp.demo.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, Integer> {
    // possible functions for querying the db
    public User findByEmail(String email);
    public List<User> findByFirstNameOrLastName(String name1, String name2);


}