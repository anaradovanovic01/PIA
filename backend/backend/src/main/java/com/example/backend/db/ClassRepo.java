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
import java.time.temporal.ChronoField;

import com.example.backend.models.Class;

public class ClassRepo implements ClassRepoInteface {

    @Override
    public int getClassesCountLastWeek() {
        /*Date date1 = new Date(System.currentTimeMillis()-604800000);
        Date date2 = new Date(System.currentTimeMillis());*/
        LocalDate date1 = LocalDate.now().minusDays(7);
        LocalDate date2 = LocalDate.now();
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select count(*) as 'num' from classes where date between ? and ? and approved=1")) {
            stm.setDate(1, java.sql.Date.valueOf(date1));
            stm.setDate(2, java.sql.Date.valueOf(date2));
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
    public int getClassesCountLastMonth() {
        LocalDate date1 = LocalDate.now().minusMonths(1);
        LocalDate date2 = LocalDate.now();
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select count(*) as 'num' from classes where date between ? and ? and approved=1")) {
            stm.setDate(1, java.sql.Date.valueOf(date1));
            stm.setDate(2, java.sql.Date.valueOf(date2));
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
    public List<Class> getClasses() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes, users where classes.tutor=users.username and deleted=0")) {
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                 rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                 ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                 rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                 rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public float getRatingForTutor(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select avg(reviewForTutor) as 'avg' from classes where tutor=?")) {
            stm.setString(1, username);
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                return rs.getFloat("avg");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Class> getAllClassesForTutor(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where tutor=?")) {
            stm.setString(1, username);
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int addClass(Class c) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("insert into classes" +
        "(student,tutor,subject,description,date,time,doubletime,approved,explanation,reviewForTutor,commentForTutor,reviewForStudent,commentForStudent)" + 
        "values (?,?,?,?,?,?,?,?,?,?,?,?,?)")) {
            stm.setString(1, c.getStudent());
            stm.setString(2, c.getTutor());
            stm.setString(3, c.getSubject());
            stm.setString(4, c.getDescription());
            LocalDateTime dt = c.getDatetime();
            stm.setDate(5, Date.valueOf(dt.toLocalDate()));
            stm.setTime(6, Time.valueOf(dt.toLocalTime().plusHours(1)));
            stm.setBoolean(7, c.getDoubletime());
            stm.setInt(8, 0);
            stm.setNull(9, java.sql.Types.VARCHAR);
            stm.setNull(10, java.sql.Types.INTEGER);
            stm.setNull(11, java.sql.Types.VARCHAR);
            stm.setNull(12, java.sql.Types.INTEGER);
            stm.setNull(13, java.sql.Types.VARCHAR);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
    
    @Override
    public Boolean checkTutorAvailability(Class c) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where tutor=? and date=? and approved='1'")) {
            stm.setString(1, c.getTutor());
            stm.setDate(2, Date.valueOf(c.getDatetime().toLocalDate()));
            ResultSet rs = stm.executeQuery();
            while(rs.next()) {
                LocalDateTime startTime1 = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                LocalDateTime endTime1;
                if(rs.getBoolean("doubletime")) 
                    endTime1 = startTime1.plusMinutes(120);
                else
                    endTime1 = startTime1.plusMinutes(60);
                LocalDateTime starTime2 = c.getDatetime();
                LocalDateTime endTime2;
                if(c.getDoubletime()) 
                    endTime2 = starTime2.plusMinutes(120);
                else
                    endTime2 = starTime2.plusMinutes(60);
                if(startTime1.compareTo(endTime2) <= 0 && endTime1.compareTo(starTime2) >= 0) 
                    return false;               
            }
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public List<Class> getAllPastClassesForStudent(String student) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where student=? and date<=? and approved='1' order by date desc")) {
            stm.setString(1, student);
            LocalDate date = LocalDate.now();
            LocalTime time = LocalTime.now();
            stm.setDate(2, Date.valueOf(date));
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                if(rs.getDate("date").toLocalDate().equals(date) && rs.getTime("time").toLocalTime().compareTo(time) >= 0) continue;
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Class> getAllUpcomingClassesForStudent(String student) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes, users where student=? and date>=? and approved='1' and users.username=classes.tutor and deleted=0 order by date asc")) {
            stm.setString(1, student);
            LocalDate date = LocalDate.now();
            LocalTime time = LocalTime.now();
            stm.setDate(2, Date.valueOf(date));
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                if(rs.getDate("date").toLocalDate().equals(date) && rs.getTime("time").toLocalTime().compareTo(time) < 0) continue;
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Class> getNext5ClassesForTutorIn3Days(String tutor) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where tutor=? and date between ? and ? and approved='1' order by date limit 5")) {
            stm.setString(1, tutor);
            LocalDate date1 = LocalDate.now();
            LocalDate date2 = LocalDate.now().plusDays(3);
            stm.setDate(2, Date.valueOf(date1));
            stm.setDate(3, Date.valueOf(date2));
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Class> getNext10ClassesForTutorIn3Days(String tutor) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where tutor=? and date between ? and ? and approved='1' order by date limit 10")) {
            stm.setString(1, tutor);
            LocalDate date1 = LocalDate.now();
            LocalDate date2 = LocalDate.now().plusDays(3);
            stm.setDate(2, Date.valueOf(date1));
            stm.setDate(3, Date.valueOf(date2));
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Class> getAllClassesForTutorIn3Days(String tutor) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where tutor=? and date between ? and ? and approved='1' order by date")) {
            stm.setString(1, tutor);
            LocalDate date1 = LocalDate.now();
            LocalDate date2 = LocalDate.now().plusDays(3);
            stm.setDate(2, Date.valueOf(date1));
            stm.setDate(3, Date.valueOf(date2));
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Class> getAllClassRequestsForTutor(String tutor) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where tutor=? and approved='0' order by date")) {
            stm.setString(1, tutor);
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public float getRatingForStudent(String username) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select avg(reviewForStudent) as 'avg', count(`reviewForStudent`) as 'cnt' from classes where student=?")) {
            stm.setString(1, username);
            ResultSet rs = stm.executeQuery();
            if(rs.next()){
                if(rs.getInt("cnt") < 3) return 0;
                else return rs.getFloat("avg");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int acceptClassRequest(int id) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update classes set approved=1 where id=?")) {
            stm.setInt(1, id);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int declineClassRequest(int id, String explanation) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update classes set approved='-1', explanation=? where id=?")) {
            stm.setInt(2, id);
            stm.setString(1, explanation);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Class> getClassesForStudentAndTutor(String student, String tutor) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where tutor=? and student=? and approved='1' and date<=? order by subject, date desc")) {
            stm.setString(1, tutor);
            stm.setString(2, student);
            LocalDate date = LocalDate.now();
            LocalTime time = LocalTime.now();
            stm.setDate(3, Date.valueOf(date));
            ResultSet rs = stm.executeQuery();
            ArrayList<Class> classes = new ArrayList<>();
            while(rs.next()){
                if(rs.getDate("date").toLocalDate().equals(date) && rs.getTime("time").toLocalTime().compareTo(time) >= 0) continue;
                LocalDateTime ldt = LocalDateTime.of(rs.getDate("date").toLocalDate(), rs.getTime("time").toLocalTime());
                Class newClass = new Class(rs.getInt("id"), rs.getString("student"),
                rs.getString("tutor"), rs.getString("subject"), rs.getString("description"), 
                ldt, rs.getBoolean("doubletime"), rs.getShort("approved"), 
                rs.getString("explanation"), rs.getInt("reviewForTutor"), rs.getString("commentForTutor"),
                rs.getInt("reviewForStudent"), rs.getString("commentForStudent"));
                classes.add(newClass);
            }
            return classes;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int leaveReviewForStudent(int id, int review, String comment) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update classes set reviewForStudent=?, commentForStudent=? where id=?")) {
            stm.setInt(3, id);
            stm.setInt(1, review);
            stm.setString(2, comment);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int leaveReviewForTutor(int id, int review, String comment) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("update classes set reviewForTutor=?, commentForTutor=? where id=?")) {
            stm.setInt(3, id);
            stm.setInt(1, review);
            stm.setString(2, comment);
            return stm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int[] getWeekDayCount() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select * from classes where approved='1' and date between ? and ?")) {
            int[] arr = new int[7];
            LocalDate date1 = LocalDate.of(2023, 1, 1);
            LocalDate date2 = LocalDate.of(2023, 12, 31);
            stm.setDate(1, Date.valueOf(date1));
            stm.setDate(2, Date.valueOf(date2));
            ResultSet rs = stm.executeQuery();
            while(rs.next()){
                LocalDate date = rs.getDate("date").toLocalDate();
                arr[date.getDayOfWeek().get(ChronoField.DAY_OF_WEEK)-1]++;
            }
            return arr;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<String> getClassCountForTutor() {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select tutor, count(*) as 'num' from classes where approved='1' and date between ? and ? group by tutor order by 'num' limit 10")) {
            List<String> list = new ArrayList<>();
            LocalDate date1 = LocalDate.of(2023, 1, 1);
            LocalDate date2 = LocalDate.of(2023, 12, 31);
            stm.setDate(1, Date.valueOf(date1));
            stm.setDate(2, Date.valueOf(date2));
            ResultSet rs = stm.executeQuery();
            while(rs.next()){
                list.add(rs.getString("tutor"));
            }
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int[] getMonthCountForTutor(String tutor) {
        try (Connection conn = DB.source().getConnection();
        PreparedStatement stm = conn.prepareStatement("select date from classes where approved='1' and date between ? and ? and tutor=?")) {
            int[] arr = new int[12];
            LocalDate date1 = LocalDate.of(2023, 1, 1);
            LocalDate date2 = LocalDate.of(2023, 12, 31);
            stm.setDate(1, Date.valueOf(date1));
            stm.setDate(2, Date.valueOf(date2));
            stm.setString(3, tutor);
            ResultSet rs = stm.executeQuery();
            while(rs.next()){
                LocalDate date = rs.getDate("date").toLocalDate();
                arr[date.getMonthValue()-1]++;
            }
            return arr;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int[] getDoubleTimeCount() {
        PreparedStatement stm;
        try (Connection conn = DB.source().getConnection()) {
            int[] arr = new int[2];

            stm = conn.prepareStatement("select count(*) as 'num' from classes where doubletime='1' and approved='1'");
            ResultSet rs = stm.executeQuery();
            if(rs.next()) arr[0] = rs.getInt("num");

            stm = conn.prepareStatement("select count(*) as 'num' from classes where doubletime='0' and approved='1'");
            rs = stm.executeQuery();
            if(rs.next()) arr[1] = rs.getInt("num");
            
            stm.close();
            return arr;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int[] getReviewStatistics() {
        PreparedStatement stm;
        try (Connection conn = DB.source().getConnection()) {
            int[] arr = new int[4];

            stm = conn.prepareStatement("select count(*) as 'num' from classes where reviewForStudent is not null and approved='1'");
            ResultSet rs = stm.executeQuery();
            if(rs.next()) arr[0] = rs.getInt("num");

            stm = conn.prepareStatement("select count(*) as 'num' from classes where reviewForStudent is null and approved='1'");
            rs = stm.executeQuery();
            if(rs.next()) arr[1] = rs.getInt("num");

            stm = conn.prepareStatement("select count(*) as 'num' from classes where reviewForTutor is not null and approved='1'");
            rs = stm.executeQuery();
            if(rs.next()) arr[2] = rs.getInt("num");

            stm = conn.prepareStatement("select count(*) as 'num' from classes where reviewForTutor is null and approved='1'");
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
