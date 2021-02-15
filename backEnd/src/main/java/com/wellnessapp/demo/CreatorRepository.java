package com.wellnessapp.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CreatorRepository extends MongoRepository<Creator, Long> {
    // possible functions for querrying the db
    public Creator findByUsername(String username);
    public List<Creator> findByLevel(int level);

}