package com.wellnessapp.demo.tools;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<Image, Integer>{
        // possible functions for querying the db
        public Image findByUserEmail(String userEmail);
        public Image findByUserEmail(String userEmail, int id);
        public Image findByOtherDbId(int otherDbId);
}
