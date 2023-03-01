-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 11:18 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_batch`
--

CREATE TABLE `tbl_batch` (
  `batch_id` int(11) NOT NULL,
  `batch_name` varchar(50) DEFAULT NULL,
  `boar_id` int(11) DEFAULT NULL,
  `sow_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_breed`
--

CREATE TABLE `tbl_breed` (
  `breed_id` int(11) NOT NULL,
  `breed_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cage`
--

CREATE TABLE `tbl_cage` (
  `cage_id` int(11) NOT NULL,
  `cage_name` varchar(50) DEFAULT NULL,
  `cage_type` varchar(50) DEFAULT NULL,
  `cage_capacity` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `is_full` varchar(50) DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

CREATE TABLE `tbl_inventory` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(50) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `item_description` varchar(250) DEFAULT NULL,
  `item_quantity` float DEFAULT NULL,
  `item_unit` varchar(50) DEFAULT NULL,
  `item_net_weight` float DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation`
--

CREATE TABLE `tbl_operation` (
  `operation_id` int(11) NOT NULL,
  `operation_type_id` int(11) DEFAULT NULL,
  `operation_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_item_details`
--

CREATE TABLE `tbl_operation_item_details` (
  `operation_item_details_id` int(11) NOT NULL,
  `operation_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_pig_details`
--

CREATE TABLE `tbl_operation_pig_details` (
  `operation_details_id` int(11) NOT NULL,
  `operation_id` int(11) DEFAULT NULL,
  `pig_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_operation_type`
--

CREATE TABLE `tbl_operation_type` (
  `operation_type_id` int(11) NOT NULL,
  `operation_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pig`
--

CREATE TABLE `tbl_pig` (
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
  `is_exist` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase_request`
--

CREATE TABLE `tbl_purchase_request` (
  `purchase_request_id` int(11) NOT NULL,
  `purchase_request_no` varchar(225) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `purchase_request_date` date DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase_request_details`
--

CREATE TABLE `tbl_purchase_request_details` (
  `purchase_request_details_id` int(11) NOT NULL,
  `purchase_request_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quarantine`
--

CREATE TABLE `tbl_quarantine` (
  `quarantine_id` int(11) NOT NULL,
  `remarks` longtext DEFAULT NULL,
  `quarantine_date` date DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quarantine_details`
--

CREATE TABLE `tbl_quarantine_details` (
  `quarantine_details_id` int(11) NOT NULL,
  `quarantine_id` int(11) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `pig_id` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `first_name` text DEFAULT NULL,
  `middle_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `job` text DEFAULT NULL,
  `is_exist` text DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_batch`
--
ALTER TABLE `tbl_batch`
  ADD PRIMARY KEY (`batch_id`),
  ADD KEY `FK_tbl_batch_tbl_pig` (`boar_id`),
  ADD KEY `FK_tbl_batch_tbl_pig_2` (`sow_id`);

--
-- Indexes for table `tbl_breed`
--
ALTER TABLE `tbl_breed`
  ADD PRIMARY KEY (`breed_id`);

--
-- Indexes for table `tbl_cage`
--
ALTER TABLE `tbl_cage`
  ADD PRIMARY KEY (`cage_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`category_id`) USING BTREE;

--
-- Indexes for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `FK_ tbl_inventory_tbl_category` (`category_id`);

--
-- Indexes for table `tbl_operation`
--
ALTER TABLE `tbl_operation`
  ADD PRIMARY KEY (`operation_id`);

--
-- Indexes for table `tbl_operation_item_details`
--
ALTER TABLE `tbl_operation_item_details`
  ADD PRIMARY KEY (`operation_item_details_id`),
  ADD KEY `FK__tbl_operation_item` (`operation_id`),
  ADD KEY `FK__ tbl_inventory_item` (`item_id`);

--
-- Indexes for table `tbl_operation_pig_details`
--
ALTER TABLE `tbl_operation_pig_details`
  ADD PRIMARY KEY (`operation_details_id`),
  ADD KEY `FK__tbl_operation` (`operation_id`),
  ADD KEY `FK__tbl_pig` (`pig_id`);

--
-- Indexes for table `tbl_operation_type`
--
ALTER TABLE `tbl_operation_type`
  ADD PRIMARY KEY (`operation_type_id`);

--
-- Indexes for table `tbl_pig`
--
ALTER TABLE `tbl_pig`
  ADD PRIMARY KEY (`pig_id`),
  ADD KEY `FK__tbl_cage` (`cage_id`),
  ADD KEY `FK__tbl_batch` (`batch_id`),
  ADD KEY `FK__tbl_breed` (`breed_id`);

--
-- Indexes for table `tbl_purchase_request`
--
ALTER TABLE `tbl_purchase_request`
  ADD PRIMARY KEY (`purchase_request_id`),
  ADD KEY `FK_tbl_purchase_request_tbl_category` (`category_id`);

--
-- Indexes for table `tbl_purchase_request_details`
--
ALTER TABLE `tbl_purchase_request_details`
  ADD PRIMARY KEY (`purchase_request_details_id`),
  ADD KEY `FK_tbl_purchase_request_details_tbl_purchase_request` (`purchase_request_id`),
  ADD KEY `FK_tbl_purchase_request_details_ tbl_inventory` (`item_id`);

--
-- Indexes for table `tbl_quarantine`
--
ALTER TABLE `tbl_quarantine`
  ADD PRIMARY KEY (`quarantine_id`);

--
-- Indexes for table `tbl_quarantine_details`
--
ALTER TABLE `tbl_quarantine_details`
  ADD PRIMARY KEY (`quarantine_details_id`),
  ADD KEY `FK__tbl_quarantine` (`quarantine_id`),
  ADD KEY `FK__tbl_cage_q` (`cage_id`),
  ADD KEY `FK__tbl_pig_q` (`pig_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_batch`
--
ALTER TABLE `tbl_batch`
  MODIFY `batch_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_breed`
--
ALTER TABLE `tbl_breed`
  MODIFY `breed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_cage`
--
ALTER TABLE `tbl_cage`
  MODIFY `cage_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_operation`
--
ALTER TABLE `tbl_operation`
  MODIFY `operation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_operation_item_details`
--
ALTER TABLE `tbl_operation_item_details`
  MODIFY `operation_item_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_operation_pig_details`
--
ALTER TABLE `tbl_operation_pig_details`
  MODIFY `operation_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_operation_type`
--
ALTER TABLE `tbl_operation_type`
  MODIFY `operation_type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_purchase_request`
--
ALTER TABLE `tbl_purchase_request`
  MODIFY `purchase_request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_purchase_request_details`
--
ALTER TABLE `tbl_purchase_request_details`
  MODIFY `purchase_request_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_quarantine`
--
ALTER TABLE `tbl_quarantine`
  MODIFY `quarantine_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_quarantine_details`
--
ALTER TABLE `tbl_quarantine_details`
  MODIFY `quarantine_details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
