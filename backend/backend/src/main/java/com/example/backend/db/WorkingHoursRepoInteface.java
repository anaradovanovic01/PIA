package com.example.backend.db;

import com.example.backend.models.WorkingHours;
import com.example.backend.models.Class;

public interface WorkingHoursRepoInteface {

    public WorkingHours checkTutorWorkingHours(Class c);

    public WorkingHours checkTutorTimeoff(Class c);

    public int add(WorkingHours w);

}
