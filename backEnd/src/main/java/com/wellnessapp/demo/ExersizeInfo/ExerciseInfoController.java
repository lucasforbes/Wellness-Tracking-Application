package com.wellnessapp.demo.ExersizeInfo;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class ExerciseInfoController {

    @Autowired
    private ExerciseInfoRepository eip;


    @PostMapping("/exerciseinfo/save")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public Boolean saveNewExerciseInfo(@RequestBody ExerciseInfo exerciseInfo) {
        String email = exerciseInfo.getEmail();
        Date date = exerciseInfo.getDate();
        try {
            ExerciseInfo old = eip.getInfoByEmailAndDateAndIsInUse(email, date, true);
            if(old == null){
                int id = eip.findAll().size();
                List<WorkoutInfo> temp = new ArrayList<>();
                for(WorkoutInfo workoutInfo: exerciseInfo.getWorkoutInfo()) {
                    temp.add(new WorkoutInfo(workoutInfo.getStartTime(),workoutInfo.getEndTime(),workoutInfo.getKindOfSport(),workoutInfo.getCaloriesBurned()));
                }
                ExerciseInfo newInfo = new ExerciseInfo(email, date, temp, exerciseInfo.getCaloriesIntake());
                newInfo.setId(id);
                eip.save(newInfo);
            } else {
                for(WorkoutInfo workoutInfo: exerciseInfo.getWorkoutInfo()) {
                    old.getWorkoutInfo().add(new WorkoutInfo(workoutInfo.getStartTime(),workoutInfo.getEndTime(),workoutInfo.getKindOfSport(),workoutInfo.getCaloriesBurned()));
                }
                ExerciseInfo newInfo = new ExerciseInfo(email, date, old.getWorkoutInfo(), old.getCaloriesIntake());
                int id = old.getId();
                newInfo.setId(id);
                delete(id);
                eip.save(newInfo);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping("exerciseinfo/getinfo")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @ResponseBody
    public List<ExerciseInfo> getExerciseInfo(@RequestParam("email") String email, @RequestParam(value = "date", required = false)@DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        List<ExerciseInfo> list = new ArrayList<>();
        try {
            if (date == null) {
                return eip.getInfoByEmailAndIsInUse(email, true);
            } else {
                date.setHours(8);
                list.add(eip.getInfoByEmailAndDateAndIsInUse(email, date, true));
                return list;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("exerciseinfo/remove")
    @ResponseBody
    public Boolean removes(@RequestParam("email")String email, @RequestParam(value = "date",required = false)@DateTimeFormat(pattern = "yyyy-MM-dd") Date date){
        try {
            if(date == null){
                List<ExerciseInfo> exerciseInfos = eip.getInfoByEmailAndIsInUse(email, true);
                for(ExerciseInfo exerciseInfo: exerciseInfos){
                    Optional<ExerciseInfo> e = eip.findById(exerciseInfo.getId());
                    if(e.isPresent()) {
                        ExerciseInfo temp = e.get();
                        temp.setInUse(false);
                        eip.save(e.get());
                    }
                }
            }else {
                date.setHours(8);
                Optional<ExerciseInfo> exerciseInfo = Optional.ofNullable(eip.getInfoByEmailAndDateAndIsInUse(email, date, true));
                if(exerciseInfo.isPresent()){
                   ExerciseInfo e = exerciseInfo.get();
                   e.setInUse(false);
                   eip.save(e);
                }
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /***
    @GetMapping("exerciseinfo/remove")
    @ResponseBody
    public boolean remove(@RequestParam("id")int id){
        try {

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    ***/
    @GetMapping("exerciseinfo/delete")
    @ResponseBody
    public boolean delete(@RequestParam("id") int id) {
        try {
            eip.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping("exerciseinfo/findall")
    @ResponseBody
    public List<ExerciseInfo> getAll(){
        return eip.findAll();
    }

    @GetMapping("exerciseinfo/userlatest")
    @ResponseBody
    public ExerciseInfo getLatestInfo(@RequestParam("email")String email){
        List<ExerciseInfo> exerciseInfos = eip.getInfoByEmailAndIsInUse(email, true);
        if(exerciseInfos.isEmpty()){
            return null;
        }
        Date date = exerciseInfos.get(0).getDate();
        for(ExerciseInfo exerciseInfo: exerciseInfos){
            if(exerciseInfo.getDate().compareTo(date) > 0){
                date = exerciseInfo.getDate();
            }
        }
        return eip.getInfoByEmailAndDateAndIsInUse(email, date, true);
    }

}
