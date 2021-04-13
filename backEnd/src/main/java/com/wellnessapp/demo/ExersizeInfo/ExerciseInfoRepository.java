package com.wellnessapp.demo.ExersizeInfo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface ExerciseInfoRepository extends MongoRepository<ExerciseInfo, Integer> {
    public ExerciseInfo getInfoByEmailAndDateAndIsInUse(String email, Date date, Boolean isInUse);
    public List<ExerciseInfo> getInfoByEmailAndIsInUse(String email, Boolean inInUse);
    public List<ExerciseInfo> getInfoByEmail(String email, Boolean inInUse);
}
