-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 18, 2024 at 02:01 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pia_projekat_2024`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student` varchar(30) NOT NULL,
  `tutor` varchar(30) NOT NULL,
  `subject` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `doubletime` tinyint(1) NOT NULL,
  `approved` smallint(1) NOT NULL,
  `explanation` varchar(300) DEFAULT NULL,
  `reviewForTutor` int(11) DEFAULT NULL,
  `commentForTutor` varchar(300) DEFAULT NULL,
  `reviewForStudent` int(11) DEFAULT NULL,
  `commentForStudent` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_users_student FOREIGN KEY (`student`) REFERENCES users(`username`),
  CONSTRAINT fl_users_tutor FOREIGN KEY (`tutor`) REFERENCES users(`username`),
  CONSTRAINT fk_subject FOREIGN KEY (`subject`) REFERENCES users(`name`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `student`, `tutor`, `subject`, `description`, `date`, `time`, `doubletime`, `approved`, `explanation`, `reviewForTutor`, `commentForTutor`, `reviewForStudent`, `commentForStudent`) VALUES
(1, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2023-01-15', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(2, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2023-02-15', '12:00:00', 0, 1, NULL, 4, 'Good', 3, 'Practice more'),
(3, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2023-03-15', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(4, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2023-03-31', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(5, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2023-05-15', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(6, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2023-09-15', '12:00:00', 0, 1, NULL, NULL, NULL, 4, 'Good'),
(7, 'pera', 'vita', 'Mathematics', 'Trigonometry', '2023-10-15', '12:00:00', 0, 1, NULL, 5, 'Best tutor ever!', 5, 'Remember to learn the formulas'),
(8, 'pera', 'vita', 'Mathematics', 'Trigonometry', '2023-10-31', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(9, 'pera', 'vita', 'Mathematics', 'Trigonometry', '2023-11-15', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(10, 'pera', 'vita', 'Mathematics', 'Trigonometry', '2023-12-15', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(11, 'pera', 'ana', 'Informatics', 'Lists', '2023-11-24', '17:00:00', 0, -1, 'Too busy', NULL, NULL, NULL, NULL),
(12, 'mika', 'marija', 'Psysics', 'Motion', '2024-02-20', '15:00:00', 1, 1, NULL, 5, 'Excellent tutor', NULL, NULL),
(13, 'mika', 'vita', 'Informatics', 'Lists', '2023-01-10', '16:00:00', 0, 1, NULL, 5, 'Excellent', 4, 'Good job'),
(14, 'mika', 'ana', 'Psychology', 'Freud', '2024-01-23', '15:00:00', 1, 1, NULL, 5, 'Very thorough', NULL, NULL),
(15, 'mika', 'ana', 'Informatics', 'Lists', '2024-01-10', '16:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(16, 'jova', 'marija', 'Psysics', 'Motion', '2023-02-23', '17:00:00', 1, 0, NULL, 4, 'Nice', NULL, NULL),
(17, 'jova', 'vita', 'Informatics', 'Lists', '2023-01-10', '18:00:00', 0, 1, NULL, 5, 'Excellent', 4, 'Good job'),
(18, 'jova', 'ana', 'Psychology', 'Freud', '2024-01-23', '18:00:00', 1, 1, NULL, NULL, NULL, NULL, NULL),
(19, 'jova', 'ana', 'Informatics', 'Lists', '2024-01-10', '18:00:00', 0, 1, NULL, 5, 'Very good', NULL, NULL),
(20, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2024-02-20', '17:00:00', 1, 1, NULL, NULL, NULL, NULL, NULL),
(21, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2024-02-21', '12:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(22, 'mika', 'ana', 'Psychology', 'Freud', '2024-02-21', '15:00:00', 0, 1, NULL, NULL, NULL, NULL, NULL),
(23, 'mika', 'vita', 'Informatics', 'Lists', '2024-02-21', '16:00:00', 1, 1, NULL, NULL, NULL, NULL, NULL),
(24, 'pera', 'ana', 'Mathematics', 'Equations', '2024-03-03', '12:00:00', 0, 0, NULL, NULL, NULL, NULL, NULL),
(25, 'pera', 'ana', 'Mathematics', 'Trigonometry', '2024-03-12', '12:00:00', 0, 0, NULL, NULL, NULL, NULL, NULL),
(26, 'pera', 'vita', 'Informatics', 'Algorithms', '2024-02-22', '14:00:00', 0, 0, NULL, NULL, NULL, NULL, NULL),
(27, 'jova', 'ana', 'Informatics', 'Lists', '2024-03-01', '18:00:00', 0, 0, NULL, NULL, NULL, NULL, NULL),
(28, 'mika', 'marija', 'Psysics', 'Motion', '2023-02-23', '15:00:00', 1, 1, NULL, 5, 'Excellent tutor', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) NOT NULL,
  `student` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT fk_classes FOREIGN KEY (`classId`) REFERENCES classes(`id`),
  CONSTRAINT fk_users FOREIGN KEY (`student`) REFERENCES users(`username`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `classId`, `student`, `type`, `date`, `time`, `seen`) VALUES
(24, 28, 'mika', 'accept', '2024-02-19', '09:00:00', 0),
(23, 23, 'mika', 'accept', '2024-02-19', '09:00:00', 0),
(22, 22, 'mika', 'accept', '2024-02-19', '09:00:00', 0),
(21, 21, 'pera', 'accept', '2024-02-18', '18:15:00', 0),
(20, 20, 'pera', 'accept', '2024-02-18', '16:45:00', 0),
(19, 19, 'jova', 'accept', '2024-01-09', '18:00:00', 1),
(18, 18, 'jova', 'accept', '2024-02-19', '09:00:00', 0),
(17, 17, 'jova', 'accept', '2023-01-08', '15:00:00', 1),
(16, 15, 'mika', 'accept', '2024-01-09', '18:00:00', 1),
(15, 14, 'mika', 'accept', '2024-01-19', '09:00:00', 1),
(14, 13, 'mika', 'accept', '2023-01-08', '15:00:00', 1),
(13, 12, 'mika', 'accept', '2024-02-18', '11:15:00', 0),
(11, 11, 'pera', 'cancel', '2023-11-23', '12:30:00', 1),
(10, 11, 'pera', 'accept', '2023-11-20', '12:00:00', 1),
(12, 10, 'pera', 'accept', '2023-12-15', '12:00:00', 1),
(9, 9, 'pera', 'accept', '2023-11-12', '19:00:00', 1),
(8, 8, 'pera', 'accept', '2023-10-27', '09:00:00', 1),
(7, 7, 'pera', 'accept', '2023-10-12', '10:00:00', 1),
(6, 6, 'pera', 'accept', '2023-09-12', '11:00:00', 1),
(5, 5, 'pera', 'accept', '2023-05-13', '12:00:00', 1),
(4, 4, 'pera', 'accept', '2023-03-28', '18:00:00', 1),
(3, 3, 'pera', 'accept', '2023-03-12', '19:00:00', 1),
(2, 2, 'pera', 'accept', '2023-02-12', '15:00:00', 1),
(1, 1, 'pera', 'accept', '2023-01-12', '19:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `registration_requests`
--

DROP TABLE IF EXISTS `registration_requests`;
CREATE TABLE IF NOT EXISTS `registration_requests` (
  `username` varchar(30) NOT NULL,
  `cv` varchar(300) NOT NULL,
  `subjects` varchar(300) NOT NULL,
  `age` varchar(30) NOT NULL,
  `whereDidYouHearAboutUs` varchar(300) NOT NULL,
  `approved` tinyint(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`),
  CONSTRAINT fk_users FOREIGN KEY (`username`) REFERENCES users(`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration_requests`
--

INSERT INTO `registration_requests` (`username`, `cv`, `subjects`, `age`, `whereDidYouHearAboutUs`, `approved`) VALUES
('ana', 'ana.pdf', 'Informatics, Mathematics, Psychology', 'High school', 'Facebook', 1),
('vita', 'marko.pdf', 'Informatics, Mathematics', 'High school', 'Instagram', 1),
('marija', 'marija.pdf', 'Physics', 'Primary school - 5-8 grade', 'Instagram', 1),
('jelica', 'jelica.pdf', 'Sociology', 'Primary school - 1-4 grade', 'Facebook', 0),
('sanja', 'sanja.pdf', 'Programming', 'High school', 'Facebook', 0);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
CREATE TABLE IF NOT EXISTS `subject` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`name`) VALUES
('Biology'),
('Chemistry'),
('English language'),
('French language'),
('Geography'),
('German language'),
('History'),
('Informatics'),
('Italian language'),
('Latin language'),
('Mathematics'),
('Physics'),
('Programming'),
('Psychology'),
('Serbian language and literature'),
('Spanish language'),
('The world around us');

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

DROP TABLE IF EXISTS `teaches`;
CREATE TABLE IF NOT EXISTS `teaches` (
  `subject` varchar(30) NOT NULL,
  `tutor` varchar(30) NOT NULL,
  PRIMARY KEY (`subject`,`tutor`),
  CONSTRAINT fk_subject FOREIGN KEY (`subject`) REFERENCES subject(`name`),
  CONSTRAINT fk_users FOREIGN KEY (`tutor`) REFERENCES users(`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teaches`
--

INSERT INTO `teaches` (`subject`, `tutor`) VALUES
('Informatics', 'ana'),
('Informatics', 'vita'),
('Mathematics', 'ana'),
('Mathematics', 'vita'),
('Physics', 'marija'),
('Psychology', 'ana');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(30) NOT NULL,
  `password` varchar(300) NOT NULL,
  `question` varchar(300) NOT NULL,
  `answer` varchar(300) NOT NULL,
  `type` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `address` varchar(50) NOT NULL,
  `contact` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `image` varchar(300) NOT NULL,
  `typeOfSchool` varchar(30) DEFAULT NULL,
  `currentGrade` int(11) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `question`, `answer`, `type`, `firstname`, `lastname`, `gender`, `address`, `contact`, `email`, `image`, `typeOfSchool`, `currentGrade`, `deleted`) VALUES
('pera', '$argon2i$v=19$m=65536,t=10,p=1$QehWrja8dysVk4pb2smKmQ$xWbUqkKHaHc0sOeCugHkh9sfigICf2DVAiyem8G7lYY', 'What is your mother\'s maiden name?', 'Milica', 'student', 'Petar', 'Peric', 'M', 'Kosovska 10', '0641234567', 'pera@gmail.com', 'pera.png', 'High school', 2, 0),
('ana', '$argon2i$v=19$m=65536,t=10,p=1$Ikr5cbkoWz9YIUbbKxkfqA$IuuEKsxCg/6HI3FGglDUQ7NjaLxMrslpvDhkl0DfAKM', 'What is your mother\'s maiden name?', 'Ivana', 'tutor', 'Ana', 'Radovanovic', 'F', 'Milesevska 42', '0641234567', 'ana@gmail.com', 'ana.png', NULL, NULL, 0),
('jovana', '$argon2i$v=19$m=65536,t=10,p=1$V+jzZOgL/fBT4RGRn0HSew$8F+zm2z9BTGDDG1LrJIIKyH1n31uwpszeaibv7Gszls', 'What is your mother\'s maiden name?', 'Olivera', 'admin', 'Jovana', 'Jacimovic', 'F', 'Primorska 22', '0641234567', 'jovana@gmail.com', 'jovana.png', NULL, NULL, 0),
('vita', '$argon2i$v=19$m=65536,t=10,p=1$NU1zZkNielI2enBUWU1EcQ$ILApIm1PQcN4mVXcT7OEKA', 'What is your mother\'s maiden name?', 'Biljana', 'tutor', 'Marko', 'Vitiz', 'M', 'Ustanicka 17', '0641234567', 'vita@gmail.com', 'vita.png', NULL, NULL, 0),
('jova', '$argon2i$v=19$m=65536,t=10,p=1$mxbIkXN78yR1LfASUiWc1w$aVwmStXyR2dJ2H3Il+ZwJ146mZSZ2D0/sIB78NBCudY', 'What is your mother\'s maiden name?', 'Marija', 'student', 'Jovan', 'Jovanovic', 'M', 'Dusanova 10', '0641234567', 'jova@gmail.com', 'avatar.png', 'Primary school', 5, 0),
('mika', '$argon2i$v=19$m=65536,t=10,p=1$ZoYm5PBrdQGsdLP8up5+uw$bgoJSwPtPvNtDbugSF2Ih1p451eOA8AzwSRJj3Pc2UU', 'What is your mother\'s maiden name?', 'Jelena', 'student', 'Mika', 'Mikic', 'M', 'Cara Nikolaja II 60', '0641234567', 'mika@gmail.com', 'mika.png', 'High school', 3, 0),
('jelica', '$argon2i$v=19$m=65536,t=10,p=1$2gvhgmPO5N3US95IXpcApw$wfuqbt4+S8kfjMVarQYii4uqi8fsS5Yz3SqdKNzDOgU', 'What is your mother\'s maiden name?', 'Milica', 'tutor', 'Jelica', 'Cincovic', 'F', 'Bulevar kralja Aleksandra 110', '0641234567', 'jelica@gmail.com', 'jelica.png', NULL, NULL, 0),
('marija', '$argon2i$v=19$m=65536,t=10,p=1$ZCHY+WT8WlFUrv5HVZyFPg$Q/lHB8lwF2ccxf1cxu3n9P5zqHFCrqGTnuYGN/8VfsQ', 'What is your mother\'s maiden name?', 'Milica', 'tutor', 'Marija', 'Marinkovic', 'F', 'Madridska 8', '0641234567', 'marija@gmail.com', 'marija.png', NULL, NULL, 0),
('nana', '$argon2i$v=19$m=65536,t=10,p=1$Fp0jTststEd9T6YgsrgOUg$B8UP3KsG/7cH1sS6jO5DAzI9Xbn+7YX42TPWfC0zvSQ', 'What is your mother\'s maiden name?', 'Lilica', 'student', 'Nastasija', 'Avramovic', 'F', 'Bulevar Milutina Milankovica 130', '0641234568', 'nana@gmail.com', 'avatar.png', 'High school', 3, 0),
('sanja', '$argon2i$v=19$m=65536,t=10,p=1$bW41VmxHMVNTWGxuV2pEcg$TXbL2xYL+Rbn8PxrX06fmw', 'What is your mother\'s maiden name?', 'Marija', 'tutor', 'Sanja', 'Radosavljevic', 'F', 'Bulevar kralja Aleksandra 110', '0641234568', 'sanja@gmail.com', 'avatar.png', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `working_hours`
--

DROP TABLE IF EXISTS `working_hours`;
CREATE TABLE IF NOT EXISTS `working_hours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tutor` varchar(30) NOT NULL,
  `startDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endDate` date NOT NULL,
  `endTime` time NOT NULL,
  `working` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_users FOREIGN KEY (`tutor`) REFERENCES users(`username`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `working_hours`
--

INSERT INTO `working_hours` (`id`, `tutor`, `startDate`, `startTime`, `endDate`, `endTime`, `working`) VALUES
(1, 'ana', '2024-02-19', '12:00:00', '2024-02-20', '12:00:00', 0),
(2, 'ana', '2024-02-21', '00:00:00', '2024-02-22', '00:00:00', 0),
(3, 'ana', '2024-02-23', '09:00:00', '2024-02-23', '13:00:00', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
