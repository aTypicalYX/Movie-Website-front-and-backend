CREATE DATABASE  IF NOT EXISTS `spmovies` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spmovies`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: spmovies
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `genreid` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`genreid`),
  UNIQUE KEY `genre_UNIQUE` (`genre`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Action','Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of special effects and stunt-work. These movies will keep you on the edge of your seat.'),(5,'Comedy','Movies with lots of jokes and light heartedness. Perfect when you just want to kick back and relax'),(6,'Horror','Horror movies contain frightening and scary scenes that will keep you on the edge and anxious '),(7,'Superhero','Movies based around superhero comic book characters. Well-known ones include Infinity War and Endgame'),(8,'Animation','These movies are perfect for a family movie night. A film from Disney or Pixar is always a treat to behold'),(9,'Documentary','These movies are based on a true story or real events. These cater to people who want to know more about these events'),(10,'Music','Movies that will make you rock n roll. These include Bohemian Rhapsody and Rocketman'),(11,'History','Movies that serve as a record of past historical events. '),(13,'Sci-Fi','FIlms that feature alien worlds, and time travel, along with futuristic elements such as spacecraft, interstellar travel or other technologies.');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `movieid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `cast` varchar(255) NOT NULL,
  `genreid` int NOT NULL,
  `time` varchar(255) NOT NULL,
  `opening_date` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`movieid`),
  KEY `genreid_idx` (`genreid`),
  CONSTRAINT `genreid` FOREIGN KEY (`genreid`) REFERENCES `genres` (`genreid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (2,'Edge of Tomorrow','Major William Cage (Cruise), a public relations officer with no combat experience, is forced by his superiors to join a landing operation against the aliens, only to find himself experiencing a time loop as he tries to find a way to defeat the invaders','Tom Cruise, Emily Blunt, Bill Paxton, Brendan Gleeson',1,'120 mins','10 July 2021','2021-06-19 14:00:29','edgeTom.jpg'),(10,'Loki','After stealing the Tesseract during the events of Avengers: Endgame (2019), an alternate version of Loki is brought to the mysterious Time Variance Authority (TVA). They give Loki a choice:  being erased from existence, or help stop a greater threat','Tom Hiddelston, Owen Wilson, Sophia Di Martino',7,'200 mins','20 December 2021','2021-07-07 02:52:40','loki.jpeg'),(12,'Soul','The story follows a middle school music teacher named Joe Gardner, who seeks to reunite his soul and his body after they are accidentally separated, just before his big break as a jazz musician.','Jaime Foxx, Tina Fey, Graham Norton',8,'105 mins','26 December 2020','2021-08-03 07:57:52','soul.jpg'),(13,'Venom 2 Let there be Carnage','Brock tries to reignite his career in journalism by interviewing serial killer Cletus Kasady (Harrelson), who becomes the host of an alien symbiote similar to Venom named Carnage','Tom Hardy, Woody Harrelson, Michelle Williams',7,'125 mins','22 September 2021','2021-08-04 02:54:49','Venom2.jpg'),(14,'Shang Chi and the legend of the Ten Rings','Shang Chi must return to his home to confront a past he thought he left behind','Simu Liu, Awkwafina, Tony Leung, Benedict Wong',7,'130 mins','16 September 2021','2021-08-06 08:36:09','shangChi.jpg'),(15,'The Suicide Squad','The Squad is on a search-and-destroy mission with only Colonel Rick Flag on the ground to make them behave...and Amanda Waller’s government techies in their ears, tracking their every movement. And as always, one wrong move and they’re dead','Margot Robbie, Idris Elba, Joel Kinnamen, Viola Davis, John Cena',7,'132 mins','5 August 2021','2021-08-06 14:00:36','theSuicideSquad.jpg'),(16,'The King\'s Man','As a collection of history\'s worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man and his protégé must race against time to stop them','Ralph Fiennes, Daniel Brulh, Aaron-Taylor-Johnson',1,'140 mins','21 December 2021','2021-08-08 06:19:25','kingsMan.jpg');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `idreviews` int NOT NULL AUTO_INCREMENT,
  `movieid` int NOT NULL,
  `userid` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idreviews`),
  KEY `movie_id_reference_idx` (`movieid`),
  KEY `user_id_reference_idx` (`userid`),
  CONSTRAINT `movie_id_reference` FOREIGN KEY (`movieid`) REFERENCES `movies` (`movieid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_id_reference` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (4,2,2,6,'Although the first few minutes got me thinking why are they trying to mix The US Army with The UK. This movie has almost everything in it. A package full of entertainment including Action, Sci-fi, adventure and a little bit of comedy','2021-06-22 04:17:16'),(5,2,3,8,'The actors were amazing. Tom Cruise and Emily Brunt were so good can\'t expect better. The others didn\'t really have much to do with all the limelight shared between the two of them, however, at the end all came out remarkable','2021-06-22 04:17:56'),(12,12,4,10,'I can say this without hesitation: Disney/Pixar\'s Soul is my favorite movie of 2020. Brilliantly animated, funny, moving and profound, its arrival at this particular point in time is something of a small miracle. I cannot recommend this enough.','2021-08-05 07:23:42'),(13,2,2,7,'Movie was good, Hope to see a sequel soon.','2021-08-08 04:28:59'),(14,10,5,10,'Liked the atmosphere, the chemistry between Tom and Sophie were great. Looking forward to the future','2021-08-08 15:38:43'),(15,15,7,10,'Amazing movie, James Gunn hits it home again. Much better compared to the first movie','2021-08-08 15:40:01'),(16,12,10,8,'Really good movie, the visual were the beste I have seen in an animation so far. I also loved the premise of the movie and the theme of it','2021-08-09 05:24:39'),(17,10,1,8,'Liked this movie a lot. Hope Marvel sets up the future for the series as it serves as a big entry into Phase 4.','2021-08-09 05:27:08'),(18,13,10,8,'Movie was great. I feel like its a better movie compared to the first. Can\'t wait for more','2021-08-09 06:30:49'),(19,15,10,8,'Pretty good movie, I liked the premise of it. The cast were all great','2021-08-09 07:42:15');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslots`
--

DROP TABLE IF EXISTS `timeslots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslots` (
  `idtimeslots` int NOT NULL AUTO_INCREMENT,
  `movieid` int NOT NULL,
  `timeslots` datetime NOT NULL,
  PRIMARY KEY (`idtimeslots`),
  KEY `movietimeslotid_idx` (`movieid`),
  CONSTRAINT `movieid` FOREIGN KEY (`movieid`) REFERENCES `movies` (`movieid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslots`
--

LOCK TABLES `timeslots` WRITE;
/*!40000 ALTER TABLE `timeslots` DISABLE KEYS */;
/*!40000 ALTER TABLE `timeslots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_pic_url` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `moviename_UNIQUE` (`username`),
  UNIQUE KEY `moviedescription_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'benny','ben@mail','45335432','Customer','www.pic.com','2021-06-14 10:08:19','bennyHere'),(2,'Terry Tan','terry@gmail.com','91234567','Customer','https://www.abc.com/terry.jpg','2021-06-16 04:03:59','lolTerry'),(3,'Charlie puth','char@mail.com','99978865','Customer','www.picturetaking.com','2021-06-17 13:00:27','charlieputh'),(4,'Felix kjelberg','pewds@mail.com','88779900','Customer','www.pictureface.com','2021-06-22 03:59:09','pewdiepie'),(5,'markrober','rober@gmail.com','999766655','Admin','https://www.abc.com/rober.jpg','2021-06-22 09:14:02','rober'),(7,'Sean mc','mc.com','56786655','Customer','www.picture.com','2021-07-04 07:33:35','jacksep'),(10,'Yan Xu','yx@mail.com','56786778','Customer','www.pictureGet.com','2021-07-07 02:47:23','yanxu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'spmovies'
--

--
-- Dumping routines for database 'spmovies'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-09 21:47:30
