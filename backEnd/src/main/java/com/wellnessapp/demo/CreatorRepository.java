package com.wellnessapp.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CreatorRepository extends MongoRepository<Creator, Integer> {
    // possible functions for querrying the db
    public Creator findByEmail(String email);
//    public List<Creator> findByLevel(int level);

}