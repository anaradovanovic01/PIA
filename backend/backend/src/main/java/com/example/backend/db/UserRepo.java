package com.example.backend.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.models.RegRequest;
import com.example.backend.models.User;

public class UserRepo implements UserRepoInterface {

    @Override
    public User login(User u) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from users where username=? and password=? and deleted=0")) {
            stm.setString(1, u.getUsername());
            stm.setString(2, u.getPassword());
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                RegRequest req = null;
                if(rs.getString("type").equals("tutor")) {
                    req = new RegRequestRepo().getRequest(rs.getString("username"));
                }
                User newUser = new User(rs.getString("username"), rs.getString("password"),
                rs.getString("question"), rs.getString("answer"),
                 rs.getString("type"), rs.getString("firstname"), rs.getString("lastname"), 
                 rs.getString("gender"), rs.getString("address"), rs.getString("contact"), 
                 rs.getString("email"), rs.getString("image"), rs.getString("typeOfSchool"),
                 rs.getInt("currentGrade"), false, req);
                return newUser;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public User getUser(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from users where username=? and deleted=0")) {
            stm.setString(1, username);
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                RegRequest req = null;
                if(rs.getString("type").equals("tutor")) {
                    req = new RegRequestRepo().getRequest(rs.getString("username"));
                }
                User newUser = new User(rs.getString("username"), rs.getString("password"),
                 rs.getString("question"), rs.getString("answer"),
                 rs.getString("type"), rs.getString("firstname"), rs.getString("lastname"), 
                 rs.getString("gender"), rs.getString("address"), rs.getString("contact"), 
                 rs.getString("email"), rs.getString("image"), rs.getString("typeOfSchool"),
                 rs.getInt("currentGrade"), rs.getBoolean("deleted"), req);
                return newUser;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from users where email=? and deleted=0")) {
            stm.setString(1, email);
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                RegRequest req = null;
                if(rs.getString("type").equals("tutor")) {
                    req = new RegRequestRepo().getRequest(rs.getString("username"));
                }
                User newUser = new User(rs.getString("username"), rs.getString("password"),
                 rs.getString("question"), rs.getString("answer"),
                 rs.getString("type"), rs.getString("firstname"), rs.getString("lastname"), 
                 rs.getString("gender"), rs.getString("address"), rs.getString("contact"), 
                 rs.getString("email"), rs.getString("image"), rs.getString("typeOfSchool"),
                 rs.getInt("currentGrade"), rs.getBoolean("deleted"), req);
                return newUser;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int addUser(User u) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("insert into users" +
        "(username,password,question,answer,type,firstname,lastname,gender,address,contact,email,image,typeOfSchool,currentGrade,deleted) "+
        "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
            stm.setString(1, u.getUsername());
            stm.setString(2, u.getPassword());
            stm.setString(3, u.getQuestion());
            stm.setString(4, u.getAnswer());
            stm.setString(5, u.getType());
            stm.setString(6, u.getFirstname());
            stm.setString(7, u.getLastname());
            stm.setString(8, u.getGender());
            stm.setString(9, u.getAddress());
            stm.setString(10, u.getContact());
            stm.setString(11, u.getEmail());
            stm.setString(12, u.getImage());
            if(u.getType().equals("tutor")) {
                stm.setNull(13, java.sql.Types.VARCHAR);
                stm.setNull(14, java.sql.Types.INTEGER);
            } else {
                stm.setString(13, u.getTypeOfSchool());
                stm.setInt(14, u.getCurrentGrade());
            }
            stm.setBoolean(15, false);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
    
    @Override
    public int changePassword(User u) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update users set password=? where username=?")) {
            stm.setString(2, u.getUsername());
            stm.setString(1, u.getPassword());
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public boolean checkSecurityQuestion(User u) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from users where username=? and answer=?")) {
            stm.setString(1, u.getUsername());
            stm.setString(2, u.getAnswer());
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public int updateUser(User u) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update users set firstname=?,lastname=?,address=?,contact=?,email=?," + 
        "typeOfSchool=?,currentGrade=? where username=?")) {
            stm.setString(1, u.getFirstname());
            stm.setString(2, u.getLastname());
            stm.setString(3, u.getAddress());
            stm.setString(4, u.getContact());
            stm.setString(5, u.getEmail());
            stm.setString(8, u.getUsername());
            if(u.getType().equals("tutor")) {
                stm.setNull(6, java.sql.Types.VARCHAR);
                stm.setNull(7, java.sql.Types.INTEGER);
            } else {
                stm.setString(6, u.getTypeOfSchool());
                stm.setInt(7, u.getCurrentGrade());
            }
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int updateImage(User u) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update users set image=? where username=?")) {
            stm.setString(1, u.getImage());
            stm.setString(2, u.getUsername());
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int getStudentCount() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select count(username) as 'num' from users where type='student'")) {
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                return rs.getInt("num");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<User> getApprovedTutors() {
        try (Connection conn = DB.source().getConnection();
        //select * from users where username in (select username from registration_requests where approved=1)"
        PreparedStatement stm = conn.prepareStatement("select u.*, r.* from users as u, registration_requests as r where u.username=r.username and r.approved=1 and u.deleted=0")) {
            ResultSet rs = stm.executeQuery();
            ArrayList<User> tutors = new ArrayList<>();
            while(rs.next()){
                RegRequest req = new RegRequest(rs.getString("username"), rs.getString("cv"),rs.getString("subjects"),
                 rs.getString("age"),rs.getString("whereDidYouHearAboutUs"), rs.getShort("approved"));
                User newTutor = new User(rs.getString("username"), rs.getString("password"),
                 rs.getString("question"), rs.getString("answer"),
                 rs.getString("type"), rs.getString("firstname"), rs.getString("lastname"), 
                 rs.getString("gender"), rs.getString("address"), rs.getString("contact"), 
                 rs.getString("email"), rs.getString("image"), "", 0, false, req);
                tutors.add(newTutor);
            }
            return tutors;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<User> getStudentsForTutor(String tutor) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select distinct u.* from users as u, classes as c where u.username=c.student and c.tutor=? and c.approved=1")) {
            stm.setString(1, tutor);
            ResultSet rs = stm.executeQuery();
            ArrayList<User> tutors = new ArrayList<>();
            while(rs.next()){
                User newTutor = new User(rs.getString("username"), rs.getString("password"),
                    rs.getString("question"), rs.getString("answer"),
                 rs.getString("type"), rs.getString("firstname"), rs.getString("lastname"), 
                 rs.getString("gender"), rs.getString("address"), rs.getString("contact"), 
                 rs.getString("email"), rs.getString("image"), rs.getString("typeOfSchool"), 
                 rs.getInt("currentGrade"), false, null);
                tutors.add(newTutor);
            }
            return tutors;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<User> getNonApprovedTutors() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select u.*, r.* from users as u, registration_requests as r where u.username=r.username and r.approved=0")) {
            ResultSet rs = stm.executeQuery();
            ArrayList<User> tutors = new ArrayList<>();
            while(rs.next()){
                RegRequest req = new RegRequest(rs.getString("username"), rs.getString("cv"),rs.getString("subjects"),
                 rs.getString("age"),rs.getString("whereDidYouHearAboutUs"), rs.getShort("approved"));
                User newTutor = new User(rs.getString("username"), rs.getString("password"),
                 rs.getString("question"), rs.getString("answer"),
                 rs.getString("type"), rs.getString("firstname"), rs.getString("lastname"), 
                 rs.getString("gender"), rs.getString("address"), rs.getString("contact"), 
                 rs.getString("email"), rs.getString("image"), "", 0, false, req);
                tutors.add(newTutor);
            }
            return tutors;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<User> getAllStudents() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from users where type='student'")) {
            ResultSet rs = stm.executeQuery();
            ArrayList<User> tutors = new ArrayList<>();
            while(rs.next()){
                User newTutor = new User(rs.getString("username"), rs.getString("password"),
                 rs.getString("question"), rs.getString("answer"),
                 rs.getString("type"), rs.getString("firstname"), rs.getString("lastname"), 
                 rs.getString("gender"), rs.getString("address"), rs.getString("contact"), 
                 rs.getString("email"), rs.getString("image"), rs.getString("typeOfSchool"),
                 rs.getInt("currentGrade"), false, null);
                tutors.add(newTutor);
            }
            return tutors;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int removeTutor(String u) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update users set deleted=1 where username=?")) {
            stm.setString(1, u);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int[] getGenderCount() {
        PreparedStatement stm;
        try (Connection conn = DB.source().getConnection()) {
            int[] arr = new int[4];

            stm = conn.prepareStatement("select count(*) as 'num' from users where type='student' and gender='M'");
            ResultSet rs = stm.executeQuery();
            if(rs.next()) arr[0] = rs.getInt("num");

            stm = conn.prepareStatement("select count(*) as 'num' from users where type='student' and gender='F'");
            rs = stm.executeQuery();
            if(rs.next()) arr[1] = rs.getInt("num");
            
            stm = conn.prepareStatement("select count(*) as 'num' from users as u, registration_requests as r where u.username=r.username and u.type='tutor' and u.gender='M' and u.deleted=0 and r.approved=1");
            rs = stm.executeQuery();
            if(rs.next()) arr[2] = rs.getInt("num");

            stm = conn.prepareStatement("select count(*) as 'num' from users as u, registration_requests as r where u.username=r.username and u.type='tutor' and u.gender='F' and u.deleted=0 and r.approved=1");
            rs = stm.executeQuery();
            if(rs.next()) arr[3] = rs.getInt("num");

            stm.close();
            return arr;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
}
