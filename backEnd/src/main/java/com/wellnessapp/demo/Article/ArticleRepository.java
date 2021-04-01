package com.wellnessapp.demo.Article;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends MongoRepository<Article, Integer> {

    public Article findById(int id);
    public List<Article> findByTitleContaining(String para);
    public List<Article> findByContentContaining(String para);

}
