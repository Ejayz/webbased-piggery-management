-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2023 at 03:21 PM
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
-- Table structure for table `tbl_batch`
--

DROP TABLE IF EXISTS `tbl_batch`;
CREATE TABLE IF NOT EXISTS `tbl_batch` (
  `batch_id` int(11) NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(50) DEFAULT NULL,
  `boar_id` varchar(50) DEFAULT NULL,
  `sow_id` varchar(50) DEFAULT NULL,
  `batch_capacity` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`batch_id`),
  KEY `FKtblbatchtblpig` (`boar_id`),
  KEY `FKtblbatchtblpig2` (`sow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_batch`
--

INSERT INTO `tbl_batch` (`batch_id`, `batch_name`, `boar_id`, `sow_id`, `batch_capacity`, `is_exist`) VALUES
(1, 'Breeder', NULL, NULL, 0, 'true'),
(2, 'Batch 2', 'pig_8m81ngv5k5', 'pig_5f1hbvl92w', 2, 'true');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_breed`
--

INSERT INTO `tbl_breed` (`breed_id`, `breed_name`, `is_exist`) VALUES
(1, 'Landrace', 'true'),
(2, 'Duroc', 'true');

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
  `current_caged` int(11) DEFAULT 0,
  `is_exist` varchar(50) DEFAULT 'true',
  `is_full` varchar(50) DEFAULT 'false',
  PRIMARY KEY (`cage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_cage`
--

INSERT INTO `tbl_cage` (`cage_id`, `cage_name`, `cage_type`, `cage_capacity`, `current_caged`, `is_exist`, `is_full`) VALUES
(1, 'Individual Stall 1', 'Individual Stalls', 1, 1, 'true', 'true'),
(2, 'Individual Stall 2', 'Individual Stalls', 1, 1, 'true', 'true'),
(3, 'Individual Stall 3', 'Individual Stalls', 1, 1, 'true', 'true'),
(4, 'Nursery 1', 'Nursery Pens', 20, 1, 'true', 'false');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`category_id`, `category_name`, `is_exist`) VALUES
(1, 'Feeds', 'true'),
(2, 'Medicine', 'true'),
(3, 'Vitamins', 'true'),
(4, 'Utilities', 'true');

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
  `item_unit` varchar(50) DEFAULT NULL,
  `item_net_weight` float DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`item_id`),
  KEY `FK_ tbl_inventory_tbl_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_inventory`
--

INSERT INTO `tbl_inventory` (`item_id`, `item_name`, `category_id`, `item_description`, `item_unit`, `item_net_weight`, `is_exist`) VALUES
(1, 'BMEG 3000', 1, 'A bmeg item for 2months piglet', 'sack', 50, 'true'),
(2, 'Ivermictin', 2, 'Deworming injectable medicine for pigs', 'pcs', 100, 'true'),
(3, 'BRMEG 400', 1, 'sOMETHING YOU FEED', 'sack', 40, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation`
--

DROP TABLE IF EXISTS `tbl_operation`;
CREATE TABLE IF NOT EXISTS `tbl_operation` (
  `operation_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_type_id` int(11) DEFAULT NULL,
  `operation_date` date DEFAULT NULL,
  `pig_id` varchar(50) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `is_exist` varchar(50) DEFAULT 'true',
  `am_pm` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`operation_id`),
  KEY `FK_tbl_operation_tbl_pig` (`pig_id`),
  KEY `FK_tbl_operation_tbl_batch` (`batch_id`),
  KEY `FK_tbl_operation_tbl_cage` (`cage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_operation`
--

INSERT INTO `tbl_operation` (`operation_id`, `operation_type_id`, `operation_date`, `pig_id`, `batch_id`, `cage_id`, `status`, `is_exist`, `am_pm`) VALUES
(1, 1, '2023-04-05', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(2, 1, '2023-04-07', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(3, 1, '2023-04-08', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(4, 1, '2023-04-09', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(5, 1, '2023-04-10', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(6, 1, '2023-04-11', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(7, 1, '2023-04-12', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(8, 1, '2023-04-13', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(9, 1, '2023-04-14', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(10, 1, '2023-04-15', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(11, 1, '2023-04-16', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(12, 1, '2023-04-17', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(13, 1, '2023-04-18', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(14, 1, '2023-04-19', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(15, 1, '2023-04-20', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(16, 1, '2023-04-21', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(17, 1, '2023-04-22', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(18, 1, '2023-04-23', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(19, 1, '2023-04-24', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(20, 1, '2023-04-25', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'AM'),
(21, 2, '2023-04-19', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', NULL),
(22, 2, '2023-04-26', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', NULL),
(23, 1, '2023-04-06', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(24, 1, '2023-04-07', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(25, 1, '2023-04-08', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(26, 1, '2023-04-09', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(27, 1, '2023-04-10', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(28, 1, '2023-04-11', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(29, 1, '2023-04-12', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(30, 1, '2023-04-13', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(31, 1, '2023-04-14', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(32, 1, '2023-04-15', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(33, 1, '2023-04-16', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(34, 1, '2023-04-17', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(35, 1, '2023-04-18', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(36, 1, '2023-04-19', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(37, 1, '2023-04-20', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(38, 1, '2023-04-21', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(39, 1, '2023-04-22', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(40, 1, '2023-04-23', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(41, 1, '2023-04-24', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(42, 1, '2023-04-25', 'pig_5f1hbvl92w', NULL, NULL, 'pending', 'true', 'PM'),
(43, 1, '2023-04-06', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(44, 1, '2023-04-07', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(45, 1, '2023-04-08', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(46, 1, '2023-04-09', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(47, 1, '2023-04-10', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(48, 1, '2023-04-11', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(49, 1, '2023-04-12', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(50, 1, '2023-04-13', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(51, 1, '2023-04-14', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(52, 1, '2023-04-15', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(53, 1, '2023-04-16', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(54, 1, '2023-04-17', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(55, 1, '2023-04-18', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(56, 1, '2023-04-19', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(57, 1, '2023-04-20', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(58, 1, '2023-04-21', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(59, 1, '2023-04-22', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(60, 1, '2023-04-23', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(61, 1, '2023-04-24', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(62, 1, '2023-04-25', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'AM'),
(63, 2, '2023-04-19', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', NULL),
(64, 2, '2023-04-26', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', NULL),
(65, 1, '2023-04-06', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(66, 1, '2023-04-07', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(67, 1, '2023-04-08', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(68, 1, '2023-04-09', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(69, 1, '2023-04-10', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(70, 1, '2023-04-11', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(71, 1, '2023-04-12', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(72, 1, '2023-04-13', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(73, 1, '2023-04-14', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(74, 1, '2023-04-15', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(75, 1, '2023-04-16', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(76, 1, '2023-04-17', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(77, 1, '2023-04-18', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(78, 1, '2023-04-19', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(79, 1, '2023-04-20', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(80, 1, '2023-04-21', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(81, 1, '2023-04-22', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(82, 1, '2023-04-23', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(83, 1, '2023-04-24', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(84, 1, '2023-04-25', 'pig_aktuwtp4m4', NULL, NULL, 'pending', 'true', 'PM'),
(85, 1, '2023-04-05', NULL, 1, NULL, 'confirmed', 'true', 'AM'),
(86, 1, '2023-04-05', NULL, 1, NULL, 'confirmed', 'true', 'AM'),
(87, 1, '2023-04-08', NULL, 1, NULL, 'pending', 'true', 'AM'),
(88, 1, '2023-04-09', NULL, 1, NULL, 'pending', 'true', 'AM'),
(89, 1, '2023-04-10', NULL, 1, NULL, 'pending', 'true', 'AM'),
(90, 1, '2023-04-11', NULL, 1, NULL, 'pending', 'true', 'AM'),
(91, 1, '2023-04-12', NULL, 1, NULL, 'pending', 'true', 'AM'),
(92, 1, '2023-04-13', NULL, 1, NULL, 'pending', 'true', 'AM'),
(93, 1, '2023-04-14', NULL, 1, NULL, 'pending', 'true', 'AM'),
(94, 1, '2023-04-15', NULL, 1, NULL, 'pending', 'true', 'AM'),
(95, 1, '2023-04-16', NULL, 1, NULL, 'pending', 'true', 'AM'),
(96, 1, '2023-04-17', NULL, 1, NULL, 'pending', 'true', 'AM'),
(97, 1, '2023-04-18', NULL, 1, NULL, 'pending', 'true', 'AM'),
(98, 1, '2023-04-19', NULL, 1, NULL, 'pending', 'true', 'AM'),
(99, 1, '2023-04-20', NULL, 1, NULL, 'pending', 'true', 'AM'),
(100, 1, '2023-04-21', NULL, 1, NULL, 'pending', 'true', 'AM'),
(101, 1, '2023-04-22', NULL, 1, NULL, 'pending', 'true', 'AM'),
(102, 1, '2023-04-23', NULL, 1, NULL, 'pending', 'true', 'AM'),
(103, 1, '2023-04-24', NULL, 1, NULL, 'pending', 'true', 'AM'),
(104, 1, '2023-04-25', NULL, 1, NULL, 'pending', 'true', 'AM'),
(105, 2, '2023-04-19', NULL, 1, NULL, 'pending', 'true', NULL),
(106, 2, '2023-04-26', NULL, 1, NULL, 'pending', 'true', NULL),
(107, 1, '2023-04-06', NULL, 1, NULL, 'pending', 'true', 'PM'),
(108, 1, '2023-04-07', NULL, 1, NULL, 'confirmed', 'true', 'PM'),
(109, 1, '2023-04-08', NULL, 1, NULL, 'pending', 'true', 'PM'),
(110, 1, '2023-04-09', NULL, 1, NULL, 'pending', 'true', 'PM'),
(111, 1, '2023-04-10', NULL, 1, NULL, 'pending', 'true', 'PM'),
(112, 1, '2023-04-11', NULL, 1, NULL, 'pending', 'true', 'PM'),
(113, 1, '2023-04-12', NULL, 1, NULL, 'pending', 'true', 'PM'),
(114, 1, '2023-04-13', NULL, 1, NULL, 'pending', 'true', 'PM'),
(115, 1, '2023-04-14', NULL, 1, NULL, 'pending', 'true', 'PM'),
(116, 1, '2023-04-15', NULL, 1, NULL, 'pending', 'true', 'PM'),
(117, 1, '2023-04-16', NULL, 1, NULL, 'pending', 'true', 'PM'),
(118, 1, '2023-04-17', NULL, 1, NULL, 'pending', 'true', 'PM'),
(119, 1, '2023-04-18', NULL, 1, NULL, 'pending', 'true', 'PM'),
(120, 1, '2023-04-19', NULL, 1, NULL, 'pending', 'true', 'PM'),
(121, 1, '2023-04-20', NULL, 1, NULL, 'pending', 'true', 'PM'),
(122, 1, '2023-04-21', NULL, 1, NULL, 'pending', 'true', 'PM'),
(123, 1, '2023-04-22', NULL, 1, NULL, 'pending', 'true', 'PM'),
(124, 1, '2023-04-23', NULL, 1, NULL, 'pending', 'true', 'PM'),
(125, 1, '2023-04-24', NULL, 1, NULL, 'pending', 'true', 'PM'),
(126, 1, '2023-04-25', NULL, 1, NULL, 'pending', 'true', 'PM');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_item_details`
--

DROP TABLE IF EXISTS `tbl_operation_item_details`;
CREATE TABLE IF NOT EXISTS `tbl_operation_item_details` (
  `operation_item_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_item_details_id`),
  KEY `FK__tbl_operation_item` (`operation_id`),
  KEY `FK__ tbl_inventory_item` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_operation_item_details`
--

INSERT INTO `tbl_operation_item_details` (`operation_item_details_id`, `operation_id`, `item_id`, `quantity`, `is_exist`) VALUES
(1, 1, 1, NULL, 'true'),
(2, 2, 1, NULL, 'true'),
(3, 3, 1, NULL, 'true'),
(4, 4, 1, NULL, 'true'),
(5, 5, 1, NULL, 'true'),
(6, 6, 1, NULL, 'true'),
(7, 7, 1, NULL, 'true'),
(8, 8, 1, NULL, 'true'),
(9, 9, 1, NULL, 'true'),
(10, 10, 1, NULL, 'true'),
(11, 11, 1, NULL, 'true'),
(12, 12, 1, NULL, 'true'),
(13, 13, 1, NULL, 'true'),
(14, 14, 1, NULL, 'true'),
(15, 15, 1, NULL, 'true'),
(16, 16, 1, NULL, 'true'),
(17, 17, 1, NULL, 'true'),
(18, 18, 1, NULL, 'true'),
(19, 19, 1, NULL, 'true'),
(20, 20, 1, NULL, 'true'),
(21, 21, 2, NULL, 'true'),
(22, 22, 2, NULL, 'true'),
(23, 23, 1, NULL, 'true'),
(24, 24, 1, NULL, 'true'),
(25, 25, 1, NULL, 'true'),
(26, 26, 1, NULL, 'true'),
(27, 27, 1, NULL, 'true'),
(28, 28, 1, NULL, 'true'),
(29, 29, 1, NULL, 'true'),
(30, 30, 1, NULL, 'true'),
(31, 31, 1, NULL, 'true'),
(32, 32, 1, NULL, 'true'),
(33, 33, 1, NULL, 'true'),
(34, 34, 1, NULL, 'true'),
(35, 35, 1, NULL, 'true'),
(36, 36, 1, NULL, 'true'),
(37, 37, 1, NULL, 'true'),
(38, 38, 1, NULL, 'true'),
(39, 39, 1, NULL, 'true'),
(40, 40, 1, NULL, 'true'),
(41, 41, 1, NULL, 'true'),
(42, 42, 1, NULL, 'true'),
(43, 43, 1, NULL, 'true'),
(44, 44, 1, NULL, 'true'),
(45, 45, 1, NULL, 'true'),
(46, 46, 1, NULL, 'true'),
(47, 47, 1, NULL, 'true'),
(48, 48, 1, NULL, 'true'),
(49, 49, 1, NULL, 'true'),
(50, 50, 1, NULL, 'true'),
(51, 51, 1, NULL, 'true'),
(52, 52, 1, NULL, 'true'),
(53, 53, 1, NULL, 'true'),
(54, 54, 1, NULL, 'true'),
(55, 55, 1, NULL, 'true'),
(56, 56, 1, NULL, 'true'),
(57, 57, 1, NULL, 'true'),
(58, 58, 1, NULL, 'true'),
(59, 59, 1, NULL, 'true'),
(60, 60, 1, NULL, 'true'),
(61, 61, 1, NULL, 'true'),
(62, 62, 1, NULL, 'true'),
(63, 63, 2, NULL, 'true'),
(64, 64, 2, NULL, 'true'),
(65, 65, 1, NULL, 'true'),
(66, 66, 1, NULL, 'true'),
(67, 67, 1, NULL, 'true'),
(68, 68, 1, NULL, 'true'),
(69, 69, 1, NULL, 'true'),
(70, 70, 1, NULL, 'true'),
(71, 71, 1, NULL, 'true'),
(72, 72, 1, NULL, 'true'),
(73, 73, 1, NULL, 'true'),
(74, 74, 1, NULL, 'true'),
(75, 75, 1, NULL, 'true'),
(76, 76, 1, NULL, 'true'),
(77, 77, 1, NULL, 'true'),
(78, 78, 1, NULL, 'true'),
(79, 79, 1, NULL, 'true'),
(80, 80, 1, NULL, 'true'),
(81, 81, 1, NULL, 'true'),
(82, 82, 1, NULL, 'true'),
(83, 83, 1, NULL, 'true'),
(84, 84, 1, NULL, 'true'),
(85, 85, 1, NULL, 'true'),
(86, 86, 1, 0.5, 'true'),
(87, 87, 1, NULL, 'true'),
(88, 88, 1, NULL, 'true'),
(89, 89, 1, NULL, 'true'),
(90, 90, 1, NULL, 'true'),
(91, 91, 1, NULL, 'true'),
(92, 92, 1, NULL, 'true'),
(93, 93, 1, NULL, 'true'),
(94, 94, 1, NULL, 'true'),
(95, 95, 1, NULL, 'true'),
(96, 96, 1, NULL, 'true'),
(97, 97, 1, NULL, 'true'),
(98, 98, 1, NULL, 'true'),
(99, 99, 1, NULL, 'true'),
(100, 100, 1, NULL, 'true'),
(101, 101, 1, NULL, 'true'),
(102, 102, 1, NULL, 'true'),
(103, 103, 1, NULL, 'true'),
(104, 104, 1, NULL, 'true'),
(105, 105, 2, NULL, 'true'),
(106, 106, 2, NULL, 'true'),
(107, 107, 1, NULL, 'true'),
(108, 108, 1, 0.5, 'true'),
(109, 109, 1, NULL, 'true'),
(110, 110, 1, NULL, 'true'),
(111, 111, 1, NULL, 'true'),
(112, 112, 1, NULL, 'true'),
(113, 113, 1, NULL, 'true'),
(114, 114, 1, NULL, 'true'),
(115, 115, 1, NULL, 'true'),
(116, 116, 1, NULL, 'true'),
(117, 117, 1, NULL, 'true'),
(118, 118, 1, NULL, 'true'),
(119, 119, 1, NULL, 'true'),
(120, 120, 1, NULL, 'true'),
(121, 121, 1, NULL, 'true'),
(122, 122, 1, NULL, 'true'),
(123, 123, 1, NULL, 'true'),
(124, 124, 1, NULL, 'true'),
(125, 125, 1, NULL, 'true'),
(126, 126, 1, NULL, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_pig_details`
--

DROP TABLE IF EXISTS `tbl_operation_pig_details`;
CREATE TABLE IF NOT EXISTS `tbl_operation_pig_details` (
  `operation_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_id` int(11) DEFAULT NULL,
  `pig_id` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_details_id`),
  KEY `FK__tbl_operation` (`operation_id`),
  KEY `FK__tbl_pig` (`pig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_operation_type`
--

INSERT INTO `tbl_operation_type` (`operation_type_id`, `operation_name`, `is_exist`) VALUES
(1, 'Feeding', 'true'),
(2, 'Medicine Administration', 'true'),
(3, 'Deworming', 'true'),
(4, 'Vaccination', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pig`
--

DROP TABLE IF EXISTS `tbl_pig`;
CREATE TABLE IF NOT EXISTS `tbl_pig` (
  `pig_id` varchar(50) NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `breed_id` int(11) DEFAULT NULL,
  `pig_type` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `unit` varchar(50) DEFAULT 'kg',
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`pig_id`),
  KEY `FK__tbl_batch` (`batch_id`),
  KEY `FK__tbl_breed` (`breed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pig`
--

INSERT INTO `tbl_pig` (`pig_id`, `batch_id`, `breed_id`, `pig_type`, `birthdate`, `unit`, `is_exist`) VALUES
('pig_5f1hbvl92w', 1, 1, 'Sow', '2023-03-25', 'kg', 'true'),
('pig_6s6pjgm2ti', 1, 1, 'Sow', '2023-03-25', 'kg', 'true'),
('pig_7cs2j6iz0a', 2, 2, 'Piglet', '2023-03-25', 'kg', 'true'),
('pig_8m81ngv5k5', 1, 2, 'Boar', '2023-03-25', 'kg', 'true'),
('pig_aktuwtp4m4', 2, 2, 'Piglet', '2023-03-25', 'kg', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pig_history`
--

DROP TABLE IF EXISTS `tbl_pig_history`;
CREATE TABLE IF NOT EXISTS `tbl_pig_history` (
  `pig_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `pig_id` varchar(50) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `pig_tag` varchar(50) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `pig_status` varchar(50) DEFAULT 'active',
  `status` varchar(50) DEFAULT 'active',
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`pig_history_id`),
  KEY `FK_tbl_pig_history_tbl_pig` (`pig_id`),
  KEY `FK_tbl_pig_history_tbl_cage` (`cage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pig_history`
--

INSERT INTO `tbl_pig_history` (`pig_history_id`, `pig_id`, `cage_id`, `pig_tag`, `weight`, `pig_status`, `status`, `is_exist`) VALUES
(1, 'pig_5f1hbvl92w', 1, '12', 50, 'active', 'active', 'true'),
(2, 'pig_8m81ngv5k5', 2, 'SW-324', 50, 'active', 'active', 'true'),
(3, 'pig_6s6pjgm2ti', 3, '12', 50, 'active', 'active', 'true'),
(4, 'pig_aktuwtp4m4', 4, '142', NULL, 'active', 'active', 'true'),
(5, 'pig_7cs2j6iz0a', 4, 'SW-325', NULL, 'active', 'active', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_plan`
--

DROP TABLE IF EXISTS `tbl_plan`;
CREATE TABLE IF NOT EXISTS `tbl_plan` (
  `plan_id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(250) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_plan`
--

INSERT INTO `tbl_plan` (`plan_id`, `plan_name`, `is_exist`) VALUES
(1, 'Forrowing', 'false'),
(2, 'Weaner', 'true'),
(3, 'Grower', 'true'),
(4, 'Finisher', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_plan_details`
--

DROP TABLE IF EXISTS `tbl_plan_details`;
CREATE TABLE IF NOT EXISTS `tbl_plan_details` (
  `plan_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`plan_detail_id`),
  KEY `FK_tbl_plan_details_tbl_inventory` (`item_id`),
  KEY `FK_tbl_plan_details_tbl_plan` (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_plan_details`
--

INSERT INTO `tbl_plan_details` (`plan_detail_id`, `plan_id`, `day`, `item_id`, `type`, `is_exist`) VALUES
(2, 2, 1, 3, 'Feeding', 'true'),
(3, 2, 2, 1, 'feeding', 'true'),
(4, 2, 3, 3, 'feeding', 'true'),
(5, 2, 4, 3, 'feeding', 'true'),
(6, 2, 5, 1, 'feeding', 'true'),
(7, 2, 6, 1, 'feeding', 'true'),
(8, 3, 1, 3, 'feeding', 'true'),
(9, 4, 1, 1, 'feeding', 'true'),
(10, 4, 7, 1, 'feeding', 'true'),
(11, 2, 7, 1, 'feeding', 'true'),
(12, 2, 8, 1, 'feeding', 'true'),
(13, 2, 9, 1, 'feeding', 'true'),
(14, 3, 2, 1, 'feeding', 'true'),
(15, 4, 2, 1, 'feeding', 'true'),
(16, 4, 3, 1, 'feeding', 'true'),
(17, 4, 4, 1, 'feeding', 'true'),
(18, 4, 5, 1, 'feeding', 'true'),
(19, 4, 6, 1, 'feeding', 'true'),
(20, 2, 10, 1, 'feeding', 'true'),
(21, 2, 11, 1, 'feeding', 'true'),
(22, 2, 12, 1, 'feeding', 'true'),
(23, 2, 13, 1, 'feeding', 'true'),
(24, 2, 14, 1, 'feeding', 'true'),
(25, 2, 15, 1, 'feeding', 'true'),
(26, 2, 16, 1, 'feeding', 'true'),
(27, 2, 17, 3, 'feeding', 'true'),
(28, 2, 18, 1, 'feeding', 'true'),
(29, 2, 19, 1, 'feeding', 'true'),
(30, 2, 20, 1, 'feeding', 'true'),
(31, 2, 21, 1, 'feeding', 'true'),
(32, 2, 22, 3, 'feeding', 'true');

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quarantine_details`
--

DROP TABLE IF EXISTS `tbl_quarantine_details`;
CREATE TABLE IF NOT EXISTS `tbl_quarantine_details` (
  `quarantine_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `quarantine_id` int(11) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `pig_id` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`quarantine_details_id`),
  KEY `FK__tbl_quarantine` (`quarantine_id`),
  KEY `FK__tbl_cage_q` (`cage_id`),
  KEY `FK__tbl_pig_q` (`pig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock`
--

DROP TABLE IF EXISTS `tbl_stock`;
CREATE TABLE IF NOT EXISTS `tbl_stock` (
  `stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `total_stocks` double DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`stock_id`),
  KEY `FK_tbl_stock_tbl_inventory` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stock`
--

INSERT INTO `tbl_stock` (`stock_id`, `item_id`, `total_stocks`, `is_exist`) VALUES
(1, 1, 600, 'true'),
(2, 2, 0, 'true'),
(3, 3, 0, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_card`
--

DROP TABLE IF EXISTS `tbl_stock_card`;
CREATE TABLE IF NOT EXISTS `tbl_stock_card` (
  `stock_card_id` int(11) NOT NULL AUTO_INCREMENT,
  `opening_quantity` float DEFAULT NULL,
  `closing_quantity` float DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `status` varchar(50) DEFAULT 'active',
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`stock_card_id`),
  KEY `FK__tbl_stock` (`item_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stock_card`
--

INSERT INTO `tbl_stock_card` (`stock_card_id`, `opening_quantity`, `closing_quantity`, `item_id`, `transaction_date`, `status`, `is_exist`) VALUES
(1, 0, 28250, 1, '2023-03-27', 'active', 'true'),
(2, 28250, 350, 1, '2023-03-28', 'active', 'true'),
(3, 350, 100, 1, '2023-03-29', 'active', 'true'),
(4, 0, 1000, 2, '2023-04-04', 'active', 'true'),
(5, 100, 75, 1, '2023-04-05', 'active', 'true'),
(6, 75, 50, 1, '2023-04-07', 'active', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_card_details`
--

DROP TABLE IF EXISTS `tbl_stock_card_details`;
CREATE TABLE IF NOT EXISTS `tbl_stock_card_details` (
  `transaction_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_quantity` float DEFAULT NULL,
  `total_quantity` float DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `stock_card_id` int(11) DEFAULT NULL,
  `attachment` varchar(250) DEFAULT NULL,
  `remark` varchar(250) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`transaction_detail_id`),
  KEY `FK__tbl_stock_card` (`stock_card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stock_card_details`
--

INSERT INTO `tbl_stock_card_details` (`transaction_detail_id`, `transaction_quantity`, `total_quantity`, `type`, `expiration_date`, `stock_card_id`, `attachment`, `remark`, `is_exist`) VALUES
(1, 600, 600, 'IN', NULL, 1, 'public/attachments/4056288162.jpeg', NULL, 'true'),
(2, 500, 1100, 'IN', '2026-06-28', 1, 'public/attachments/6225601344.jpeg', NULL, 'true'),
(3, 25000, 26100, 'IN', NULL, 1, 'public/attachments/2665576484.jpeg', NULL, 'true'),
(4, 1000, 27100, 'IN', NULL, 1, 'public/attachments/7765054414.jpeg', NULL, 'true'),
(5, 1150, 28250, 'IN', NULL, 1, 'public/attachments/8335646424.jpeg', NULL, 'true'),
(6, 600, 28850, 'IN', NULL, 2, 'public/attachments/5883405818.jpeg', NULL, 'true'),
(7, 350, -28500, 'OUT', NULL, 2, NULL, 'Expired', 'true'),
(8, 29500, 1000, 'IN', NULL, 2, 'public/attachments/8513485116.jpeg', NULL, 'true'),
(9, 650, 350, 'OUT', NULL, 2, NULL, 'Damaged', 'true'),
(21, 250, 100, 'OUT', NULL, 3, NULL, 'Scheduled Activity', 'true'),
(22, 1000, 1000, 'IN', '2024-06-19', 4, 'public/attachments/1221684312.png', NULL, 'true'),
(23, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(24, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(25, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(26, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(27, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(28, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(29, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(30, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(31, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(32, 0, 100, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(33, 25, 75, 'OUT', NULL, 5, NULL, 'Scheduled Activity', 'true'),
(34, 25, 50, 'OUT', NULL, 6, NULL, 'Scheduled Activity', 'true');

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
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `password`, `first_name`, `middle_name`, `last_name`, `phone`, `job`, `is_exist`) VALUES
(1, 'ejayz', '$2b$10$LmRX4aBeWMTSIMQvVTi2Z.MS8h/YEQiVRgHaRsTVrj/shqfO01q1K', 'April Jude', 'Dapulang', 'Provido', '9082294975', 'owner', 'true'),
(2, 'ejayz', '$2b$10$HEZtqsnVID2bxNFWYbCwteio9z2Nm/gYP6yL9fi3p7GgRZC.f9lla', 'April Jude', '', 'Provido', '9082294975', 'worker', 'true'),
(3, 'ejayz', '$2b$10$mJT1xMlS4NTNjcgjj5gSdeGoa07XNN/4rNdzU/RlFvFXNq0pryOLO', 'April Jude', '', 'Provido', '9082294975', 'veterinarian', 'true');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_batch`
--
ALTER TABLE `tbl_batch`
  ADD CONSTRAINT `FKtblbatchtblpig` FOREIGN KEY (`boar_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKtblbatchtblpig2` FOREIGN KEY (`sow_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD CONSTRAINT `FKtblinventorytblcategory` FOREIGN KEY (`category_id`) REFERENCES `tbl_category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_operation`
--
ALTER TABLE `tbl_operation`
  ADD CONSTRAINT `FK_tbl_operation_tbl_batch` FOREIGN KEY (`batch_id`) REFERENCES `tbl_batch` (`batch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_operation_tbl_cage` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_operation_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_operation_item_details`
--
ALTER TABLE `tbl_operation_item_details`
  ADD CONSTRAINT `FKtblinventoryitem` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKtbloperationitem` FOREIGN KEY (`operation_id`) REFERENCES `tbl_operation` (`operation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_operation_pig_details`
--
ALTER TABLE `tbl_operation_pig_details`
  ADD CONSTRAINT `FKtbloperation` FOREIGN KEY (`operation_id`) REFERENCES `tbl_operation` (`operation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKtbloperationpigdetailstblpig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_pig`
--
ALTER TABLE `tbl_pig`
  ADD CONSTRAINT `FKtblbatch` FOREIGN KEY (`batch_id`) REFERENCES `tbl_batch` (`batch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKtblpigtbl_breed` FOREIGN KEY (`breed_id`) REFERENCES `tbl_breed` (`breed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_pig_history`
--
ALTER TABLE `tbl_pig_history`
  ADD CONSTRAINT `FK_tbl_pig_history_tbl_cage` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_pig_history_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_plan_details`
--
ALTER TABLE `tbl_plan_details`
  ADD CONSTRAINT `FK_tbl_plan_details_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_plan_details_tbl_plan` FOREIGN KEY (`plan_id`) REFERENCES `tbl_plan` (`plan_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_quarantine_details`
--
ALTER TABLE `tbl_quarantine_details`
  ADD CONSTRAINT `FKtblcageq` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKtblquarantine` FOREIGN KEY (`quarantine_id`) REFERENCES `tbl_quarantine` (`quarantine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKtblquarantinedetailstblpig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_stock`
--
ALTER TABLE `tbl_stock`
  ADD CONSTRAINT `FK_tbl_stock_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_stock_card`
--
ALTER TABLE `tbl_stock_card`
  ADD CONSTRAINT `FK_tbl_stock_card_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_stock_card_details`
--
ALTER TABLE `tbl_stock_card_details`
  ADD CONSTRAINT `FK__tbl_stock_card` FOREIGN KEY (`stock_card_id`) REFERENCES `tbl_stock_card` (`stock_card_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
