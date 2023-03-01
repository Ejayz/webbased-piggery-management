-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 11:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `piggery_management`
--
CREATE DATABASE IF NOT EXISTS `piggery_management` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `piggery_management`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_breed`
--

DROP TABLE IF EXISTS `tbl_breed`;
CREATE TABLE IF NOT EXISTS `tbl_breed` (
  `breed_id` int(11) NOT NULL AUTO_INCREMENT,
  `breed_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`breed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_breed`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cage`
--

DROP TABLE IF EXISTS `tbl_cage`;
CREATE TABLE IF NOT EXISTS `tbl_cage` (
  `cage_id` int(11) NOT NULL AUTO_INCREMENT,
  `cage_name` varchar(50) DEFAULT NULL,
  `cage_type` varchar(50) DEFAULT NULL,
  `cage_capacity` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `is_full` varchar(50) DEFAULT 'false',
  PRIMARY KEY (`cage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_cage`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_category`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

DROP TABLE IF EXISTS `tbl_inventory`;
CREATE TABLE IF NOT EXISTS `tbl_inventory` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `item_description` varchar(250) DEFAULT NULL,
  `item_quantity` float DEFAULT NULL,
  `item_unit` varchar(50) DEFAULT NULL,
  `item_net_weight` float DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`item_id`),
  KEY `FK_ tbl_inventory_tbl_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_inventory`:
--   `category_id`
--       `tbl_category` -> `category_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation`
--

DROP TABLE IF EXISTS `tbl_operation`;
CREATE TABLE IF NOT EXISTS `tbl_operation` (
  `operation_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_type_id` int(11) DEFAULT NULL,
  `operation_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_operation`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_item_details`
--

DROP TABLE IF EXISTS `tbl_operation_item_details`;
CREATE TABLE IF NOT EXISTS `tbl_operation_item_details` (
  `operation_item_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_item_details_id`),
  KEY `FK__tbl_operation_item` (`operation_id`),
  KEY `FK__ tbl_inventory_item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_operation_item_details`:
--   `item_id`
--       `tbl_inventory` -> `item_id`
--   `operation_id`
--       `tbl_operation` -> `operation_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_pig_details`
--

DROP TABLE IF EXISTS `tbl_operation_pig_details`;
CREATE TABLE IF NOT EXISTS `tbl_operation_pig_details` (
  `operation_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_id` int(11) DEFAULT NULL,
  `pig_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_details_id`),
  KEY `FK__tbl_operation` (`operation_id`),
  KEY `FK__tbl_pig` (`pig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_operation_pig_details`:
--   `operation_id`
--       `tbl_operation` -> `operation_id`
--   `pig_id`
--       `tbl_pig` -> `pig_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_type`
--

DROP TABLE IF EXISTS `tbl_operation_type`;
CREATE TABLE IF NOT EXISTS `tbl_operation_type` (
  `operation_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_operation_type`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pig`
--

DROP TABLE IF EXISTS `tbl_pig`;
CREATE TABLE IF NOT EXISTS `tbl_pig` (
  `pig_id` int(11) NOT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `breed_id` int(11) DEFAULT NULL,
  `pig_tag` int(11) DEFAULT NULL,
  `pig_type` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`pig_id`),
  KEY `FK__tbl_cage` (`cage_id`),
  KEY `FK__tbl_batch` (`batch_id`),
  KEY `FK__tbl_breed` (`breed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_pig`:
--   `batch_id`
--       `tbl_batch` -> `batch_id`
--   `cage_id`
--       `tbl_cage` -> `cage_id`
--   `breed_id`
--       `tbl_breed` -> `breed_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase_request`
--

DROP TABLE IF EXISTS `tbl_purchase_request`;
CREATE TABLE IF NOT EXISTS `tbl_purchase_request` (
  `purchase_request_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_request_no` varchar(225) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `purchase_request_date` date DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`purchase_request_id`),
  KEY `FK_tbl_purchase_request_tbl_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_purchase_request`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase_request_details`
--

DROP TABLE IF EXISTS `tbl_purchase_request_details`;
CREATE TABLE IF NOT EXISTS `tbl_purchase_request_details` (
  `purchase_request_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_request_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`purchase_request_details_id`),
  KEY `FK_tbl_purchase_request_details_tbl_purchase_request` (`purchase_request_id`),
  KEY `FK_tbl_purchase_request_details_ tbl_inventory` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_purchase_request_details`:
--   `item_id`
--       `tbl_inventory` -> `item_id`
--   `purchase_request_id`
--       `tbl_purchase_request` -> `purchase_request_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quarantine`
--

DROP TABLE IF EXISTS `tbl_quarantine`;
CREATE TABLE IF NOT EXISTS `tbl_quarantine` (
  `quarantine_id` int(11) NOT NULL AUTO_INCREMENT,
  `remarks` longtext DEFAULT NULL,
  `quarantine_date` date DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`quarantine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_quarantine`:
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quarantine_details`
--

DROP TABLE IF EXISTS `tbl_quarantine_details`;
CREATE TABLE IF NOT EXISTS `tbl_quarantine_details` (
  `quarantine_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `quarantine_id` int(11) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `pig_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`quarantine_details_id`),
  KEY `FK__tbl_quarantine` (`quarantine_id`),
  KEY `FK__tbl_cage_q` (`cage_id`),
  KEY `FK__tbl_pig_q` (`pig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_quarantine_details`:
--   `cage_id`
--       `tbl_cage` -> `cage_id`
--   `pig_id`
--       `tbl_pig` -> `pig_id`
--   `quarantine_id`
--       `tbl_quarantine` -> `quarantine_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `first_name` text DEFAULT NULL,
  `middle_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `job` text DEFAULT NULL,
  `is_exist` text DEFAULT 'true',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `tbl_users`:
--

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `password`, `first_name`, `middle_name`, `last_name`, `phone`, `job`, `is_exist`) VALUES
(1, 'ejayz', '$2b$10$K2THVh1u4U6MBkYJPz3K0OVCxuT91/8RosayJKmMtUkrO2LjycOb.', 'April Jude', 'Dapulang', 'Provido', '9082294975', 'owner', 'true');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD CONSTRAINT `FK_ tbl_inventory_tbl_category` FOREIGN KEY (`category_id`) REFERENCES `tbl_category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_operation_item_details`
--
ALTER TABLE `tbl_operation_item_details`
  ADD CONSTRAINT `FK__ tbl_inventory_item` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK__tbl_operation_item` FOREIGN KEY (`operation_id`) REFERENCES `tbl_operation` (`operation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_operation_pig_details`
--
ALTER TABLE `tbl_operation_pig_details`
  ADD CONSTRAINT `FK__tbl_operation` FOREIGN KEY (`operation_id`) REFERENCES `tbl_operation` (`operation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK__tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_pig`
--
ALTER TABLE `tbl_pig`
  ADD CONSTRAINT `FK__tbl_batch` FOREIGN KEY (`batch_id`) REFERENCES `tbl_batch` (`batch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK__tbl_cage` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_pig_tbl_breed` FOREIGN KEY (`breed_id`) REFERENCES `tbl_breed` (`breed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_purchase_request_details`
--
ALTER TABLE `tbl_purchase_request_details`
  ADD CONSTRAINT `FK_tbl_purchase_request_details_ tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_purchase_request_details_tbl_purchase_request` FOREIGN KEY (`purchase_request_id`) REFERENCES `tbl_purchase_request` (`purchase_request_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_quarantine_details`
--
ALTER TABLE `tbl_quarantine_details`
  ADD CONSTRAINT `FK__tbl_cage_q` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK__tbl_pig_q` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK__tbl_quarantine` FOREIGN KEY (`quarantine_id`) REFERENCES `tbl_quarantine` (`quarantine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
