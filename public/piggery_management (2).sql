-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2023 at 10:46 PM
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
  KEY `FK_tbl_batch_tbl_pig` (`boar_id`),
  KEY `FK_tbl_batch_tbl_pig_2` (`sow_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_batch`
--

INSERT INTO `tbl_batch` (`batch_id`, `batch_name`, `boar_id`, `sow_id`, `batch_capacity`, `is_exist`) VALUES
(1, 'Breeder', NULL, NULL, NULL, 'true'),
(2, 'Batch 2', 'pig_ij1vvx523h3', 'pig_740yz8y5mv', 3, 'true');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_breed`
--

INSERT INTO `tbl_breed` (`breed_id`, `breed_name`, `is_exist`) VALUES
(1, 'duroc', 'true'),
(2, 'Large White', 'true'),
(3, 'Landrace', 'true');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_cage`
--

INSERT INTO `tbl_cage` (`cage_id`, `cage_name`, `cage_type`, `cage_capacity`, `current_caged`, `is_exist`, `is_full`) VALUES
(1, 'Cage 2', 'Group Housing', 10, 0, 'true', 'false'),
(2, 'Cage 1', 'Forrowing Crates', 1, 0, 'true', 'false'),
(3, 'Cage 4', 'Sow Stalls', 1, 0, 'true', 'false'),
(4, 'Cage 5', 'Individual Stalls', 1, 1, 'true', 'true'),
(5, 'Nursery 1', 'Nursery Pens', 20, 0, 'true', 'false'),
(6, 'Nursery 2', 'Nursery Pens', 20, 0, 'true', 'false'),
(7, 'Group Housing 1', 'Group Housing', 10, 0, 'true', 'false');

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
  `item_quantity` float DEFAULT NULL,
  `item_unit` varchar(50) DEFAULT NULL,
  `item_net_weight` float DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`item_id`),
  KEY `FK_ tbl_inventory_tbl_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_inventory`
--

INSERT INTO `tbl_inventory` (`item_id`, `item_name`, `category_id`, `item_description`, `item_quantity`, `item_unit`, `item_net_weight`, `is_exist`) VALUES
(1, 'BMeg 353', 2, '50Kg Bmeg Feeds Fattener', 50, 'sack', 50, 'false'),
(2, 'Bmeg 350', 1, '50Kg Bmeg Feeds Fattener', 250, 'sack', 50, 'true'),
(3, 'BMeg 353a', 2, '50Kg Bmeg Feeds Fattener', 250, 'kg', 50, 'true');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pig`
--

DROP TABLE IF EXISTS `tbl_pig`;
CREATE TABLE IF NOT EXISTS `tbl_pig` (
  `pig_id` varchar(50) NOT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `breed_id` int(11) DEFAULT NULL,
  `pig_tag` int(11) DEFAULT NULL,
  `pig_type` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `unit` varchar(50) DEFAULT 'kg',
  `status` varchar(50) DEFAULT 'active',
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`pig_id`),
  KEY `FK__tbl_cage` (`cage_id`),
  KEY `FK__tbl_batch` (`batch_id`),
  KEY `FK__tbl_breed` (`breed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pig`
--

INSERT INTO `tbl_pig` (`pig_id`, `cage_id`, `batch_id`, `breed_id`, `pig_tag`, `pig_type`, `birthdate`, `weight`, `unit`, `status`, `is_exist`) VALUES
('123456', 2, 1, NULL, 1, 'duroc', '2023-03-07', 12, 'kg', 'active', 'true'),
('pig_5dplbf3qq17', 4, 1, 1, 12, 'Sow', '2023-03-07', 50, 'kg', 'active', 'true'),
('pig_5txcbw8m8c', 4, 1, 1, 12, 'Sow', '2023-03-07', 50, 'kg', 'active', 'true'),
('pig_6v6sutqe1d8', 4, 1, 1, 12, 'Sow', '2023-03-07', 50, 'kg', 'active', 'true'),
('pig_740yz8y5mv', 4, 1, 1, 12, 'Sow', '2023-03-07', 50, 'kg', 'active', 'true'),
('pig_ij1vvx523h3', 4, 1, 1, 12, 'Boar', '2023-03-08', 50, 'kg', 'active', 'true'),
('pig_ijvvx5213h3', 4, 1, 1, 12, 'Sow', '2023-03-08', 50, 'kg', 'active', 'true'),
('pig_ijvvx523h13', 4, 1, 1, 12, 'Sow', '2023-03-08', 50, 'kg', 'active', 'true'),
('pig_se1d5xfyxx', 5, 2, 1, 0, 'Piglet', '2023-03-07', 5, 'kg', 'active', 'true'),
('pig_ukl8ew4b3d', 5, 2, 1, 0, 'Piglet', '2023-03-07', 6.5, 'kg', 'active', 'true'),
('pig_vme4znhgnw', 5, 2, 1, 0, 'Piglet', '2023-03-07', 4, 'kg', 'active', 'true');

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
-- Table structure for table `tbl_reorder`
--

DROP TABLE IF EXISTS `tbl_reorder`;
CREATE TABLE IF NOT EXISTS `tbl_reorder` (
  `reorder_id` int(11) NOT NULL AUTO_INCREMENT,
  `reorder_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT 'created',
  `attached_docs` varchar(250) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`reorder_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_reorder`
--

INSERT INTO `tbl_reorder` (`reorder_id`, `reorder_date`, `status`, `attached_docs`, `is_exist`) VALUES
(1, '2023-03-03 00:00:00', 'confirmed', NULL, 'true'),
(2, '2023-03-03 00:00:00', 'confirmed', NULL, 'true'),
(3, '2023-03-03 00:00:00', 'confirmed', NULL, 'true'),
(5, '2023-03-02 23:59:59', 'confirmed', 'public\\attatchments\\6540532231.png', 'true'),
(6, '2023-03-03 00:00:00', 'confirmed', 'public\\attatchments\\6015454845.png', 'true'),
(7, '2023-03-03 13:17:32', 'confirmed', 'public\\attatchments\\2465582838.png', 'true'),
(8, '2023-03-03 13:17:32', 'confirmed', 'public\\attatchments\\7148850454.png', 'true'),
(9, '2023-03-06 21:54:50', 'confirmed', 'public\\attatchments\\5647574073.png', 'true'),
(10, '2023-03-06 21:56:47', 'created', NULL, 'false');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reorder_details`
--

DROP TABLE IF EXISTS `tbl_reorder_details`;
CREATE TABLE IF NOT EXISTS `tbl_reorder_details` (
  `reorder_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `reorder_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `reorder_quantity` float DEFAULT NULL,
  `confirmed_quantity` float DEFAULT 0,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`reorder_details_id`),
  KEY `FK__tbl_reorder` (`reorder_id`),
  KEY `FK__tbl_inventory` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_reorder_details`
--

INSERT INTO `tbl_reorder_details` (`reorder_details_id`, `reorder_id`, `item_id`, `reorder_quantity`, `confirmed_quantity`, `is_exist`) VALUES
(1, 5, 2, 12, 12, 'true'),
(2, 5, 3, 12, 12, 'true'),
(3, 6, 2, 1, 1, 'true'),
(4, 6, 3, 1, 0, 'true'),
(5, 7, 2, 1, 0, 'true'),
(6, 7, 3, 1, 0, 'true'),
(7, 8, 2, 1, 12, 'true'),
(8, 8, 3, 1, 12, 'true'),
(9, 9, 2, 12, 5, 'true'),
(10, 9, 3, 12, 5, 'true'),
(11, 10, 2, 12, 0, 'true'),
(12, 10, 3, 12, 0, 'true');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `password`, `first_name`, `middle_name`, `last_name`, `phone`, `job`, `is_exist`) VALUES
(1, 'ejayz', '$2b$10$LmRX4aBeWMTSIMQvVTi2Z.MS8h/YEQiVRgHaRsTVrj/shqfO01q1K', 'April Jude', 'Dapulang', 'Provido', '9082294975', 'owner', 'true'),
(2, 'ejayz', '$2b$10$TUpha3DRSaP.WlqBp29TDe9YkeuwjeRq2hT80yAXpTMCFdQ1ufz.6', 'April Jude', '', 'Provido', '9082294975', 'worker', 'true');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_batch`
--
ALTER TABLE `tbl_batch`
  ADD CONSTRAINT `FK_tbl_batch_tbl_pig` FOREIGN KEY (`boar_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_batch_tbl_pig_2` FOREIGN KEY (`sow_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `FK_tbl_operation_pig_details_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `FK__tbl_quarantine` FOREIGN KEY (`quarantine_id`) REFERENCES `tbl_quarantine` (`quarantine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tbl_quarantine_details_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_reorder_details`
--
ALTER TABLE `tbl_reorder_details`
  ADD CONSTRAINT `FK__tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK__tbl_reorder` FOREIGN KEY (`reorder_id`) REFERENCES `tbl_reorder` (`reorder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
