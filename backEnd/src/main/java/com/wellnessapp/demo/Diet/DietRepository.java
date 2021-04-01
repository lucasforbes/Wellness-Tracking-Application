package com.wellnessapp.demo.Diet;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DietRepository extends MongoRepository<Diet, Integer> {
//    public Diet findByEmail(String email, String dietTitle);
    public Diet findById(int id);
    public List<Diet> findByEmail(String email);
}
