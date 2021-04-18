package com.wellnessapp.demo.ExersizeInfo;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class StatisticController {
    @Autowired
    private StatisticRepository statisticRepository;

    Logger logger = LoggerFactory.getLogger(getClass());

    @PostMapping("/statistic/save")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Boolean saveStatistic(@RequestBody Statistic statistic){
        try {
            String email = statistic.getEmail();
            Date date = statistic.getDate();
            date.setHours(0);
            Statistic old = statisticRepository.findByEmailAndDateAndIsInUse(email, date, true);
            if (old == null) {
                int _id = statisticRepository.findAll().size();
                int yoga = statistic.getYoga();
                int cardio = statistic.getCardio() ;
                int bodyBuilding = statistic.getBodyBuilding() ;
                int caloriesBurned = statistic.getCaloriesBurned();
                int caloriesIntake = statistic.getCaloriesIntake();
                Statistic s = new Statistic(email, date, yoga, cardio, bodyBuilding, caloriesBurned, caloriesIntake);
                statistic.setId(_id);
                statisticRepository.save(statistic);
                logger.info("new statistic was added into the database: " + s);
            } else {
                int yoga = statistic.getYoga() + old.getYoga();
                int cardio = statistic.getCardio() + old.getCardio();
                int bodyBuilding = statistic.getBodyBuilding() + old.getBodyBuilding();
                int caloriesBurned = statistic.getCaloriesBurned() + old.getCaloriesBurned();
                int caloriesIntake = statistic.getCaloriesIntake() + old.getCaloriesIntake();
                Statistic s = new Statistic(email, date, yoga, cardio, bodyBuilding, caloriesBurned, caloriesIntake);
                s.setId(old.getId());
                statisticRepository.save(s);
                logger.info("old statistic data has been changed to: " + s);
            }
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping("/statistic/find")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public List<Statistic> getData(@RequestParam("email")String email, @RequestParam(value = "date", required = false)@DateTimeFormat(pattern = "yyyy-MM-dd") Date date){

        try {
            if (date == null) {
                return statisticRepository.findByEmailAndIsInUse(email, true);
            } else {
                date.setHours(0);
                Statistic s = statisticRepository.findByEmailAndDateAndIsInUse(email, date, true);
                if (s == null) {
                    int _id = statisticRepository.findAll().size();
                    s = new Statistic(email, date, 0, 0, 0, 0, 0);
                    s.setId(_id);
                    statisticRepository.save(s);
                   logger.info("s was initially empty and new s was added: " + s);
                }

                List<Statistic> list = new ArrayList<>();
                list.add(s);
                logger.info("s was published, s: " + s);
                return list;
            }
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/statistic/findall")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public List<Statistic> findAll(){
        return statisticRepository.findAll();
    }

    @GetMapping("/statistic/remove")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public boolean deleteADate(@RequestParam("email")String email, @RequestParam(value = "date",required = false)@DateTimeFormat(pattern = "yyyy-MM-dd")Date date){
        try {
            if (date == null) {
                List<Statistic> list = statisticRepository.findByEmailAndIsInUse(email, true);
                for (Statistic statistic : list) {
                    statistic.setInUse(false);
                    statisticRepository.save(statistic);
                }
            } else {
                date.setHours(0);
                Statistic statistic = statisticRepository.findByEmailAndDateAndIsInUse(email, date, true);
                statistic.setInUse(false);
                statisticRepository.save(statistic);
            }
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping("/statistic/getlatest")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Statistic getLatestData(@RequestParam("email")String email){
        List<Statistic> statistics = statisticRepository.findByEmailAndIsInUse(email, true);
        if(statistics != null){
            Date date = statistics.get(0).getDate();
            for(Statistic statistic: statistics){
                if(date.compareTo(statistic.getDate()) < 0){
                    date = statistic.getDate();
                }
            }
            Statistic statistic = statisticRepository.findByEmailAndDateAndIsInUse(email, date,true);
            return statistic;
        }
        return null;
    }

    @GetMapping("/statistic/getlatestweek")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public List<Statistic> getLatestWeekData(@RequestParam("email")String email){
        List<Statistic> statistics = statisticRepository.findByEmailAndIsInUse(email, true);
        List<Statistic> toBePublished = new ArrayList<>();
        if(statistics != null){
            Date now = new Date();

            for(Statistic statistic: statistics){
                if(getDatePoor(now, statistic.getDate()) < 7){
                    toBePublished.add(statistic);
                }
            }
            return toBePublished;
        }
        return null;
    }

    @GetMapping("/statistic/getlatestmonth")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public List<Statistic> getLatestMonthData(@RequestParam("email")String email){
        List<Statistic> statistics = statisticRepository.findByEmailAndIsInUse(email, true);
        List<Statistic> toBePublished = new ArrayList<>();
        if(statistics != null){
            Date now = new Date();

            for(Statistic statistic: statistics){
                if(getDatePoor(now, statistic.getDate()) < 30){
                    toBePublished.add(statistic);
                }
            }
            return toBePublished;
        }
        return null;
    }

    @GetMapping("/statistic/getlatest6month")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public List<Statistic> getLatest6MonthData(@RequestParam("email")String email){
        List<Statistic> statistics = statisticRepository.findByEmailAndIsInUse(email, true);
        List<Statistic> toBePublished = new ArrayList<>();
        if(statistics != null){
            Date now = new Date();

            for(Statistic statistic: statistics){
                if(getDatePoor(now, statistic.getDate()) < 180){
                    toBePublished.add(statistic);
                }
            }
            return toBePublished;
        }
        return null;
    }

    @GetMapping("/statistic/getlatestyear")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public List<Statistic> getLatestYearData(@RequestParam("email")String email){
        List<Statistic> statistics = statisticRepository.findByEmailAndIsInUse(email, true);
        List<Statistic> toBePublished = new ArrayList<>();
        if(statistics != null){
            Date now = new Date();

            for(Statistic statistic: statistics){
                if(getDatePoor(now, statistic.getDate()) < 365){
                    toBePublished.add(statistic);
                }
            }
            return toBePublished;
        }
        return null;
    }

    @GetMapping("/statistic/priority")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Priority getPriorityFromUser(@RequestParam("email")String email){
        List<Statistic> list = statisticRepository.findByEmailAndIsInUse(email, true);
        int yoga = 0, cardio = 0, bodyBuilding = 0;
        for(Statistic statistic: list){
            yoga += statistic.getYoga();
            cardio += statistic.getCardio();
            bodyBuilding += statistic.getBodyBuilding();
        }
        Priority priority = new Priority();
        int max = Math.max(Math.max(yoga, cardio), bodyBuilding);
        if( max == bodyBuilding ){
            priority.setFirst("bodyBuilding");
            priority.setFirstTime(max);
            int second = Math.max(yoga, cardio);
            if(second == yoga){
                priority.setSecond("yoga");
                priority.setSecondTime(yoga);
            }else {
                priority.setSecond("cardio");
                priority.setSecondTime(cardio);
            }
        }else if(max == yoga){
            priority.setFirst("yoga");
            priority.setFirstTime(yoga);
            int second = Math.max(bodyBuilding, cardio);
            if(second == bodyBuilding){
                priority.setSecondTime(bodyBuilding);
                priority.setSecond("bodyBuilding");
            }else {
                priority.setSecond("cardio");
                priority.setSecondTime(cardio);
            }
        }else {
            priority.setFirstTime(cardio);
            priority.setFirst("cardio");
            int second = Math.max(bodyBuilding, yoga);
            if(second == yoga){
                priority.setSecond("yoga");
                priority.setSecondTime(yoga);
            }else {
                priority.setSecond("bodyBuilding");
                priority.setSecondTime(bodyBuilding);
            }
        }
        return priority;
    }






    public static long getDatePoor(Date endDate, Date nowDate) {

        long nd = 1000 * 24 * 60 * 60;
        long nh = 1000 * 60 * 60;
        long nm = 1000 * 60;
        long diff = endDate.getTime() - nowDate.getTime();
        long day = diff / nd;
        long hour = diff % nd / nh;
        long min = diff % nd % nh / nm;
        return day;
    }
}
