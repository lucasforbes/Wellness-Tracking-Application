package com.wellnessapp.demo.ExersizeInfo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface BodyInfoRepository extends MongoRepository<BodyInfo, Integer> {
    public List<BodyInfo> getWeightByEmail(String email);
    public BodyInfo findBodyInfoByEmailAndTime(String email, Date time);

}
