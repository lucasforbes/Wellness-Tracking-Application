package com.wellnessapp.demo.tools;

import com.wellnessapp.demo.User.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;

public interface ImageRepository extends MongoRepository<Image, Integer>{
        // possible functions for querying the db
        public Image findByUserEmail(String userEmail);
        public Image findByOtherDbId(int otherDbId);

}
