package com.wellnessapp.demo.ExersizeInfo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BodyInfoRepository extends MongoRepository<BodyInfo, Integer> {
    public List<BodyInfo> getWeightByEmail(String email);


}
