package com.example.backend.db;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Notification;
import com.example.backend.models.Class;

public class NotificationRepo implements NotificationRepoInterface {

    @Override
    public List<Notification> getAllNewForStudent(String s) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from notifications as n, classes as c where c.id=n.classId and n.student=? and n.seen=0 order by n.date desc")) {
            stm.setString(1, s);
            ResultSet rs = stm.executeQuery();
            ArrayList<Notification> notifications = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("n.date").toLocalDate(), rs.getTime("n.time").toLocalTime());
                LocalDateTime ldt2 = LocalDateTime.of(rs.getDate("c.date").toLocalDate(), rs.getTime("c.time").toLocalTime());
                Notification n = new Notification(rs.getInt("id"), rs.getInt("classId"), rs.getString("student"),
                rs.getString("type"), ldt, rs.getBoolean("seen"));
                Class c = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt2, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                n.setClass(c);
                notifications.add(n);             
            }
            return notifications;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Notification> getAllSeenForStudent(String s) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from notifications as n, classes as c where c.id=n.classId and n.student=? and n.seen=1 order by n.date desc")) {
            stm.setString(1, s);
            ResultSet rs = stm.executeQuery();
            ArrayList<Notification> notifications = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("n.date").toLocalDate(), rs.getTime("n.time").toLocalTime());
                LocalDateTime ldt2 = LocalDateTime.of(rs.getDate("c.date").toLocalDate(), rs.getTime("c.time").toLocalTime());
                Notification n = new Notification(rs.getInt("id"), rs.getInt("classId"), rs.getString("student"),
                rs.getString("type"), ldt, rs.getBoolean("seen"));
                Class c = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt2, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                n.setClass(c);
                notifications.add(n);             
            }
            return notifications;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int add(Notification n) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("insert into notifications (classId,student,type,date,time,seen) values (?,?,?,?,?,?)")) {
            stm.setInt(1, n.getClassId());
            stm.setString(2, n.getStudent());
            stm.setString(3, n.getType());
            stm.setDate(4, Date.valueOf(LocalDate.now()));
            stm.setTime(5, Time.valueOf(LocalTime.now()));
            stm.setBoolean(6, false);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int seen(int id) {
        try(Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update notifications set seen=1 where id=?")) {
            stm.setInt(1, id);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
    

}
