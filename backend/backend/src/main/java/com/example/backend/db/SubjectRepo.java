package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.Subject;

public class SubjectRepo implements SubjectRepoInterface {

    @Override
    public List<Subject> getAll() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from subject")) {
            ResultSet rs = stm.executeQuery();
            ArrayList<Subject> subjects = new ArrayList<>();
            while(rs.next()){
                Subject s = new Subject(rs.getString("name"));  
                subjects.add(s);             
            }
            return subjects;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int add(String subject) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("insert into subject values (?)")) {
            stm.setString(1, subject);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
    
}
