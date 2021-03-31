package com.wellnessapp.demo.PasswdReset;

import com.wellnessapp.demo.User.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VerifyCodeRepository extends MongoRepository<VerifyCode, Integer> {
    // possible functions for querying the db
    public VerifyCode findByEmail(String email);
    public List<VerifyCode> findAllByEmail(String email);
}
