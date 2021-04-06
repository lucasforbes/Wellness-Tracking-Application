package com.wellnessapp.demo.ExersizeInfo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WeightRepository extends MongoRepository<Weight, Integer> {
    public List<Weight> getWeightByEmail(String email);


}
