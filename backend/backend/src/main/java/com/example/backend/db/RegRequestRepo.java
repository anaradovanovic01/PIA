package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.backend.models.RegRequest;

public class RegRequestRepo implements RegRequestRepoInterface{

    @Override
    public int addRequest(RegRequest t) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("insert into registration_requests (username, cv,subjects,age,whereDidYouHearAboutUs) values (?,?,?,?,?)")) {
            stm.setString(1, t.getUsername());
            stm.setString(2, t.getCv());
            stm.setString(3, t.getSubjects());
            stm.setString(4, t.getAge());
            stm.setString(5, t.getWhereDidYouHearAboutUs());
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public RegRequest getRequest(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from registration_requests where username=?")) {
            stm.setString(1, username);
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                RegRequest newRequest = new RegRequest(rs.getString("username"), rs.getString("cv"),
                 rs.getString("subjects"), rs.getString("age"), rs.getString("whereDidYouHearAboutUs"),
                 rs.getShort("approved"));
                return newRequest;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateAge(RegRequest r) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update registration_requests set age=? where username=?")) {
            stm.setString(1, r.getAge());
            stm.setString(2, r.getUsername());
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int approve(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update registration_requests set approved=1 where username=?")) {
            stm.setString(1, username);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deny(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update registration_requests set approved=-1 where username=?")) {
            stm.setString(1, username);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int[] getAgeCount() {
        PreparedStatement stm;
        try (Connection conn = DB.source().getConnection()) {
            int[] arr = new int[3];

            stm = conn.prepareStatement("select count(*) as 'num' from users as u, registration_requests as r where u.username=r.username and r.age='Primary school - 1-4 grade' and r.approved=1 and u.deleted=0");
            ResultSet rs = stm.executeQuery();
            if(rs.next()) arr[0] = rs.getInt("num");

            stm = conn.prepareStatement("select count(*) as 'num' from users as u, registration_requests as r where u.username=r.username and r.age='Primary school - 5-8 grade' and r.approved=1 and u.deleted=0");
            rs = stm.executeQuery();
            if(rs.next()) arr[1] = rs.getInt("num");
            
            stm = conn.prepareStatement("select count(*) as 'num' from users as u, registration_requests as r where u.username=r.username and r.age='High school' and r.approved=1 and u.deleted=0");
            rs = stm.executeQuery();
            if(rs.next()) arr[2] = rs.getInt("num");

            stm.close();
            return arr;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
