package com.wellnessapp.demo;

import com.wellnessapp.demo.Admin.Admin;
import com.wellnessapp.demo.Admin.AdminRepository;
import com.wellnessapp.demo.Creator.Creator;
import com.wellnessapp.demo.Creator.CreatorRepository;
import com.wellnessapp.demo.User.User;
import com.wellnessapp.demo.User.UserDetails;
import com.wellnessapp.demo.User.UserRepository;
import com.wellnessapp.demo.tools.WordCount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.util.Date;

@SpringBootApplication
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
        User user1 = new User("1234", "jimmy@google.com");
        user1.setId(0);
        udb.save(user1);
        UserDetails ud = new UserDetails("jimmy","oconner", "1997-10-21", "male", "5743397212");
        User u = udb.findByEmail("jimmy@google.com");
        u.setFirstName(ud.getFirstName());
        u.setLastName(ud.getLastName());
        u.setBirthday(ud.getBirthday());
        u.setGender(ud.getGender());
        u.setAge(ud.getAge());
        u.setPhoneNumber(ud.getPhoneNumber());
        udb.delete(user1);
        udb.save(u);
        User user2 = new User("1234", "bob@google.com");
        user2.setId(1);
        udb.save(user2);
        User user3 = new User("1234", "1072846210@qq.com");
        user3.setId(2);
        udb.save(user3);
        // save a couple of Admins
        Admin admin1 = new Admin("1234", "theboss@google.com",  "Jim", "Honcho", "0123456789");
        admin1.setId(0);
        adb.save(admin1);
        Admin admin2 = new Admin( "1234", "manager@google.com",  "Jess", "Jawns", "9876543210");
        admin2.setId(1);
        adb.save(admin2);
        // save a couple of Creators
        Creator creator1 = new Creator("1234", "vishal@google.com");
        creator1.setId(0);
        cdb.save(creator1);
        Creator creator2 = new Creator( "1234", "wellnessCoach@google.com");
        creator2.setId(1);
        cdb.save(creator2);
//         fetch all users
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
