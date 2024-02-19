package com.example.backend.db;

import java.util.List;

import com.example.backend.models.Class;

public interface ClassRepoInteface {

    public int getClassesCountLastWeek(); 

    public int getClassesCountLastMonth();

    public List<Class> getClasses();

    public float getRatingForTutor(String username);

    public List<Class> getAllClassesForTutor(String username);

    public int addClass(Class c);

    public Boolean checkTutorAvailability(Class c);

    public List<Class> getAllPastClassesForStudent(String student);

    public List<Class> getAllUpcomingClassesForStudent(String student);

    public List<Class> getNext5ClassesForTutorIn3Days(String tutor);

    public List<Class> getNext10ClassesForTutorIn3Days(String tutor);

    public List<Class> getAllClassesForTutorIn3Days(String tutor);

     public List<Class> getAllClassRequestsForTutor(String tutor);

    public float getRatingForStudent(String username) ;

    public int acceptClassRequest(int id);

    public int declineClassRequest(int id, String explanation);

    public List<Class> getClassesForStudentAndTutor(String student, String tutor);

    public int leaveReviewForStudent(int id, int review, String comment);

    public int leaveReviewForTutor(int id, int review, String comment);

    public int[] getWeekDayCount();

    public List<String> getClassCountForTutor();

    public int[] getMonthCountForTutor(String tutor);

    public int[] getDoubleTimeCount();

    public int[] getReviewStatistics();

}
