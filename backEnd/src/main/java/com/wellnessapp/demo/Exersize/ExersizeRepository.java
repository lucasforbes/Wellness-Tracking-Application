package com.wellnessapp.demo.Exersize;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExersizeRepository extends MongoRepository<Exersize, Integer> {
    // posible functions for querrying the db
//    single exersize lookup
    public Exersize findByUserID(Integer userID, String workout);
//    all exersizes for user
    public List<Exersize> findByUserID(Integer userID);
}
