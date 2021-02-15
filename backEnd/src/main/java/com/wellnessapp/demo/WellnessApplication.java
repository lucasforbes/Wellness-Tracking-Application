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

    public static void main(String[] args) {
//        ConfigurableApplicationContext context = SpringApplication.run(WellnessApplication.class, args);
//        Registration person = context.getBean(Registration.class);
//        person.showRegistration();
        SpringApplication.run(WellnessApplication.class, args);
    }
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
        udb.save(new User(Long.valueOf(0), "BobBob", "1234", "bob@google.com", new GridFsObject() {
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

        // fetch all users
        System.out.println("Customers found with findAll():");
        System.out.println("-------------------------------");
        for (User customer : udb.findAll()) {
            System.out.println(customer);
        }
        System.out.println();

        // fetch an individual customer
        System.out.println("Customer found with findByUserName('BobBob'):");
        System.out.println("--------------------------------");
        System.out.println(udb.findByUsername("BobBob").printUser());

        System.out.println("Customers found with findByState('MI'):");
        System.out.println("--------------------------------");
        for (User customer : udb.findByState("MI")) {
            System.out.println(customer.printUser());
        }
    }

}
