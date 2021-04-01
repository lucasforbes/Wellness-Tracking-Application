package com.wellnessapp.demo.Article;


import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.tools.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ArticleController {
    @Autowired
    private ArticleRepository articleRepository;

    @PostMapping("/article/saveArticle")
    public void saveArticle(@RequestBody Article articleInfo){
        try {
            Article article = new Article();
            article = articleInfo;

            int id = articleRepository.findAll().size();
            article.setId(id);

            articleRepository.save(article);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @GetMapping("/article/findTitle")
    public List<Article> findByTitle(@RequestParam("title")String title){
        return articleRepository.findByTitleContaining(title);
    }

    @GetMapping("/article/findContent")
    public List<Article> findByContent(@RequestParam("content")String content){
        return articleRepository.findByContentContaining(content);
    }
}
