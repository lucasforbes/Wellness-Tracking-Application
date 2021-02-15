package com.wellnessapp.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.gridfs.GridFsObject;

import java.util.Date;
import java.util.Objects;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@SpringBootApplication
//@RestController
// implementing CommandLineRunner to run database locally
// will change once the db is hosted
public class WellnessApplication implements CommandLineRunner {
    @Autowired
    private UserRepository udb;
    @Autowired
    private AdminRepository adb;
    @Autowired
    private CreatorRepository cdb;


    public static void main(String[] args) {
//        ConfigurableApplicationContext context = SpringApplication.run(WellnessApplication.class, args);
//        Registration person = context.getBean(Registration.class);
//        person.showRegistration();
        SpringApplication.run(WellnessApplication.class, args);
    }
    // testing out databases
    @Override
    public void run(String... args) throws Exception {

        // save a couple of Users
        udb.save(new User(Long.valueOf(0), "JimmyJohn", "1234", "jimmy@google.com", new GridFsObject() {
            @Override
            public Object getFileId() {
                return null;
            }

            @Override
            public String getFilename() {
                return null;
            }

            @Override
            public Object getContent() {
                return null;
            }

            @Override
            public Options getOptions() {
                return null;
            }
        }, "Jimmy", "John", "Male", "Bloomington", "IN", "1234567899", new Date(), true, false));
        udb.save(new User(Long.valueOf(1), "BobBob", "1234", "bob@google.com", new GridFsObject() {
            @Override
            public Object getFileId() {
                return null;
            }

            @Override
            public String getFilename() {
                return null;
            }

            @Override
            public Object getContent() {
                return null;
            }

            @Override
            public Options getOptions() {
                return null;
            }
        }, "Bob", "Smith", "Male", "Detroit", "MI", "1234567899", new Date(), true, false));
        // save a couple of Admins
        adb.save(new Admin(Long.valueOf(0), "theBoss", "1234", "theboss@google.com", new GridFsObject() {
            @Override
            public Object getFileId() {
                return null;
            }

            @Override
            public String getFilename() {
                return null;
            }

            @Override
            public Object getContent() {
                return null;
            }

            @Override
            public Options getOptions() {
                return null;
            }
        }, "Jim", "Honcho", "1234567899"));
        adb.save(new Admin(Long.valueOf(1), "Manager", "1234", "manager@google.com", new GridFsObject() {
            @Override
            public Object getFileId() {
                return null;
            }

            @Override
            public String getFilename() {
                return null;
            }

            @Override
            public Object getContent() {
                return null;
            }

            @Override
            public Options getOptions() {
                return null;
            }
        }, "Jess", "Jawns", "9876543210"));
        // save a couple of Creators
        cdb.save(new Creator(Long.valueOf(0), "FitCoach", "1234", "fitCoach@google.com", new GridFsObject() {
            @Override
            public Object getFileId() {
                return null;
            }

            @Override
            public String getFilename() {
                return null;
            }

            @Override
            public Object getContent() {
                return null;
            }

            @Override
            public Options getOptions() {
                return null;
            }
        }, "Joe", "Buff", "Male", "Bloomington", "IN", 5, "1234567899", new Date(), true, false));
        cdb.save(new Creator(Long.valueOf(1), "WellnessCoach", "1234", "wellnessCoach@google.com", new GridFsObject() {
            @Override
            public Object getFileId() {
                return null;
            }

            @Override
            public String getFilename() {
                return null;
            }

            @Override
            public Object getContent() {
                return null;
            }

            @Override
            public Options getOptions() {
                return null;
            }
        }, "Sally", "Fit", "Female", "Bloomington", "IN", 3, "1234567899", new Date(), true, false));
        // fetch all users
        System.out.println("Users found with findAll():");
        System.out.println("-------------------------------");
        for (User user : udb.findAll()) {
            System.out.println(user.getUsername());
        }
        System.out.println();
    // fetch all Admins
        System.out.println("Admins found with findAll():");
        System.out.println("-------------------------------");
        for (Admin admin : adb.findAll()) {
            System.out.println(admin.getUsername());
        }
        System.out.println();
    // fetch all creators
        System.out.println("Users found with findAll():");
        System.out.println("-------------------------------");
        for (Creator c : cdb.findAll()) {
            System.out.println(c.getUsername());
        }
        System.out.println();

    }

}
