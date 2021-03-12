package com.wellnessapp.demo.Diet;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DietRepository extends MongoRepository<Diet, Integer> {
    public Diet findByUserID(Integer userID, String diet);
    public List<Diet> findByUserID(Integer userID);
}
