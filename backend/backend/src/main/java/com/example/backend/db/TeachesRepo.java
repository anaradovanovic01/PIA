package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Subject;

public class TeachesRepo implements TeachesRepoInterface {

    @Override
    public List<String> getSubjects() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select distinct subject from teaches, users where teaches.tutor=users.username and deleted=0 order by subject")) {
            ResultSet rs = stm.executeQuery();
            ArrayList<String> subjects = new ArrayList<>();
            while(rs.next()){
                subjects.add(rs.getString("subject"));               
            }
            return subjects;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<String> getAllTutorForSubject(String subject) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select tutor from teaches, users where subject=? and teaches.tutor=users.username and deleted=0")) {
            stm.setString(1, subject);
            ResultSet rs = stm.executeQuery();
            ArrayList<String> tutors = new ArrayList<>();
            while(rs.next()){
                tutors.add(rs.getString("tutor"));               
            }
            return tutors;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public List<Subject> getAllSubjectsForTutor(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select subject from teaches, users where tutor=? and teaches.tutor=users.username and deleted=0")) {
            stm.setString(1, username);
            ResultSet rs = stm.executeQuery();
            ArrayList<Subject> tutors = new ArrayList<>();
            while(rs.next()){
                tutors.add(new Subject(rs.getString("subject")));               
            }
            return tutors;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int add(String tutor, String subject) {
        try(Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("insert into teaches (tutor,subject) values (?,?)")) {
            stm.setString(1, tutor);
            stm.setString(2, subject);
            return stm.executeUpdate();
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int remove(String tutor, String subject) {
        try(Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("delete from teaches where tutor=? and subject=?")) {
            stm.setString(1, tutor);
            stm.setString(2, subject);
            return stm.executeUpdate();
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Integer> getCountForSubjects() {
        try(Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select subject, count(*) from teaches, users where teaches.tutor=users.username and deleted=0 group by subject order by subject")) {
            List<Integer> list = new ArrayList<>();
            ResultSet rs = stm.executeQuery();
            while(rs.next()) {
                list.add(rs.getInt(2));
            }
            return list;
        } catch(SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
