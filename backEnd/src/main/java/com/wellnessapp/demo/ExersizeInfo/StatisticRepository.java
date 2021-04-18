package com.wellnessapp.demo.ExersizeInfo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface StatisticRepository extends MongoRepository<Statistic, Integer> {
    public Statistic findByEmailAndDateAndIsInUse(String email, Date date, boolean isInUse);
    public List<Statistic> findByEmailAndIsInUse(String email, boolean isInUse);

}
