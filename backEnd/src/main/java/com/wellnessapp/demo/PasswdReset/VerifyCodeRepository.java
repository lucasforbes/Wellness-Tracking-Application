package com.wellnessapp.demo.PasswdReset;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface VerifyCodeRepository extends MongoRepository<VerifyCode, Integer> {
    // possible functions for querying the db
    public VerifyCode findByEmail(String email);
}
