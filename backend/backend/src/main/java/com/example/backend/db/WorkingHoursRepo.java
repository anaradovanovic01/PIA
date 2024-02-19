package com.example.backend.db;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import com.example.backend.models.WorkingHours;
import com.example.backend.models.Class;

public class WorkingHoursRepo implements WorkingHoursRepoInteface {

    @Override
    public WorkingHours checkTutorWorkingHours(Class c) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from working_hours where tutor=? and ? between startDate and endDate and working=1")) {
            stm.setString(1, c.getTutor());
            stm.setDate(2, Date.valueOf(c.getDatetime().toLocalDate()));
            ResultSet rs = stm.executeQuery();
            while(rs.next()) {
                Timestamp startTime1 = new Timestamp(rs.getDate("startDate").getTime()+rs.getTime("startTime").getTime());
                Timestamp endTime1 = new Timestamp(rs.getDate("endDate").getTime()+rs.getTime("endTime").getTime());
                Timestamp startTime2 = Timestamp.valueOf(c.getDatetime());
                Timestamp endTime2;
                if(c.getDoubletime()) 
                    endTime2 = Timestamp.valueOf(c.getDatetime().plusMinutes(120));
                else
                    endTime2 = Timestamp.valueOf(c.getDatetime().plusMinutes(60));
                if(startTime1.compareTo(endTime2) <= 0 && endTime1.compareTo(startTime2) >= 0) 
                    return new WorkingHours(rs.getInt("id"), rs.getString("tutor"), 
                    LocalDateTime.of(rs.getDate("startDate").toLocalDate(), rs.getTime("startTime").toLocalTime()), 
                    LocalDateTime.of(rs.getDate("endDate").toLocalDate(), rs.getTime("endTime").toLocalTime()), false);              
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public WorkingHours checkTutorTimeoff(Class c) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from working_hours where tutor=? and ? between startDate and endDate and working=0")) {
            stm.setString(1, c.getTutor());
            stm.setDate(2, Date.valueOf(c.getDatetime().toLocalDate()));
            ResultSet rs = stm.executeQuery();
            while(rs.next()) {
                Timestamp startTime1 = new Timestamp(rs.getDate("startDate").getTime()+rs.getTime("startTime").getTime());
                Timestamp endTime1 = new Timestamp(rs.getDate("endDate").getTime()+rs.getTime("endTime").getTime());
                Timestamp startTime2 = Timestamp.valueOf(c.getDatetime());
                Timestamp endTime2;
                if(c.getDoubletime()) 
                    endTime2 = Timestamp.valueOf(c.getDatetime().plusMinutes(120));
                else
                    endTime2 = Timestamp.valueOf(c.getDatetime().plusMinutes(60));
                if(startTime1.compareTo(endTime2) <= 0 && endTime1.compareTo(startTime2) >= 0) 
                    return new WorkingHours(rs.getInt("id"), rs.getString("tutor"), 
                    LocalDateTime.of(rs.getDate("startDate").toLocalDate(), rs.getTime("startTime").toLocalTime()), 
                    LocalDateTime.of(rs.getDate("endDate").toLocalDate(), rs.getTime("endTime").toLocalTime()), false);              
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int add(WorkingHours w) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("insert into working_hours (tutor,startDate,startTime,endDate,endTime,working) values (?,?,?,?,?,?)")) {
            stm.setString(1, w.getTutor());
            stm.setDate(2, Date.valueOf(w.getStart().toLocalDate()));
            stm.setTime(3, Time.valueOf(w.getStart().toLocalTime().plusHours(1)));
            stm.setDate(4, Date.valueOf(w.getEnd().toLocalDate()));
            stm.setTime(5, Time.valueOf(w.getEnd().toLocalTime().plusHours(1)));
            stm.setBoolean(6, w.isWorking());
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
