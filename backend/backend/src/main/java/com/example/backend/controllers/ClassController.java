package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.ClassRepo;
import com.example.backend.models.Class;


@RestController
@RequestMapping("/classes")
@CrossOrigin(origins = "http://localhost:4200/")
public class ClassController {

    @GetMapping("/getClassesCountLastWeek")
    public int getClassesCountLastWeek() {
        return new ClassRepo().getClassesCountLastWeek();
    }
    
    @GetMapping("/getClassesCountLastMonth")
    public int getClassesCountLastMonth() {
        return new ClassRepo().getClassesCountLastMonth();
    }

    @PostMapping("/getRatingForTutor")
    public float getRatingForTutor(@RequestBody String username) {
        return new ClassRepo().getRatingForTutor(username);
    }
    
    @PostMapping("/getAllClassesForTutor")
    public List<Class> getAllClassesForTutor(@RequestBody String username) {
        return new ClassRepo().getAllClassesForTutor(username);
    }

    @PostMapping("/addClass")
    public int addClass(@RequestBody Class c) {
        return new ClassRepo().addClass(c);
    }

    @PostMapping("/checkTutorAvailability")
    public Boolean checkTutorAvailability(@RequestBody Class c) {
        return new ClassRepo().checkTutorAvailability(c);
    }

    
    @PostMapping("/getAllPastClassesForStudent")
    public List<Class> getAllPastClassesForStudent(@RequestBody String student) {
        return new ClassRepo().getAllPastClassesForStudent(student);
    }

    @PostMapping("/getAllUpcomingClassesForStudent")
    public List<Class> getAllUpcomingClassesForStudent(@RequestBody String student) {
        return new ClassRepo().getAllUpcomingClassesForStudent(student);
    }
    
    @PostMapping("/getNext5ClassesForTutorIn3Days")
    public List<Class> getNext5ClassesForTutorIn3Days(@RequestBody String tutor) {
        return new ClassRepo().getNext5ClassesForTutorIn3Days(tutor);
    }

    @PostMapping("/getNext10ClassesForTutorIn3Days")
    public List<Class> getNext10ClassesForTutorIn3Days(@RequestBody String tutor) {
        return new ClassRepo().getNext10ClassesForTutorIn3Days(tutor);
    }

    @PostMapping("/getAllClassesForTutorIn3Days")
    public List<Class> getAllClassesForTutorIn3Days(@RequestBody String tutor) {
        return new ClassRepo().getAllClassesForTutorIn3Days(tutor);
    }

    @PostMapping("getAllClassRequestsForTutor")
    public List<Class> getAllClassRequestsForTutor(@RequestBody String tutor) {
        return new ClassRepo().getAllClassRequestsForTutor(tutor);
    }

    @PostMapping("/getRatingForStudent")
    public float getRatingForStudent(@RequestBody String username) {
        return new ClassRepo().getRatingForStudent(username);
    }

    @PostMapping("/acceptClassRequest")
    public int acceptClassRequest(@RequestBody int id) {
        return new ClassRepo().acceptClassRequest(id);
    }

    public static class IdExplanation {
        private int id;
        private String explanation;
        IdExplanation(int i, String e) {this.id = i; this.explanation = e;}
        public int getId() { return this.id; }
        public String getExplanation() { return this.explanation; }
    }

    @PostMapping("/declineClassRequest")
    public int declineClassRequest(@RequestBody IdExplanation data) {
        return new ClassRepo().declineClassRequest(data.getId(), data.getExplanation());
    }

    @PostMapping("getClassesForStudentAndTutor")
    public List<Class> getClassesForStudentAndTutor(@RequestBody String[] str) {
        return new ClassRepo().getClassesForStudentAndTutor(str[0], str[1]);
    }

    @PostMapping("/leaveReviewForStudent")
    public int leaveReviewForStudent(@RequestBody Class c) {
        return new ClassRepo().leaveReviewForStudent(c.getId(), c.getReviewForStudent(), c.getCommentForStudent());
    }

    @PostMapping("/leaveReviewForTutor")
    public int leaveReviewForTutor(@RequestBody Class c) {
        return new ClassRepo().leaveReviewForTutor(c.getId(), c.getReviewForTutor(), c.getCommentForTutor());
    }
    
    @GetMapping("/getWeekDayCount")
    public int[] getWeekDayCount() {
        return new ClassRepo().getWeekDayCount();
    }

    @GetMapping("/getClassCountForTutor")
    public List<String> getClassCountForTutor() {
        return new ClassRepo().getClassCountForTutor();
    }

    @PostMapping("/getMonthCountForTutor")
    public int[] getMonthCountForTutor(@RequestBody String t) {
        return new ClassRepo().getMonthCountForTutor(t);
    }
    
    @GetMapping("/getDoubleTimeCount")
    public int[] getDoubleTimeCount() {
        return new ClassRepo().getDoubleTimeCount();
    }

    @GetMapping("/getReviewStatistics")
    public int[] getReviewStatistics() {
        return new ClassRepo().getReviewStatistics();
    }
    
}
