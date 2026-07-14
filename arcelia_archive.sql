/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.3.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: arcelia_archive
-- ------------------------------------------------------
-- Server version	12.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `archives`
--

DROP TABLE IF EXISTS `archives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `archives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `year` year(4) DEFAULT NULL,
  `description` text NOT NULL,
  `content` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('publish','draft') DEFAULT 'publish',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archives`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `archives` WRITE;
/*!40000 ALTER TABLE `archives` DISABLE KEYS */;
INSERT INTO `archives` VALUES
(6,'Road Damage Detection System','road-damage-detection-system','Computer Vision',NULL,'AI-powered road damage detection system using YOLO object detection for detecting potholes from road images and videos.','Road Damage Detection System is my project focused on detecting road damage using Computer Vision.\n\nThe application was developed using Python, OpenCV, Roboflow, and the YOLO object detection model.\n\nFeatures:\n- Road damage detection from images\n- Video detection\n- Real-time inference\n- Dataset training using Roboflow\n- Bounding box visualization\n\nTechnology:\nPython\nYOLOv8\nOpenCV\nRoboflow\nStreamlit','uploads/smart_road.jpg','publish','2026-07-01 13:04:25','2026-07-01 13:20:50'),
(7,'LPP Ariyanti Company Profile','lpp-ariyanti-company-profile','Web Development',NULL,'Company profile website with CMS for managing content.','A company profile website developed for LPP Ariyanti Bandung.\n\nThe website provides an admin dashboard for managing content such as articles and archive items.\n\nFeatures:\n- Admin Login\n- CRUD Content\n- Responsive Design\n- Company Profile\n- Gallery\n- Archive\n\nTechnology:\nPHP\nYii2 Framework\nMySQL\nBootstrap\nJavaScript','uploads/HalamanUtama.png','publish','2026-07-01 13:11:45','2026-07-01 13:18:44'),
(8,'ATmega328P Pedometer','atmega328p-pedometer','Embedded System',NULL,'Step counter using ATmega328P and SW-420 vibration sensor.','An embedded system project that counts walking steps using the SW-420 vibration sensor.\n\nThe system processes vibration signals through the ATmega328P microcontroller and displays the step count.\n\nTechnology:\nATmega328P\nEmbedded C\nSW-420 Sensor','uploads/Final_Prototype.jpg','publish','2026-07-01 13:12:37','2026-07-01 13:17:33'),
(9,'Lost Key Finder','lost-key-finder','Embedded System',NULL,'Bluetooth-based key finder using HC-05 module.','A Bluetooth-enabled lost key finder system.\n\nThe project uses the HC-05 Bluetooth module and ATmega328P microcontroller to help users locate misplaced keys.\n\nTechnology:\nATmega328P\nHC-05 Bluetooth\nEmbedded C','uploads/Rangkaian_RLE.png','publish','2026-07-01 13:13:23','2026-07-01 13:15:14');
/*!40000 ALTER TABLE `archives` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(2,'admin','$2b$10$MmLR5xsqg.Uo03ZzmLLASOR7cIHh.FsneVTKOFV1vAWsAK/70fSz6','2026-06-29 07:00:44','2026-06-29 07:00:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-07-14 13:57:04
