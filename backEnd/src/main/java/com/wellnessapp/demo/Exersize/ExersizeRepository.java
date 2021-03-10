package com.wellnessapp.demo.Exersize;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExersizeRepository extends MongoRepository<Exersize, Integer> {
    // posible functions for querrying the db
    public Exersize findWorkout(Integer userID, String workout);
    public List<Exersize> getAllWorkouts(Integer userID);
}
