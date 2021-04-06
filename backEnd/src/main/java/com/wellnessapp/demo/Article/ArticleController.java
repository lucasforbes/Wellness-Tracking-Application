package com.wellnessapp.demo.Article;


import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ArticleController {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/article/saveArticle")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
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
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Article> findByTitle(@RequestParam("title")String title){
        return articleRepository.findByTitleContaining(title);
    }

    @GetMapping("/article/findContent")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Article> findByContent(@RequestParam("content")String content){
        return articleRepository.findByContentContaining(content);
    }

    @GetMapping("/article/findWriter")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<List<Article>> findByWriter(@RequestParam("writer") String name){
        try {
            List<User> users = userRepository.findByFirstNameOrLastName(name, name);
            List<List<Article>> articles = new ArrayList<List<Article>>();
            for (User user : users) {
                articles.add(articleRepository.findByWriterContaining(user));
            }
            return articles;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
