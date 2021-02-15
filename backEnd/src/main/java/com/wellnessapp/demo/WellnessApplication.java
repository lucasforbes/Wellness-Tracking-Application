package com.wellnessapp.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

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

//        udb.deleteAll();

        // save a couple of Users
        udb.save(new User(Long.valueOf(0), "Jimmy", "jimmy@google.com", "IN"));
        udb.save(new User(Long.valueOf(1), "Bob", "bob@google.com", "MI"));

        // fetch all users
        System.out.println("Customers found with findAll():");
        System.out.println("-------------------------------");
        for (User customer : udb.findAll()) {
            System.out.println(customer);
        }
        System.out.println();

        // fetch an individual customer
        System.out.println("Customer found with findByFirstName('Alice'):");
        System.out.println("--------------------------------");
        System.out.println(udb.findByName("Bob").printUser());

        System.out.println("Customers found with findByLastName('Smith'):");
        System.out.println("--------------------------------");
        for (User customer : udb.findByState("MI")) {
            System.out.println(customer.printUser());
        }
    }

}
