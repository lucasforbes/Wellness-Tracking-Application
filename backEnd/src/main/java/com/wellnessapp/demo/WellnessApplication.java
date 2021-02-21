package com.wellnessapp.demo;

import com.wellnessapp.demo.Admin.Admin;
import com.wellnessapp.demo.Admin.AdminRepository;
import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.Creator.CreatorRepository;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

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
        udb.deleteAll();
        adb.deleteAll();
        cdb.deleteAll();

        // save a couple of Users
        udb.save(new User(0, "1234", "jimmy@google.com", null, "Jimmy", "John", new Date(), "Male", true, false));
        udb.save(new User(1, "1234", "bob@google.com", null, "Bob", "Smith", new Date(),"Male",  true, false));
        // save a couple of Admins
        adb.save(new Admin(0, "1234", "theboss@google.com",  "Jim", "Honcho", "0123456789"));
        adb.save(new Admin(1, "1234", "manager@google.com",  "Jess", "Jawns", "9876543210"));
        // save a couple of Creators
        cdb.save(new Creator(0, "1234", "fitCoach@google.com", null, "Joe", "Buff", new Date(), true,false, "Male", true, false));
        cdb.save(new Creator(1, "1234", "wellnessCoach@google.com", null, "Sally", "Fit", new Date(), false, true,  "Female",  true, false));
        // fetch all users
        System.out.println("Users found with findAll():");
        System.out.println("-------------------------------");
        for (User user : udb.findAll()) {
            System.out.println(user.getFirstName()+ " " +  user.getLastName());
        }
        System.out.println();
    // fetch all Admins
        System.out.println("Admins found with findAll():");
        System.out.println("-------------------------------");
        for (Admin admin : adb.findAll()) {
            System.out.println(admin.getFirstName()+ " " +  admin.getLastName());
        }
        System.out.println();
    // fetch all creators
        System.out.println("Creators found with findAll():");
        System.out.println("-------------------------------");
        for (Creator c : cdb.findAll()) {
            System.out.println(c.getFirstName()+ " " +  c.getLastName());
        }
        System.out.println();

    }

}
