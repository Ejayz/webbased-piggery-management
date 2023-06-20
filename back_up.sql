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
    DROP DATABASE IF EXISTS `piggery_management`;
    CREATE DATABASE IF NOT EXISTS `piggery_management` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    USE `piggery_management`;
     # ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_batch
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_batch`;
CREATE TABLE `tbl_batch` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `boar_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sow_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `batch_capacity` int DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  `batch_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `FKtblbatchtblpig` (`boar_id`),
  KEY `FKtblbatchtblpig2` (`sow_id`),
  KEY `FK_tbl_batch_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_batch_tbl_pig` FOREIGN KEY (`boar_id`) REFERENCES `tbl_pig` (`pig_id`),
  CONSTRAINT `FK_tbl_batch_tbl_pig_2` FOREIGN KEY (`sow_id`) REFERENCES `tbl_pig` (`pig_id`),
  CONSTRAINT `FK_tbl_batch_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_breed
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_breed`;
CREATE TABLE `tbl_breed` (
  `breed_id` int NOT NULL AUTO_INCREMENT,
  `breed_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`breed_id`),
  KEY `FK_tbl_breed_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_breed_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_cage
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_cage`;
CREATE TABLE `tbl_cage` (
  `cage_id` int NOT NULL AUTO_INCREMENT,
  `cage_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cage_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cage_capacity` int DEFAULT NULL,
  `current_caged` int DEFAULT '0',
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `is_full` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'false',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`cage_id`),
  KEY `FK_tbl_cage_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_cage_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 26 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE `tbl_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_inventory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_inventory`;
CREATE TABLE `tbl_inventory` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `item_description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `item_unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `item_net_weight` float DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  `item_net_weight_unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `FK_ tbl_inventory_tbl_category` (`category_id`),
  KEY `FK_tbl_inventory_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_inventory_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  CONSTRAINT `FKtblinventorytblcategory` FOREIGN KEY (`category_id`) REFERENCES `tbl_category` (`category_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_operation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_operation`;
CREATE TABLE `tbl_operation` (
  `operation_id` int NOT NULL AUTO_INCREMENT,
  `operation_type_id` int DEFAULT NULL,
  `operation_date` datetime DEFAULT NULL,
  `pig_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `batch_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `am_pm` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_patient` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`operation_id`),
  KEY `FK_tbl_operation_tbl_pig` (`pig_id`),
  KEY `FK_tbl_operation_tbl_batch` (`batch_id`),
  KEY `FK_tbl_operation_tbl_cage` (`cage_id`),
  KEY `FK_tbl_operation_tbl_operation_type` (`operation_type_id`),
  KEY `FK_tbl_operation_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_operation_tbl_batch` FOREIGN KEY (`batch_id`) REFERENCES `tbl_batch` (`batch_id`),
  CONSTRAINT `FK_tbl_operation_tbl_cage` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`),
  CONSTRAINT `FK_tbl_operation_tbl_operation_type` FOREIGN KEY (`operation_type_id`) REFERENCES `tbl_operation_type` (`operation_type_id`),
  CONSTRAINT `FK_tbl_operation_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`),
  CONSTRAINT `FK_tbl_operation_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 364 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_operation_item_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_operation_item_details`;
CREATE TABLE `tbl_operation_item_details` (
  `operation_item_details_id` int NOT NULL AUTO_INCREMENT,
  `operation_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  PRIMARY KEY (`operation_item_details_id`),
  KEY `FK__tbl_operation_item` (`operation_id`),
  KEY `FK__ tbl_inventory_item` (`item_id`),
  CONSTRAINT `FKtblinventoryitem` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`),
  CONSTRAINT `FKtbloperationitem` FOREIGN KEY (`operation_id`) REFERENCES `tbl_operation` (`operation_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 377 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_operation_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_operation_type`;
CREATE TABLE `tbl_operation_type` (
  `operation_type_id` int NOT NULL AUTO_INCREMENT,
  `operation_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  PRIMARY KEY (`operation_type_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_pig
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_pig`;
CREATE TABLE `tbl_pig` (
  `pig_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `breed_id` int DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'kg',
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  `selectable` int DEFAULT '0',
  PRIMARY KEY (`pig_id`),
  KEY `FK__tbl_breed` (`breed_id`),
  KEY `FK_tbl_pig_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_pig_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  CONSTRAINT `FKtblpigtbl_breed` FOREIGN KEY (`breed_id`) REFERENCES `tbl_breed` (`breed_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_pig_history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_pig_history`;
CREATE TABLE `tbl_pig_history` (
  `pig_history_id` int NOT NULL AUTO_INCREMENT,
  `pig_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `pig_tag` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `pig_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `remarks` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pig_history_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `pig_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `batch_id` int DEFAULT NULL,
  PRIMARY KEY (`pig_history_id`),
  KEY `FK_tbl_pig_history_tbl_pig` (`pig_id`),
  KEY `FK_tbl_pig_history_tbl_cage` (`cage_id`),
  KEY `FK_tbl_pig_history_tbl_users` (`user_id`),
  KEY `FK_tbl_pig_history_tbl_batch` (`batch_id`),
  CONSTRAINT `FK_tbl_pig_history_tbl_batch` FOREIGN KEY (`batch_id`) REFERENCES `tbl_batch` (`batch_id`),
  CONSTRAINT `FK_tbl_pig_history_tbl_cage` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`),
  CONSTRAINT `FK_tbl_pig_history_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`),
  CONSTRAINT `FK_tbl_pig_history_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 65 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_plan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_plan`;
CREATE TABLE `tbl_plan` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  PRIMARY KEY (`plan_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_plan_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_plan_details`;
CREATE TABLE `tbl_plan_details` (
  `plan_detail_id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int DEFAULT NULL,
  `day` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`plan_detail_id`),
  KEY `FK_tbl_plan_details_tbl_inventory` (`item_id`),
  KEY `FK_tbl_plan_details_tbl_plan` (`plan_id`),
  KEY `FK_tbl_plan_details_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_plan_details_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`),
  CONSTRAINT `FK_tbl_plan_details_tbl_plan` FOREIGN KEY (`plan_id`) REFERENCES `tbl_plan` (`plan_id`),
  CONSTRAINT `FK_tbl_plan_details_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 171 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_quarantine
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_quarantine`;
CREATE TABLE `tbl_quarantine` (
  `quarantine_id` int NOT NULL AUTO_INCREMENT,
  `remarks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `quarantine_date` date DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`quarantine_id`),
  KEY `FK_tbl_quarantine_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_quarantine_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_quarantine_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_quarantine_details`;
CREATE TABLE `tbl_quarantine_details` (
  `quarantine_details_id` int NOT NULL AUTO_INCREMENT,
  `quarantine_id` int DEFAULT NULL,
  `cage_id` int DEFAULT NULL,
  `pig_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  PRIMARY KEY (`quarantine_details_id`),
  KEY `FK__tbl_quarantine` (`quarantine_id`),
  KEY `FK__tbl_cage_q` (`cage_id`),
  KEY `FK__tbl_pig_q` (`pig_id`),
  CONSTRAINT `FKtblcageq` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`),
  CONSTRAINT `FKtblquarantine` FOREIGN KEY (`quarantine_id`) REFERENCES `tbl_quarantine` (`quarantine_id`),
  CONSTRAINT `FKtblquarantinedetailstblpig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_restock
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_restock`;
CREATE TABLE `tbl_restock` (
  `restock_id` int NOT NULL AUTO_INCREMENT,
  `restock_date` date DEFAULT NULL,
  `attachment` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`restock_id`),
  KEY `FK_tbl_restock_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_restock_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_restock_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_restock_details`;
CREATE TABLE `tbl_restock_details` (
  `restock_details_id` int NOT NULL AUTO_INCREMENT,
  `restock_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  PRIMARY KEY (`restock_details_id`),
  KEY `FK_tbl_restock_details_tbl_inventory` (`item_id`),
  KEY `FK_tbl_restock_details_tbl_restock` (`restock_id`),
  CONSTRAINT `FK_tbl_restock_details_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`),
  CONSTRAINT `FK_tbl_restock_details_tbl_restock` FOREIGN KEY (`restock_id`) REFERENCES `tbl_restock` (`restock_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_stock_card
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_stock_card`;
CREATE TABLE `tbl_stock_card` (
  `stock_card_id` int NOT NULL AUTO_INCREMENT,
  `opening_quantity` float DEFAULT NULL,
  `closing_quantity` float DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'active',
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`stock_card_id`),
  KEY `FK__tbl_stock` (`item_id`) USING BTREE,
  KEY `FK_tbl_stock_card_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_stock_card_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`),
  CONSTRAINT `FK_tbl_stock_card_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 69 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_stock_card_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_stock_card_details`;
CREATE TABLE `tbl_stock_card_details` (
  `transaction_detail_id` int NOT NULL AUTO_INCREMENT,
  `transaction_quantity` float DEFAULT NULL,
  `total_quantity` float DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `stock_card_id` int DEFAULT NULL,
  `attachment` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_detail_id`),
  KEY `FK__tbl_stock_card` (`stock_card_id`),
  KEY `FK_tbl_stock_card_details_tbl_users` (`user_id`),
  CONSTRAINT `FK__tbl_stock_card` FOREIGN KEY (`stock_card_id`) REFERENCES `tbl_stock_card` (`stock_card_id`),
  CONSTRAINT `FK_tbl_stock_card_details_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 296 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `first_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `middle_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `last_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `phone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `job` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `is_exist` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'true',
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci; # ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_batch
# ------------------------------------------------------------

INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (1, 'Batch 1', NULL, NULL, 3, 'true', 5, 'breeder');
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (
    2,
    'Batch 2',
    'Breeder2_Batch1',
    'Breeder0_Batch1',
    8,
    'true',
    5,
    'piglet'
  );
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (
    3,
    'Batch 3',
    'Breeder3_Batch1',
    'Breeder1_Batch1',
    9,
    'true',
    5,
    'piglet'
  );
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (4, 'Batch 4', NULL, NULL, 3, 'true', 2, 'breeder');
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (5, 'Batch 5', NULL, NULL, 2, 'true', 2, 'breeder');
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (
    6,
    'Batch 6',
    'Breeder1_Batch1',
    'Breeder0_Batch1',
    3,
    'true',
    2,
    'Piglet'
  );
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (7, 'Batch 7', NULL, NULL, 1, 'true', 2, 'breeder');
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (8, 'Batch 8', NULL, NULL, 2, 'true', 2, 'breeder');
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (9, 'Batch 9', NULL, NULL, 2, 'true', 2, 'breeder');
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`,
    `batch_type`
  )
VALUES
  (
    10,
    'Batch 10',
    'Breeder2_Batch1',
    'Breeder0_Batch8',
    3,
    'true',
    2,
    'Piglet'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_breed
# ------------------------------------------------------------

INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (1, 'Duroc', 'true', 3);
INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (2, 'Landrace', 'true', 3);
INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (3, 'Berk Shir', 'false', 3);
INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (4, 'Hampshire', 'true', 6);
INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (5, 'Hereford Hog', 'true', 8);
INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (6, 'Chinese Swine', 'true', 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_cage
# ------------------------------------------------------------

INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    1,
    'Individual Stall 1',
    'Individual Stalls',
    1,
    0,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    2,
    'Individual Stall 2',
    'Individual Stalls',
    1,
    0,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    3,
    'Individual Stall 3',
    'Individual Stalls',
    1,
    0,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    4,
    'Individual Stall 4',
    'Individual Stalls',
    1,
    0,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    5,
    'Individual Stall 5',
    'Individual Stalls',
    1,
    0,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    6,
    'Individual Stall 6',
    'Individual Stalls',
    1,
    0,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    7,
    'Individual Stall 7',
    'Individual Stalls',
    1,
    0,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    8,
    'Individual Stall 8',
    'Individual Stalls',
    1,
    1,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    9,
    'Individual Stall 9',
    'Individual Stalls',
    1,
    1,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    10,
    'Individual Stall 10',
    'Individual Stalls',
    1,
    1,
    'true',
    'true',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    11,
    'Individual Stall 11',
    'Individual Stalls',
    1,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    12,
    'Individual Stall 12',
    'Individual Stalls',
    1,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    13,
    'Individual Stall 13',
    'Individual Stalls',
    1,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    14,
    'Group Housing 1',
    'Group Housing',
    10,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    15,
    'Group Housing 2',
    'Group Housing',
    10,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    16,
    'Group Housing 3',
    'Group Housing',
    10,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    17,
    'Grow Finishing Housing 1',
    'Grow Finishing Housing',
    10,
    6,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    18,
    'Grow Housing Finishing 2',
    'Grow Finishing Housing',
    10,
    4,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    19,
    'Nursery 1',
    'Nursery Pens',
    20,
    1,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    20,
    'Nursery 2',
    'Nursery Pens',
    20,
    1,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    21,
    'Quarantine 1',
    'Quarantine Cage',
    10,
    1,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    22,
    'Quarantine 2',
    'Quarantine Cage',
    10,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    23,
    'Quarantine 3',
    'Quarantine Cage',
    10,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    24,
    'Quarantine 4',
    'Quarantine Cage',
    10,
    0,
    'true',
    'false',
    5
  );
INSERT INTO
  `tbl_cage` (
    `cage_id`,
    `cage_name`,
    `cage_type`,
    `cage_capacity`,
    `current_caged`,
    `is_exist`,
    `is_full`,
    `user_id`
  )
VALUES
  (
    25,
    'tora cage',
    'Forrowing Crates',
    90,
    0,
    'false',
    'false',
    7
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_category
# ------------------------------------------------------------

INSERT INTO
  `tbl_category` (`category_id`, `category_name`, `is_exist`)
VALUES
  (1, 'Feeds', 'true');
INSERT INTO
  `tbl_category` (`category_id`, `category_name`, `is_exist`)
VALUES
  (2, 'Medicine', 'true');
INSERT INTO
  `tbl_category` (`category_id`, `category_name`, `is_exist`)
VALUES
  (3, 'Vitamins', 'true');
INSERT INTO
  `tbl_category` (`category_id`, `category_name`, `is_exist`)
VALUES
  (4, 'Utilities', 'true');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_inventory
# ------------------------------------------------------------

INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    1,
    'Revmet Hog Booster',
    1,
    'Revmet Booster Feeds',
    'Sacks',
    50,
    'true',
    5,
    'kg'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    2,
    'Ivermictin',
    2,
    'Deworming injectable medicine for pigs',
    'Viel',
    100,
    'true',
    5,
    'ml'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    3,
    '2.5 Inch Needles',
    4,
    '10 ML syringe',
    'Pieces',
    1,
    'false',
    5,
    'pcs'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    4,
    'Bexan SP',
    3,
    'Vitamin B-Complex',
    'Viel',
    50,
    'false',
    5,
    'ml'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    5,
    'Jectran Premium',
    3,
    'Jectran Premium Iron',
    'Viel',
    100,
    'true',
    5,
    'ml'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    6,
    'Bmeg Pre Starte',
    1,
    '50kg Pre starter',
    'Sacks',
    50,
    'true',
    5,
    'kg'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    7,
    'Revmet Hog Prestarter',
    1,
    'Revemet Pre Starter feeds',
    'Sacks',
    50,
    'true',
    5,
    'kg'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    8,
    'SUIGEN ORDC',
    2,
    'Multi-Respiratory disease for swine',
    'Viel',
    100,
    'true',
    5,
    'ml'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    9,
    'Trimethoprim+Sodium Sulfadiazine',
    2,
    'TMPS 48% Anti bacterial Water soluble powder.',
    'Sacks',
    1,
    'true',
    5,
    'kg'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    10,
    'VIEPro Premium Fattening Pig Feed ',
    1,
    'VIEPro Premium Fattening Pig Feed – Starter – 50kg.',
    'Sacks',
    50,
    'true',
    5,
    'kg'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    11,
    'Myco Gard',
    2,
    'Circo/Mycogard provides one-dose combination of porcine circovirus (PCV) Type 2b vaccine and Mycoplasma hyopneumoniae bacterin for vaccination of swine.',
    'Viel',
    50,
    'true',
    2,
    'ml'
  );
INSERT INTO
  `tbl_inventory` (
    `item_id`,
    `item_name`,
    `category_id`,
    `item_description`,
    `item_unit`,
    `item_net_weight`,
    `is_exist`,
    `user_id`,
    `item_net_weight_unit`
  )
VALUES
  (
    12,
    'BMEG 3000',
    1,
    'VIEPro Premium Fattening Pig Feed – Starter – 50kg.',
    'Sacks',
    12,
    'true',
    2,
    'kg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_operation
# ------------------------------------------------------------

INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    1,
    1,
    '2023-05-07 10:30:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'AM',
    5,
    2,
    'sdfsdf',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    2,
    1,
    '2023-05-08 12:14:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'PM',
    5,
    2,
    'sdfsdf',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    3,
    1,
    '2023-05-08 10:30:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'AM',
    5,
    2,
    'asdas',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    4,
    1,
    '2023-05-08 10:30:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'PM',
    5,
    2,
    'asdas',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    5,
    2,
    '2023-05-08 12:14:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'false',
    NULL,
    1,
    2,
    '123',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    6,
    2,
    '2023-05-07 08:04:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    5,
    2,
    '12312312',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    7,
    2,
    '2023-05-07 10:11:00',
    NULL,
    2,
    NULL,
    'overdue',
    'true',
    NULL,
    6,
    2,
    'fgdfgfdg',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    8,
    2,
    '2023-05-07 11:14:00',
    NULL,
    2,
    NULL,
    'confirmed',
    'true',
    NULL,
    6,
    2,
    '123',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    9,
    2,
    '2023-05-07 10:14:00',
    NULL,
    2,
    NULL,
    'confirmed',
    'true',
    NULL,
    6,
    2,
    'jnjk',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    10,
    2,
    '2023-05-07 11:17:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    5,
    2,
    '12',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    11,
    2,
    '2023-05-07 11:29:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    NULL,
    5,
    2,
    '123',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    12,
    2,
    '2023-05-22 10:50:00',
    NULL,
    NULL,
    16,
    'canceled',
    'true',
    NULL,
    10,
    2,
    '12',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    13,
    2,
    '2023-05-07 11:39:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    NULL,
    5,
    2,
    '12',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    14,
    1,
    '2023-05-08 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    15,
    1,
    '2023-05-08 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    16,
    1,
    '2023-05-09 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    17,
    1,
    '2023-05-09 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    18,
    1,
    '2023-05-10 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    19,
    1,
    '2023-05-10 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    20,
    1,
    '2023-05-11 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    21,
    1,
    '2023-05-11 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    22,
    1,
    '2023-05-12 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    23,
    1,
    '2023-05-12 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    24,
    1,
    '2023-05-13 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    25,
    1,
    '2023-05-13 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    26,
    1,
    '2023-05-14 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    27,
    1,
    '2023-05-14 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    28,
    1,
    '2023-05-15 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    29,
    1,
    '2023-05-15 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    30,
    1,
    '2023-05-16 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    31,
    1,
    '2023-05-16 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    32,
    1,
    '2023-05-17 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    33,
    1,
    '2023-05-17 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    34,
    1,
    '2023-05-18 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    35,
    1,
    '2023-05-18 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    36,
    1,
    '2023-05-19 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    37,
    1,
    '2023-05-19 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    38,
    1,
    '2023-05-20 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    39,
    1,
    '2023-05-20 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    40,
    1,
    '2023-05-21 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    41,
    1,
    '2023-05-21 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    42,
    1,
    '2023-05-22 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    43,
    1,
    '2023-05-22 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    44,
    1,
    '2023-05-23 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    45,
    1,
    '2023-05-23 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    46,
    1,
    '2023-05-24 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    47,
    1,
    '2023-05-24 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    48,
    1,
    '2023-05-25 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    49,
    1,
    '2023-05-25 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    50,
    1,
    '2023-05-26 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    51,
    1,
    '2023-05-26 21:00:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    52,
    1,
    '2023-05-27 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    53,
    1,
    '2023-05-27 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    54,
    1,
    '2023-05-28 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    55,
    1,
    '2023-05-28 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    56,
    1,
    '2023-05-29 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    57,
    1,
    '2023-05-29 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    58,
    1,
    '2023-05-30 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    59,
    1,
    '2023-05-30 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    60,
    1,
    '2023-05-31 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    61,
    1,
    '2023-05-31 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    62,
    1,
    '2023-06-01 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    63,
    1,
    '2023-06-01 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    64,
    1,
    '2023-06-02 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    65,
    1,
    '2023-06-02 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    66,
    1,
    '2023-06-03 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    67,
    1,
    '2023-06-03 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    68,
    1,
    '2023-06-04 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    69,
    1,
    '2023-06-04 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    70,
    1,
    '2023-06-05 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    71,
    1,
    '2023-06-05 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    72,
    1,
    '2023-06-06 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    73,
    1,
    '2023-06-06 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    74,
    1,
    '2023-06-07 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    75,
    1,
    '2023-06-07 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    76,
    1,
    '2023-06-08 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    77,
    1,
    '2023-06-08 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    78,
    1,
    '2023-06-09 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    79,
    1,
    '2023-06-09 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    80,
    1,
    '2023-06-10 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    81,
    1,
    '2023-06-10 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    82,
    1,
    '2023-06-11 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    83,
    1,
    '2023-06-11 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    84,
    1,
    '2023-06-12 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    85,
    1,
    '2023-06-12 21:00:00',
    NULL,
    1,
    NULL,
    'overdue',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    86,
    1,
    '2023-06-13 21:00:00',
    NULL,
    1,
    NULL,
    'today',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    87,
    1,
    '2023-06-13 21:00:00',
    NULL,
    1,
    NULL,
    'today',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    88,
    1,
    '2023-06-14 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    89,
    1,
    '2023-06-14 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    90,
    1,
    '2023-06-15 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    91,
    1,
    '2023-06-15 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    92,
    1,
    '2023-06-16 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    93,
    1,
    '2023-06-16 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    94,
    1,
    '2023-06-17 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    95,
    1,
    '2023-06-17 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    96,
    1,
    '2023-06-18 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    97,
    1,
    '2023-06-18 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    98,
    1,
    '2023-06-19 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    99,
    1,
    '2023-06-19 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    100,
    1,
    '2023-06-20 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    101,
    1,
    '2023-06-20 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    102,
    1,
    '2023-06-21 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    103,
    1,
    '2023-06-21 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    104,
    1,
    '2023-06-22 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    105,
    1,
    '2023-06-22 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    106,
    1,
    '2023-06-23 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    107,
    1,
    '2023-06-23 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    108,
    1,
    '2023-06-24 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    109,
    1,
    '2023-06-24 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    110,
    1,
    '2023-06-25 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    111,
    1,
    '2023-06-25 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    112,
    1,
    '2023-06-26 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    113,
    1,
    '2023-06-26 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    114,
    1,
    '2023-06-27 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    115,
    1,
    '2023-06-27 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    116,
    1,
    '2023-06-28 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    117,
    1,
    '2023-06-28 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    118,
    1,
    '2023-06-29 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    119,
    1,
    '2023-06-29 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    120,
    1,
    '2023-06-30 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    121,
    1,
    '2023-06-30 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    122,
    1,
    '2023-07-01 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    123,
    1,
    '2023-07-01 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    124,
    1,
    '2023-07-02 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'AM',
    5,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    125,
    1,
    '2023-07-02 21:00:00',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    'PM',
    5,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    126,
    1,
    '2023-05-09 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'confirmed',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    127,
    1,
    '2023-05-09 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'confirmed',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    128,
    1,
    '2023-05-10 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'confirmed',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    129,
    1,
    '2023-05-10 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'confirmed',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    130,
    1,
    '2023-05-11 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    131,
    1,
    '2023-05-11 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    132,
    1,
    '2023-05-12 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    133,
    1,
    '2023-05-12 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    134,
    1,
    '2023-05-13 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    135,
    1,
    '2023-05-13 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    136,
    1,
    '2023-05-14 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    137,
    1,
    '2023-05-14 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    138,
    1,
    '2023-05-15 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    139,
    1,
    '2023-05-15 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    140,
    1,
    '2023-05-16 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    141,
    1,
    '2023-05-16 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    142,
    1,
    '2023-05-17 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    143,
    1,
    '2023-05-17 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    144,
    1,
    '2023-05-18 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    145,
    1,
    '2023-05-18 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    146,
    1,
    '2023-05-19 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    147,
    1,
    '2023-05-19 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    148,
    1,
    '2023-05-20 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    149,
    1,
    '2023-05-20 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    150,
    1,
    '2023-05-21 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    151,
    1,
    '2023-05-21 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    152,
    1,
    '2023-05-22 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    153,
    1,
    '2023-05-22 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    154,
    1,
    '2023-05-23 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    155,
    1,
    '2023-05-23 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    156,
    1,
    '2023-05-24 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    157,
    1,
    '2023-05-24 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    158,
    1,
    '2023-05-25 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    159,
    1,
    '2023-05-25 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    160,
    1,
    '2023-05-26 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    161,
    1,
    '2023-05-26 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    162,
    1,
    '2023-05-27 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    163,
    1,
    '2023-05-27 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    164,
    1,
    '2023-05-28 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    165,
    1,
    '2023-05-28 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    166,
    1,
    '2023-05-29 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    167,
    1,
    '2023-05-29 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    168,
    1,
    '2023-05-30 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    169,
    1,
    '2023-05-30 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    170,
    1,
    '2023-05-31 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    171,
    1,
    '2023-05-31 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    172,
    1,
    '2023-06-01 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    173,
    1,
    '2023-06-01 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    174,
    1,
    '2023-06-02 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    175,
    1,
    '2023-06-02 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    176,
    1,
    '2023-06-03 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    177,
    1,
    '2023-06-03 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    178,
    1,
    '2023-06-04 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    179,
    1,
    '2023-06-04 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    180,
    1,
    '2023-06-05 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    181,
    1,
    '2023-06-05 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    182,
    1,
    '2023-06-06 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    183,
    1,
    '2023-06-06 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    184,
    1,
    '2023-06-07 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    185,
    1,
    '2023-06-07 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    186,
    1,
    '2023-06-08 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    187,
    1,
    '2023-06-08 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    188,
    1,
    '2023-06-09 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    189,
    1,
    '2023-06-09 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    190,
    1,
    '2023-06-10 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    191,
    1,
    '2023-06-10 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    192,
    1,
    '2023-06-11 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    193,
    1,
    '2023-06-11 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    194,
    1,
    '2023-06-12 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    195,
    1,
    '2023-06-12 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    196,
    1,
    '2023-06-13 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'today',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    197,
    1,
    '2023-06-13 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'today',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    198,
    1,
    '2023-06-14 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    199,
    1,
    '2023-06-14 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    200,
    1,
    '2023-06-15 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    201,
    1,
    '2023-06-15 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    202,
    1,
    '2023-06-16 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    203,
    1,
    '2023-06-16 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    204,
    1,
    '2023-06-17 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    205,
    1,
    '2023-06-17 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    206,
    1,
    '2023-06-18 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    207,
    1,
    '2023-06-18 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    208,
    1,
    '2023-06-19 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    209,
    1,
    '2023-06-19 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    210,
    1,
    '2023-06-20 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    211,
    1,
    '2023-06-20 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    212,
    1,
    '2023-06-21 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    213,
    1,
    '2023-06-21 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    214,
    1,
    '2023-06-22 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    215,
    1,
    '2023-06-22 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    216,
    1,
    '2023-06-23 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    217,
    1,
    '2023-06-23 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    218,
    1,
    '2023-06-24 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    219,
    1,
    '2023-06-24 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    220,
    1,
    '2023-06-25 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    221,
    1,
    '2023-06-25 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    222,
    1,
    '2023-06-26 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    223,
    1,
    '2023-06-26 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    224,
    1,
    '2023-06-27 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    225,
    1,
    '2023-06-27 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    226,
    1,
    '2023-06-28 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    227,
    1,
    '2023-06-28 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    228,
    1,
    '2023-06-29 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    229,
    1,
    '2023-06-29 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    230,
    1,
    '2023-06-30 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    231,
    1,
    '2023-06-30 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    232,
    1,
    '2023-07-01 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    233,
    1,
    '2023-07-01 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    234,
    1,
    '2023-07-02 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    235,
    1,
    '2023-07-02 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    236,
    1,
    '2023-07-03 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    237,
    1,
    '2023-07-03 21:00:00',
    'Breeder2_Batch1',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    238,
    2,
    '2023-05-08 13:47:00',
    'Piglet2_Batch2',
    NULL,
    NULL,
    'overdue',
    'true',
    NULL,
    1,
    2,
    'Administering medicine',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    239,
    3,
    '2023-05-08 13:49:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    NULL,
    1,
    2,
    'Deworming ',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    240,
    1,
    '2023-05-09 21:00:00',
    NULL,
    NULL,
    1,
    'confirmed',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    241,
    1,
    '2023-05-09 21:00:00',
    NULL,
    NULL,
    1,
    'confirmed',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    242,
    1,
    '2023-05-10 21:00:00',
    NULL,
    NULL,
    1,
    'confirmed',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    243,
    1,
    '2023-05-10 21:00:00',
    NULL,
    NULL,
    1,
    'confirmed',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    244,
    1,
    '2023-05-11 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    245,
    1,
    '2023-05-11 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    246,
    1,
    '2023-05-12 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    247,
    1,
    '2023-05-12 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    248,
    1,
    '2023-05-13 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    249,
    1,
    '2023-05-13 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    250,
    1,
    '2023-05-14 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    251,
    1,
    '2023-05-14 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    252,
    1,
    '2023-05-15 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    253,
    1,
    '2023-05-15 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    254,
    1,
    '2023-05-16 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    255,
    1,
    '2023-05-16 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    256,
    1,
    '2023-05-17 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    257,
    1,
    '2023-05-17 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    258,
    1,
    '2023-05-18 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    259,
    1,
    '2023-05-18 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    260,
    1,
    '2023-05-19 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    261,
    1,
    '2023-05-19 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    262,
    1,
    '2023-05-20 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    263,
    1,
    '2023-05-20 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    264,
    1,
    '2023-05-21 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    265,
    1,
    '2023-05-21 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    266,
    1,
    '2023-05-22 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    267,
    1,
    '2023-05-22 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    268,
    1,
    '2023-05-23 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    269,
    1,
    '2023-05-23 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    270,
    1,
    '2023-05-24 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    271,
    1,
    '2023-05-24 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    272,
    1,
    '2023-05-25 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    273,
    1,
    '2023-05-25 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    274,
    1,
    '2023-05-26 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    275,
    1,
    '2023-05-26 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    276,
    1,
    '2023-05-27 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    277,
    1,
    '2023-05-27 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    278,
    1,
    '2023-05-28 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    279,
    1,
    '2023-05-28 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    280,
    1,
    '2023-05-29 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    281,
    1,
    '2023-05-29 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    282,
    1,
    '2023-05-30 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    283,
    1,
    '2023-05-30 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    284,
    1,
    '2023-05-31 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    285,
    1,
    '2023-05-31 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    286,
    1,
    '2023-06-01 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    287,
    1,
    '2023-06-01 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    288,
    1,
    '2023-06-02 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    289,
    1,
    '2023-06-02 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    290,
    1,
    '2023-06-03 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    291,
    1,
    '2023-06-03 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    292,
    1,
    '2023-06-04 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    293,
    1,
    '2023-06-04 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    294,
    1,
    '2023-06-05 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    295,
    1,
    '2023-06-05 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    296,
    1,
    '2023-06-06 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    297,
    1,
    '2023-06-06 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    298,
    1,
    '2023-06-07 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    299,
    1,
    '2023-06-07 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    300,
    1,
    '2023-06-08 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    301,
    1,
    '2023-06-08 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    302,
    1,
    '2023-06-09 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    303,
    1,
    '2023-06-09 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    304,
    1,
    '2023-06-10 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    305,
    1,
    '2023-06-10 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    306,
    1,
    '2023-06-11 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    307,
    1,
    '2023-06-11 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    308,
    1,
    '2023-06-12 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    309,
    1,
    '2023-06-12 21:00:00',
    NULL,
    NULL,
    1,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    310,
    1,
    '2023-06-13 21:00:00',
    NULL,
    NULL,
    1,
    'today',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    311,
    1,
    '2023-06-13 21:00:00',
    NULL,
    NULL,
    1,
    'today',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    312,
    1,
    '2023-06-14 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    313,
    1,
    '2023-06-14 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    314,
    1,
    '2023-06-15 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    315,
    1,
    '2023-06-15 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    316,
    1,
    '2023-06-16 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    317,
    1,
    '2023-06-16 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    318,
    1,
    '2023-06-17 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    319,
    1,
    '2023-06-17 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    320,
    1,
    '2023-06-18 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    321,
    1,
    '2023-06-18 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    322,
    1,
    '2023-06-19 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    323,
    1,
    '2023-06-19 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    324,
    1,
    '2023-06-20 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    325,
    1,
    '2023-06-20 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    326,
    1,
    '2023-06-21 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    327,
    1,
    '2023-06-21 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    328,
    1,
    '2023-06-22 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    329,
    1,
    '2023-06-22 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    330,
    1,
    '2023-06-23 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    331,
    1,
    '2023-06-23 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    332,
    1,
    '2023-06-24 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    333,
    1,
    '2023-06-24 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    334,
    1,
    '2023-06-25 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    335,
    1,
    '2023-06-25 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    336,
    1,
    '2023-06-26 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    337,
    1,
    '2023-06-26 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    338,
    1,
    '2023-06-27 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    339,
    1,
    '2023-06-27 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    340,
    1,
    '2023-06-28 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    341,
    1,
    '2023-06-28 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    342,
    1,
    '2023-06-29 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    343,
    1,
    '2023-06-29 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    344,
    1,
    '2023-06-30 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    345,
    1,
    '2023-06-30 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    346,
    1,
    '2023-07-01 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    347,
    1,
    '2023-07-01 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    348,
    1,
    '2023-07-02 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    349,
    1,
    '2023-07-02 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    350,
    1,
    '2023-07-03 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'AM',
    1,
    2,
    'Feeding pigs in the morning',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    351,
    1,
    '2023-07-03 21:00:00',
    NULL,
    NULL,
    1,
    'pending',
    'true',
    'PM',
    1,
    2,
    'Feeding pigs in the afternoon',
    'Plan'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    352,
    4,
    '2023-05-08 13:49:00',
    NULL,
    1,
    NULL,
    'overdue',
    'false',
    NULL,
    5,
    2,
    'Vaccination of something ',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    353,
    4,
    '2023-05-08 14:54:00',
    NULL,
    1,
    NULL,
    'overdue',
    'false',
    NULL,
    5,
    2,
    'Deworming somthing',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    354,
    3,
    '2023-05-08 14:55:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    5,
    2,
    'Deworming something ',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    355,
    4,
    '2023-05-08 14:13:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    5,
    2,
    '12323123',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    356,
    2,
    '2023-05-10 15:43:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    5,
    2,
    'dfasd',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    357,
    1,
    '2023-05-26 12:46:00',
    'Breeder0_Batch9',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Description',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    358,
    1,
    '2023-05-26 12:46:00',
    'Breeder0_Batch9',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Description',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    359,
    2,
    '2023-05-26 23:53:00',
    'Breeder1_Batch1',
    NULL,
    NULL,
    'canceled',
    'true',
    NULL,
    1,
    2,
    'Medicine adminsitration',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    360,
    3,
    '2023-05-30 12:34:00',
    'Breeder0_Batch9',
    NULL,
    NULL,
    'canceled',
    'true',
    NULL,
    1,
    2,
    '12',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    361,
    1,
    '2023-05-26 12:21:00',
    'Breeder1_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'AM',
    1,
    2,
    'Description',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    362,
    1,
    '2023-05-26 12:21:00',
    'Breeder1_Batch1',
    NULL,
    NULL,
    'overdue',
    'true',
    'PM',
    1,
    2,
    'Description',
    'Custom'
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`,
    `description`,
    `type`
  )
VALUES
  (
    363,
    2,
    '2023-05-26 12:42:00',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    3,
    2,
    '1',
    'Custom'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_operation_item_details
# ------------------------------------------------------------

INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (1, 1, 1, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (2, 2, 1, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (3, 3, 1, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (4, 4, 1, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (5, 5, 2, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (6, 5, 3, 1, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (7, 6, 3, 60, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (8, 6, 2, 160, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (9, 6, 8, 60, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (10, 7, 2, 72, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (11, 7, 3, 72, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (12, 8, 2, 72, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (13, 9, 8, 72, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (14, 10, 2, 10, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (15, 11, 2, 60, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (16, 11, 9, 60, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (17, 12, 2, 0, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (18, 12, 3, 0, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (19, 13, 2, 60, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (20, 13, 3, 60, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (21, 14, 6, 42.52, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (22, 15, 6, 45.23, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (23, 16, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (24, 17, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (25, 18, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (26, 19, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (27, 20, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (28, 21, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (29, 22, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (30, 23, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (31, 24, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (32, 25, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (33, 26, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (34, 27, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (35, 28, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (36, 29, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (37, 30, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (38, 31, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (39, 32, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (40, 33, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (41, 34, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (42, 35, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (43, 36, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (44, 37, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (45, 38, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (46, 39, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (47, 40, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (48, 41, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (49, 42, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (50, 43, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (51, 44, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (52, 45, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (53, 46, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (54, 47, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (55, 48, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (56, 49, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (57, 50, 10, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (58, 51, 10, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (59, 52, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (60, 53, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (61, 54, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (62, 55, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (63, 56, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (64, 57, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (65, 58, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (66, 59, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (67, 60, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (68, 61, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (69, 62, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (70, 63, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (71, 64, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (72, 65, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (73, 66, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (74, 67, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (75, 68, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (76, 69, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (77, 70, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (78, 71, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (79, 72, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (80, 73, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (81, 74, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (82, 75, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (83, 76, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (84, 77, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (85, 78, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (86, 79, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (87, 80, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (88, 81, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (89, 82, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (90, 83, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (91, 84, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (92, 85, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (93, 86, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (94, 87, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (95, 88, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (96, 89, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (97, 90, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (98, 91, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (99, 92, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (100, 93, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (101, 94, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (102, 95, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (103, 96, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (104, 97, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (105, 98, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (106, 99, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (107, 100, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (108, 101, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (109, 102, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (110, 103, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (111, 104, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (112, 105, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (113, 106, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (114, 107, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (115, 108, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (116, 109, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (117, 110, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (118, 111, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (119, 112, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (120, 113, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (121, 114, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (122, 115, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (123, 116, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (124, 117, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (125, 118, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (126, 119, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (127, 120, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (128, 121, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (129, 122, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (130, 123, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (131, 124, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (132, 125, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (133, 126, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (134, 127, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (135, 128, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (136, 129, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (137, 130, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (138, 131, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (139, 132, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (140, 133, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (141, 134, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (142, 135, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (143, 136, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (144, 137, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (145, 138, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (146, 139, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (147, 140, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (148, 141, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (149, 142, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (150, 143, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (151, 144, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (152, 145, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (153, 146, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (154, 147, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (155, 148, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (156, 149, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (157, 150, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (158, 151, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (159, 152, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (160, 153, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (161, 154, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (162, 155, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (163, 156, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (164, 157, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (165, 158, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (166, 159, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (167, 160, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (168, 161, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (169, 162, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (170, 163, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (171, 164, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (172, 165, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (173, 166, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (174, 167, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (175, 168, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (176, 169, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (177, 170, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (178, 171, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (179, 172, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (180, 173, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (181, 174, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (182, 175, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (183, 176, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (184, 177, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (185, 178, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (186, 179, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (187, 180, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (188, 181, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (189, 182, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (190, 183, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (191, 184, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (192, 185, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (193, 186, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (194, 187, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (195, 188, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (196, 189, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (197, 190, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (198, 191, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (199, 192, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (200, 193, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (201, 194, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (202, 195, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (203, 196, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (204, 197, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (205, 198, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (206, 199, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (207, 200, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (208, 201, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (209, 202, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (210, 203, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (211, 204, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (212, 205, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (213, 206, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (214, 207, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (215, 208, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (216, 209, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (217, 210, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (218, 211, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (219, 212, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (220, 213, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (221, 214, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (222, 215, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (223, 216, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (224, 217, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (225, 218, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (226, 219, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (227, 220, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (228, 221, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (229, 222, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (230, 223, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (231, 224, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (232, 225, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (233, 226, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (234, 227, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (235, 228, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (236, 229, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (237, 230, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (238, 231, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (239, 232, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (240, 233, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (241, 234, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (242, 235, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (243, 236, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (244, 237, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (245, 238, 2, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (246, 238, 3, 1, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (247, 239, 3, 0, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (248, 239, 2, 0, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (249, 240, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (250, 241, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (251, 242, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (252, 243, 6, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (253, 244, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (254, 245, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (255, 246, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (256, 247, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (257, 248, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (258, 249, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (259, 250, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (260, 251, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (261, 252, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (262, 253, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (263, 254, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (264, 255, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (265, 256, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (266, 257, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (267, 258, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (268, 259, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (269, 260, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (270, 261, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (271, 262, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (272, 263, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (273, 264, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (274, 265, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (275, 266, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (276, 267, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (277, 268, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (278, 269, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (279, 270, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (280, 271, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (281, 272, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (282, 273, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (283, 274, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (284, 275, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (285, 276, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (286, 277, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (287, 278, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (288, 279, 10, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (289, 280, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (290, 281, 6, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (291, 282, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (292, 283, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (293, 284, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (294, 285, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (295, 286, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (296, 287, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (297, 288, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (298, 289, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (299, 290, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (300, 291, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (301, 292, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (302, 293, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (303, 294, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (304, 295, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (305, 296, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (306, 297, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (307, 298, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (308, 299, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (309, 300, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (310, 301, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (311, 302, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (312, 303, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (313, 304, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (314, 305, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (315, 306, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (316, 307, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (317, 308, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (318, 309, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (319, 310, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (320, 311, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (321, 312, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (322, 313, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (323, 314, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (324, 315, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (325, 316, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (326, 317, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (327, 318, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (328, 319, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (329, 320, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (330, 321, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (331, 322, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (332, 323, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (333, 324, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (334, 325, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (335, 326, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (336, 327, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (337, 328, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (338, 329, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (339, 330, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (340, 331, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (341, 332, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (342, 333, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (343, 334, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (344, 335, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (345, 336, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (346, 337, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (347, 338, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (348, 339, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (349, 340, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (350, 341, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (351, 342, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (352, 343, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (353, 344, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (354, 345, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (355, 346, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (356, 347, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (357, 348, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (358, 349, 7, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (359, 350, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (360, 351, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (361, 354, 2, 60, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (362, 354, 3, 10, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (363, 355, 2, 5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (364, 355, 3, 5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (365, 356, 2, 5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (366, 356, 3, 5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (367, 357, 1, 2, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (368, 357, 10, 5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (369, 358, 1, 2, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (370, 358, 10, 5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (371, 359, 2, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (372, 359, 8, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (373, 360, 2, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (374, 361, 1, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (375, 362, 1, 12, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (376, 363, 2, 3, 'true');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_operation_type
# ------------------------------------------------------------

INSERT INTO
  `tbl_operation_type` (`operation_type_id`, `operation_name`, `is_exist`)
VALUES
  (1, 'Feeding', 'true');
INSERT INTO
  `tbl_operation_type` (`operation_type_id`, `operation_name`, `is_exist`)
VALUES
  (2, 'Medicine Administration', 'true');
INSERT INTO
  `tbl_operation_type` (`operation_type_id`, `operation_name`, `is_exist`)
VALUES
  (3, 'Deworming', 'true');
INSERT INTO
  `tbl_operation_type` (`operation_type_id`, `operation_name`, `is_exist`)
VALUES
  (4, 'Vaccination', 'true');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_pig
# ------------------------------------------------------------

INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  (
    'Breeder0_Batch1',
    1,
    '2023-04-01',
    'kg',
    'false',
    5,
    2
  );
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  (
    'Breeder0_Batch8',
    1,
    '2023-05-21',
    'kg',
    'false',
    2,
    1
  );
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Breeder0_Batch9', 2, '2023-05-26', 'kg', 'true', 2, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Breeder1_Batch1', 1, '2023-04-01', 'kg', 'true', 5, 1);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Breeder1_Batch8', 1, '2023-05-21', 'kg', 'true', 2, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Breeder1_Batch9', 1, '2023-05-26', 'kg', 'true', 2, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Breeder2_Batch1', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Breeder3_Batch1', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Breeder4_Batch1', 1, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet0_Batch', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet0_Batch10', 2, '2023-05-26', 'kg', 'true', 2, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet0_Batch2', 1, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet1_Batch10', 2, '2023-05-26', 'kg', 'true', 2, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet1_Batch2', 1, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet1_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet1_Batch6', 1, '2023-05-17', 'kg', 'true', 2, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet2_Batch10', 2, '2023-05-26', 'kg', 'true', 2, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet2_Batch2', 1, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet2_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet3_Batch2', 1, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet3_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet4_Batch2', 1, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet4_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet5_Batch2', 1, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet5_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet6_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet7_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `breed_id`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`,
    `selectable`
  )
VALUES
  ('Piglet8_Batch3', 2, '2023-04-01', 'kg', 'true', 5, 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_pig_history
# ------------------------------------------------------------

INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    1,
    'Breeder0_Batch1',
    1,
    'SW-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:04:27',
    5,
    'Sow',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    2,
    'Breeder1_Batch1',
    2,
    'SW-2',
    130,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:04:27',
    5,
    'Sow',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    3,
    'Breeder2_Batch1',
    3,
    'BR-1',
    110.23,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:04:27',
    5,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    4,
    'Breeder3_Batch1',
    4,
    'BR-2',
    160.12,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:04:27',
    5,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    5,
    'Breeder4_Batch1',
    5,
    'SW-3',
    140.23,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:04:27',
    5,
    'Sow',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    6,
    'Piglet0_Batch2',
    19,
    'PL-1',
    1.23,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:09:49',
    5,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    7,
    'Piglet1_Batch2',
    19,
    'PL-2',
    1.32,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:09:49',
    5,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    8,
    'Piglet2_Batch2',
    19,
    'PL-3',
    1.42,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:09:49',
    5,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    9,
    'Piglet3_Batch2',
    19,
    'PL-4',
    1.65,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:09:49',
    5,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    10,
    'Piglet4_Batch2',
    19,
    'PL-5',
    2.1,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:09:49',
    5,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    11,
    'Piglet5_Batch2',
    19,
    'PL-6',
    2.24,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:09:49',
    5,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    12,
    'Piglet0_Batch',
    19,
    'PL-7',
    2.54,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    13,
    'Piglet1_Batch3',
    19,
    'PL-8',
    2.56,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    14,
    'Piglet2_Batch3',
    20,
    'PL-9',
    3.1,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    15,
    'Piglet3_Batch3',
    19,
    'PL-10',
    1.76,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    16,
    'Piglet4_Batch3',
    19,
    'PL-11',
    2.56,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    17,
    'Piglet5_Batch3',
    19,
    'PL-12',
    1.45,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    18,
    'Piglet6_Batch3',
    19,
    'PL-13',
    1.52,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    19,
    'Piglet7_Batch3',
    19,
    'PL-14',
    4.12,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    20,
    'Piglet8_Batch3',
    19,
    'PL-15',
    1.9,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-04-01 06:13:01',
    5,
    'piglet',
    3
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    21,
    'Breeder2_Batch1',
    21,
    'BR-1',
    110.23,
    'Quarantined',
    'active',
    'true',
    'Fever',
    'inactive',
    '2023-04-13 05:01:29',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    22,
    'Breeder2_Batch1',
    3,
    'BR-1',
    110.23,
    'active',
    'active',
    'true',
    'Cured',
    'inactive',
    '2023-04-27 06:17:55',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    23,
    'Breeder0_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:27:24',
    NULL,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    24,
    'Breeder1_Batch1',
    18,
    'BR-2',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:27:24',
    NULL,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    25,
    'Breeder3_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:27:24',
    NULL,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    26,
    'Breeder4_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:27:24',
    NULL,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    27,
    'Breeder2_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:27:24',
    NULL,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    28,
    'Breeder0_Batch1',
    23,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:29:30',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    29,
    'Breeder1_Batch1',
    23,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:29:30',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    30,
    'Breeder3_Batch1',
    23,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:29:30',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    31,
    'Breeder4_Batch1',
    23,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:29:30',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    32,
    'Breeder2_Batch1',
    23,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-05-09 23:29:30',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    33,
    'Breeder1_Batch1',
    10,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:37:18',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    34,
    'Breeder3_Batch1',
    10,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:37:18',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    35,
    'Breeder4_Batch1',
    10,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:37:18',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    36,
    'Breeder2_Batch1',
    10,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:37:18',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    37,
    'Breeder1_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:40:15',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    38,
    'Breeder3_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:40:15',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    39,
    'Breeder4_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:40:15',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    40,
    'Breeder2_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-09 23:40:15',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    41,
    'Piglet0_Batch2',
    17,
    'PL-1',
    1.23,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-09 23:41:37',
    2,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    42,
    'Piglet1_Batch2',
    17,
    'PL-2',
    1.32,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-09 23:41:37',
    2,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    43,
    'Piglet2_Batch2',
    17,
    'PL-3',
    1.42,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-09 23:41:37',
    2,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    44,
    'Piglet3_Batch2',
    17,
    'PL-4',
    1.65,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-09 23:41:37',
    2,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    45,
    'Piglet4_Batch2',
    17,
    'PL-5',
    2.1,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-09 23:41:37',
    2,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    46,
    'Piglet5_Batch2',
    17,
    'PL-6',
    2.24,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-09 23:41:37',
    2,
    'piglet',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    47,
    'Breeder1_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Move pig to batch 2',
    'active',
    '2023-05-10 00:20:53',
    2,
    'Boar',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    48,
    'Breeder4_Batch1',
    23,
    'BR-1',
    150,
    'Quarantined',
    'active',
    'true',
    'Ubo at sipon',
    'inactive',
    '2023-05-10 11:17:25',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    49,
    'Breeder3_Batch1',
    14,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-10 07:48:35',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    50,
    'Breeder2_Batch1',
    14,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'inactive',
    '2023-05-10 07:48:35',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    51,
    'Breeder0_Batch1',
    6,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Update to Individual stall 6',
    'inactive',
    '2023-05-17 02:20:22',
    2,
    'Sow',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    52,
    'Breeder0_Batch1',
    6,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to batch 2',
    'inactive',
    '2023-05-17 04:09:08',
    2,
    'Sow',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    53,
    'Breeder0_Batch8',
    7,
    'SW-324',
    122,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-05-21 04:23:55',
    2,
    'Sow',
    8
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    54,
    'Breeder1_Batch8',
    8,
    '123',
    231,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-05-21 04:23:55',
    2,
    'Sow',
    8
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    55,
    'Breeder0_Batch9',
    10,
    '12',
    67,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-05-25 23:21:35',
    2,
    'Sow',
    9
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    56,
    'Breeder1_Batch9',
    9,
    '142',
    76,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-05-25 23:21:35',
    2,
    'Sow',
    9
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    57,
    'Piglet0_Batch10',
    19,
    'lj547',
    1,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-05-25 23:31:10',
    2,
    'piglet',
    10
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    58,
    'Piglet1_Batch10',
    19,
    'BR-1',
    1.67,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-05-25 23:31:10',
    2,
    'piglet',
    10
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    59,
    'Piglet2_Batch10',
    19,
    '142',
    1,
    'active',
    'active',
    'true',
    NULL,
    'active',
    '2023-05-25 23:31:10',
    2,
    'piglet',
    10
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    60,
    'Breeder0_Batch1',
    6,
    'Bx-1',
    150,
    'active',
    'active',
    'true',
    'Updating the pig tag',
    'active',
    '2023-05-25 23:37:23',
    2,
    'Sow',
    2
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    61,
    'Breeder4_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-26 00:08:15',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    62,
    'Breeder3_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-26 00:08:15',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    63,
    'Breeder2_Batch1',
    18,
    'BR-1',
    150,
    'active',
    'active',
    'true',
    'Moved to cage',
    'active',
    '2023-05-26 00:08:15',
    2,
    'Boar',
    1
  );
INSERT INTO
  `tbl_pig_history` (
    `pig_history_id`,
    `pig_id`,
    `cage_id`,
    `pig_tag`,
    `weight`,
    `pig_status`,
    `status`,
    `is_exist`,
    `remarks`,
    `pig_history_status`,
    `created_at`,
    `user_id`,
    `pig_type`,
    `batch_id`
  )
VALUES
  (
    64,
    'Piglet0_Batch',
    21,
    'PL-7',
    2.54,
    'Quarantined',
    'active',
    'true',
    'Sipon at ubo',
    'active',
    '2023-05-26 02:47:00',
    2,
    'piglet',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_plan
# ------------------------------------------------------------

INSERT INTO
  `tbl_plan` (`plan_id`, `plan_name`, `is_exist`)
VALUES
  (1, 'Farrowing', 'false');
INSERT INTO
  `tbl_plan` (`plan_id`, `plan_name`, `is_exist`)
VALUES
  (2, 'Weaner', 'true');
INSERT INTO
  `tbl_plan` (`plan_id`, `plan_name`, `is_exist`)
VALUES
  (3, 'Grower', 'true');
INSERT INTO
  `tbl_plan` (`plan_id`, `plan_name`, `is_exist`)
VALUES
  (4, 'Finisher', 'true');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_plan_details
# ------------------------------------------------------------

INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (3, 2, 1, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (4, 2, 2, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (5, 2, 3, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (6, 2, 4, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (7, 2, 5, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (8, 2, 6, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (9, 2, 7, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (10, 2, 8, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (11, 2, 9, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (12, 2, 10, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (13, 2, 11, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (14, 2, 12, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (15, 2, 13, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (16, 2, 14, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (17, 2, 15, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (18, 2, 16, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (19, 2, 17, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (20, 2, 18, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (21, 2, 19, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (22, 2, 20, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (23, 2, 21, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (24, 2, 22, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (25, 2, 23, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (26, 2, 24, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (27, 2, 25, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (28, 2, 26, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (29, 2, 27, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (30, 2, 28, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (31, 2, 29, 12, 'feeding', 'true', 8);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (32, 2, 30, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (33, 2, 31, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (34, 2, 32, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (35, 2, 33, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (36, 2, 34, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (37, 2, 35, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (38, 2, 36, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (39, 2, 37, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (40, 2, 38, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (41, 2, 39, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (42, 2, 40, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (43, 2, 41, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (44, 2, 42, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (45, 2, 43, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (46, 2, 44, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (47, 2, 45, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (48, 2, 46, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (49, 2, 47, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (50, 2, 48, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (51, 2, 49, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (52, 2, 50, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (53, 2, 51, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (54, 2, 52, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (55, 2, 53, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (56, 2, 54, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (57, 2, 55, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (58, 2, 56, 1, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (59, 3, 1, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (60, 3, 2, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (61, 3, 3, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (62, 3, 4, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (63, 3, 5, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (64, 3, 6, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (65, 3, 7, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (66, 3, 8, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (67, 3, 9, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (68, 3, 10, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (69, 3, 11, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (70, 3, 12, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (71, 3, 13, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (72, 3, 14, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (73, 3, 15, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (74, 3, 16, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (75, 3, 17, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (76, 3, 18, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (77, 3, 19, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (78, 3, 20, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (79, 3, 21, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (80, 3, 22, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (81, 3, 23, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (82, 3, 24, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (83, 3, 25, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (84, 3, 26, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (85, 3, 27, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (86, 3, 28, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (87, 3, 29, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (88, 3, 30, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (89, 3, 31, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (90, 3, 32, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (91, 3, 33, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (92, 3, 34, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (93, 3, 35, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (94, 3, 36, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (95, 3, 37, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (96, 3, 38, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (97, 3, 39, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (98, 3, 40, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (99, 3, 41, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (100, 3, 42, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (101, 3, 43, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (102, 3, 44, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (103, 3, 45, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (104, 3, 46, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (105, 3, 47, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (106, 3, 48, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (107, 3, 49, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (108, 3, 50, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (109, 3, 51, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (110, 3, 52, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (111, 3, 53, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (112, 3, 54, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (113, 3, 55, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (114, 3, 56, 6, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (115, 4, 1, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (116, 4, 2, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (117, 4, 3, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (118, 4, 4, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (119, 4, 5, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (120, 4, 6, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (121, 4, 7, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (122, 4, 8, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (123, 4, 9, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (124, 4, 10, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (125, 4, 11, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (126, 4, 12, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (127, 4, 13, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (128, 4, 14, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (129, 4, 15, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (130, 4, 16, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (131, 4, 17, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (132, 4, 18, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (133, 4, 19, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (134, 4, 20, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (135, 4, 21, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (136, 4, 22, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (137, 4, 23, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (138, 4, 24, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (139, 4, 25, 7, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (140, 4, 26, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (141, 4, 27, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (142, 4, 28, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (143, 4, 29, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (144, 4, 30, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (145, 4, 31, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (146, 4, 32, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (147, 4, 33, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (148, 4, 34, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (149, 4, 35, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (150, 4, 36, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (151, 4, 37, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (152, 4, 38, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (153, 4, 39, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (154, 4, 40, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (155, 4, 41, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (156, 4, 42, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (157, 4, 43, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (158, 4, 44, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (159, 4, 45, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (160, 4, 46, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (161, 4, 47, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (162, 4, 48, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (163, 4, 49, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (164, 4, 50, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (165, 4, 51, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (166, 4, 52, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (167, 4, 53, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (168, 4, 54, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (169, 4, 55, 10, 'feeding', 'true', 3);
INSERT INTO
  `tbl_plan_details` (
    `plan_detail_id`,
    `plan_id`,
    `day`,
    `item_id`,
    `type`,
    `is_exist`,
    `user_id`
  )
VALUES
  (170, 4, 56, 10, 'feeding', 'true', 3);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_quarantine
# ------------------------------------------------------------

INSERT INTO
  `tbl_quarantine` (
    `quarantine_id`,
    `remarks`,
    `quarantine_date`,
    `is_exist`,
    `user_id`
  )
VALUES
  (1, 'Swine Fever', '2023-01-13', 'true', 2);
INSERT INTO
  `tbl_quarantine` (
    `quarantine_id`,
    `remarks`,
    `quarantine_date`,
    `is_exist`,
    `user_id`
  )
VALUES
  (2, 'Ubo at sipon', '2023-05-10', 'true', 2);
INSERT INTO
  `tbl_quarantine` (
    `quarantine_id`,
    `remarks`,
    `quarantine_date`,
    `is_exist`,
    `user_id`
  )
VALUES
  (3, 'Sipon at ubo', '2023-05-26', 'true', 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_quarantine_details
# ------------------------------------------------------------

INSERT INTO
  `tbl_quarantine_details` (
    `quarantine_details_id`,
    `quarantine_id`,
    `cage_id`,
    `pig_id`,
    `is_exist`
  )
VALUES
  (1, 1, 21, 'Breeder2_Batch1', 'true');
INSERT INTO
  `tbl_quarantine_details` (
    `quarantine_details_id`,
    `quarantine_id`,
    `cage_id`,
    `pig_id`,
    `is_exist`
  )
VALUES
  (2, 2, 23, 'Breeder4_Batch1', 'true');
INSERT INTO
  `tbl_quarantine_details` (
    `quarantine_details_id`,
    `quarantine_id`,
    `cage_id`,
    `pig_id`,
    `is_exist`
  )
VALUES
  (3, 3, 21, 'Piglet0_Batch', 'true');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_restock
# ------------------------------------------------------------

INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    1,
    '2023-04-01',
    'public/attachments/3432782442.png',
    'false',
    5
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    2,
    '2023-04-01',
    'public/attachments/7754778043.png',
    'false',
    5
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    3,
    '2023-04-01',
    'public/attachments/6577801461.png',
    'false',
    5
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    4,
    '2023-04-01',
    'public/attachments/0714834736.png',
    'false',
    5
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    5,
    '2023-04-01',
    'public/attachments/8325025358.png',
    'false',
    5
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    6,
    '2023-04-01',
    'public/attachments/5586386703.png',
    'false',
    5
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    7,
    '2023-04-01',
    'public/attachments/4076051776.png',
    'true',
    5
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    8,
    '2023-04-16',
    'public/attachments/3714171724.png',
    'true',
    2
  );
INSERT INTO
  `tbl_restock` (
    `restock_id`,
    `restock_date`,
    `attachment`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    9,
    '2023-05-26',
    'public/attachments/3103650336.jpeg',
    'false',
    2
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_restock_details
# ------------------------------------------------------------

INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (1, 7, 1, 15, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (2, 7, 2, 15, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (3, 7, 3, 50, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (4, 7, 4, 15, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (5, 7, 5, 15, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (6, 7, 6, 50, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (7, 7, 7, 50, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (8, 7, 8, 15, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (9, 7, 9, 5, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (10, 7, 10, 50, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (11, 8, 1, 150, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (12, 9, 1, 12, 'true');
INSERT INTO
  `tbl_restock_details` (
    `restock_details_id`,
    `restock_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (13, 9, 6, 12, 'true');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_stock_card
# ------------------------------------------------------------

INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (1, 0, 750, 1, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (2, 0, 1500, 2, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (3, 0, 50, 3, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (4, 0, 750, 4, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (5, 0, 1500, 5, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (6, 0, 2500, 6, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (7, 0, 2500, 7, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (8, 0, 1500, 8, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (9, 0, 5, 9, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (10, 0, 2500, 10, '2023-04-01', 'active', 'true', 5);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (11, 750, 720, 1, '2023-04-02', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (12, 720, 690, 1, '2023-04-03', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (13, 690, 660, 1, '2023-04-04', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (14, 660, 630, 1, '2023-04-05', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (15, 630, 588, 1, '2023-04-06', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (16, 588, 546, 1, '2023-04-07', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (17, 546, 495, 1, '2023-04-08', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (18, 495, 441, 1, '2023-04-09', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (19, 441, 387, 1, '2023-04-10', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (20, 387, 333, 1, '2023-04-11', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (21, 333, 270, 1, '2023-04-12', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (22, 270, 198, 1, '2023-04-13', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (23, 1500, 1485, 2, '2023-04-13', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (24, 50, 47, 3, '2023-04-13', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (25, 198, 126, 1, '2023-04-14', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (26, 126, 36, 1, '2023-04-15', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (27, 36, 7446, 1, '2023-04-16', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (28, 7446, 7326, 1, '2023-04-17', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (29, 7326, 7206, 1, '2023-04-18', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (30, 7206, 7086, 1, '2023-04-19', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (31, 7086, 6996, 1, '2023-04-20', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (32, 6996, 6846, 1, '2023-04-21', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (33, 6846, 6716, 1, '2023-04-22', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (34, 1485, 1455, 2, '2023-04-22', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (35, 47, 44, 3, '2023-04-22', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (36, 6716, 6578, 1, '2023-04-23', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (37, 6578, 6203, 1, '2023-04-24', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (38, 1500, 1487.6, 8, '2023-04-24', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (39, 44, 43, 3, '2023-04-24', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (40, 6203, 5987, 1, '2023-04-26', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (41, 5987, 5771, 1, '2023-04-27', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (42, 5771, 5531, 1, '2023-04-28', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (43, 5531, 5261, 1, '2023-04-29', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (44, 5261, 4751, 1, '2023-04-30', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (45, 4751, 4451, 1, '2023-05-02', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (46, 1455, 1410, 2, '2023-05-03', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (47, 43, 40, 3, '2023-05-03', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (48, 4451, 4011, 1, '2023-05-03', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (49, 4011, 3591, 1, '2023-05-04', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (50, 3591, 3411, 1, '2023-05-05', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (51, 3411, 2991, 1, '2023-05-06', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (52, 2991, 2781, 1, '2023-05-07', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (53, 0, 0, 11, '2023-05-07', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (54, 2781, 2699, 1, '2023-05-08', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (55, 1410, 1398, 2, '2023-05-08', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (56, 40, 28, 3, '2023-05-08', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (57, 1398, 1376, 2, '2023-05-09', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (58, 5, 3, 9, '2023-05-09', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (59, 2699, 2627, 1, '2023-05-10', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    60,
    1487.6,
    1355.6,
    8,
    '2023-05-10',
    'active',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (61, 1376, 1224, 2, '2023-05-10', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (62, 2500, 2268.25, 6, '2023-05-10', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (63, 28, 8, 3, '2023-05-10', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (64, 0, 0, 12, '2023-05-26', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (65, 2627, 2627, 1, '2023-05-26', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (66, 2268.25, 2018, 6, '2023-05-26', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (67, 2500, 2476, 10, '2023-05-26', 'active', 'true', 2);
INSERT INTO
  `tbl_stock_card` (
    `stock_card_id`,
    `opening_quantity`,
    `closing_quantity`,
    `item_id`,
    `transaction_date`,
    `status`,
    `is_exist`,
    `user_id`
  )
VALUES
  (68, 1224, 1221, 2, '2023-05-26', 'active', 'true', 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_stock_card_details
# ------------------------------------------------------------

INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    1,
    750,
    750,
    'IN',
    '2026-07-07',
    1,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    2,
    1500,
    1500,
    'IN',
    '2027-06-25',
    2,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    3,
    50,
    50,
    'IN',
    NULL,
    3,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    4,
    750,
    750,
    'IN',
    '2025-06-25',
    4,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    5,
    1500,
    1500,
    'IN',
    '2026-06-25',
    5,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    6,
    2500,
    2500,
    'IN',
    '2026-06-25',
    6,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    7,
    2500,
    2500,
    'IN',
    '2027-06-16',
    7,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    8,
    1500,
    1500,
    'IN',
    '2026-06-07',
    8,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    9,
    5,
    5,
    'IN',
    '2027-06-25',
    9,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    10,
    2500,
    2500,
    'IN',
    '2027-06-07',
    10,
    'public/attachments/4076051776.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    11,
    5,
    745,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    12,
    5,
    740,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    13,
    5,
    735,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    14,
    5,
    730,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    15,
    5,
    725,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    16,
    5,
    720,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    17,
    5,
    715,
    'OUT',
    NULL,
    12,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    18,
    5,
    710,
    'OUT',
    NULL,
    12,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    19,
    5,
    705,
    'OUT',
    NULL,
    12,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    20,
    5,
    700,
    'OUT',
    NULL,
    12,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    21,
    5,
    695,
    'OUT',
    NULL,
    12,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    22,
    5,
    690,
    'OUT',
    NULL,
    12,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    23,
    5,
    685,
    'OUT',
    NULL,
    13,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    24,
    5,
    680,
    'OUT',
    NULL,
    13,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    25,
    5,
    675,
    'OUT',
    NULL,
    13,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    26,
    5,
    670,
    'OUT',
    NULL,
    13,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    27,
    5,
    665,
    'OUT',
    NULL,
    13,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    28,
    5,
    660,
    'OUT',
    NULL,
    13,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    29,
    5,
    655,
    'OUT',
    NULL,
    14,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    30,
    5,
    650,
    'OUT',
    NULL,
    14,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    31,
    5,
    645,
    'OUT',
    NULL,
    14,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    32,
    5,
    640,
    'OUT',
    NULL,
    14,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    33,
    5,
    635,
    'OUT',
    NULL,
    14,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    34,
    5,
    630,
    'OUT',
    NULL,
    14,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    35,
    7,
    623,
    'OUT',
    NULL,
    15,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    36,
    7,
    616,
    'OUT',
    NULL,
    15,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    37,
    7,
    609,
    'OUT',
    NULL,
    15,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    38,
    7,
    602,
    'OUT',
    NULL,
    15,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    39,
    7,
    595,
    'OUT',
    NULL,
    15,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    40,
    7,
    588,
    'OUT',
    NULL,
    15,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    41,
    7,
    581,
    'OUT',
    NULL,
    16,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    42,
    7,
    574,
    'OUT',
    NULL,
    16,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    43,
    7,
    567,
    'OUT',
    NULL,
    16,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    44,
    7,
    560,
    'OUT',
    NULL,
    16,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    45,
    7,
    553,
    'OUT',
    NULL,
    16,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    46,
    7,
    546,
    'OUT',
    NULL,
    16,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    47,
    8,
    538,
    'OUT',
    NULL,
    17,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    48,
    8,
    530,
    'OUT',
    NULL,
    17,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    49,
    8,
    522,
    'OUT',
    NULL,
    17,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    50,
    9,
    513,
    'OUT',
    NULL,
    17,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    51,
    9,
    504,
    'OUT',
    NULL,
    17,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    52,
    9,
    495,
    'OUT',
    NULL,
    17,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    53,
    9,
    486,
    'OUT',
    NULL,
    18,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    54,
    9,
    477,
    'OUT',
    NULL,
    18,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    55,
    9,
    468,
    'OUT',
    NULL,
    18,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    56,
    9,
    459,
    'OUT',
    NULL,
    18,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    57,
    9,
    450,
    'OUT',
    NULL,
    18,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    58,
    9,
    441,
    'OUT',
    NULL,
    18,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    59,
    9,
    432,
    'OUT',
    NULL,
    19,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    60,
    9,
    423,
    'OUT',
    NULL,
    19,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    61,
    9,
    414,
    'OUT',
    NULL,
    19,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    62,
    9,
    405,
    'OUT',
    NULL,
    19,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    63,
    9,
    396,
    'OUT',
    NULL,
    19,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    64,
    9,
    387,
    'OUT',
    NULL,
    19,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    65,
    9,
    378,
    'OUT',
    NULL,
    20,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    66,
    9,
    369,
    'OUT',
    NULL,
    20,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    67,
    9,
    360,
    'OUT',
    NULL,
    20,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    68,
    9,
    351,
    'OUT',
    NULL,
    20,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    69,
    9,
    342,
    'OUT',
    NULL,
    20,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    70,
    9,
    333,
    'OUT',
    NULL,
    20,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    71,
    10.5,
    322.5,
    'OUT',
    NULL,
    21,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    72,
    10.5,
    312,
    'OUT',
    NULL,
    21,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    73,
    10.5,
    301.5,
    'OUT',
    NULL,
    21,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    74,
    10.5,
    291,
    'OUT',
    NULL,
    21,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    75,
    10.5,
    280.5,
    'OUT',
    NULL,
    21,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    76,
    10.5,
    270,
    'OUT',
    NULL,
    21,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    77,
    12,
    258,
    'OUT',
    NULL,
    22,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    78,
    12,
    246,
    'OUT',
    NULL,
    22,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    79,
    12,
    234,
    'OUT',
    NULL,
    22,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    80,
    12,
    222,
    'OUT',
    NULL,
    22,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    81,
    12,
    210,
    'OUT',
    NULL,
    22,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    82,
    12,
    198,
    'OUT',
    NULL,
    22,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    83,
    5,
    1495,
    'OUT',
    NULL,
    23,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    84,
    1,
    49,
    'OUT',
    NULL,
    24,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    85,
    5,
    1490,
    'OUT',
    NULL,
    23,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    86,
    1,
    48,
    'OUT',
    NULL,
    24,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    87,
    5,
    1485,
    'OUT',
    NULL,
    23,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    88,
    1,
    47,
    'OUT',
    NULL,
    24,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    89,
    12,
    186,
    'OUT',
    NULL,
    25,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    90,
    12,
    174,
    'OUT',
    NULL,
    25,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    91,
    12,
    162,
    'OUT',
    NULL,
    25,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    92,
    12,
    150,
    'OUT',
    NULL,
    25,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    93,
    12,
    138,
    'OUT',
    NULL,
    25,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    94,
    12,
    126,
    'OUT',
    NULL,
    25,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    95,
    15,
    111,
    'OUT',
    NULL,
    26,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    96,
    15,
    96,
    'OUT',
    NULL,
    26,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    97,
    15,
    81,
    'OUT',
    NULL,
    26,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    98,
    15,
    66,
    'OUT',
    NULL,
    26,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    99,
    15,
    51,
    'OUT',
    NULL,
    26,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    100,
    15,
    36,
    'OUT',
    NULL,
    26,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    101,
    15,
    21,
    'OUT',
    NULL,
    27,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    102,
    15,
    6,
    'OUT',
    NULL,
    27,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    103,
    7500,
    7506,
    'IN',
    '2027-06-25',
    27,
    'public/attachments/3714171724.png',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    104,
    15,
    7491,
    'OUT',
    NULL,
    27,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    105,
    15,
    7476,
    'OUT',
    NULL,
    27,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    106,
    15,
    7461,
    'OUT',
    NULL,
    27,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    107,
    15,
    7446,
    'OUT',
    NULL,
    27,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    108,
    20,
    7426,
    'OUT',
    NULL,
    28,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    109,
    20,
    7406,
    'OUT',
    NULL,
    28,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    110,
    20,
    7386,
    'OUT',
    NULL,
    28,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    111,
    20,
    7366,
    'OUT',
    NULL,
    28,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    112,
    20,
    7346,
    'OUT',
    NULL,
    28,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    113,
    20,
    7326,
    'OUT',
    NULL,
    28,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    114,
    20,
    7306,
    'OUT',
    NULL,
    29,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    115,
    20,
    7286,
    'OUT',
    NULL,
    29,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    116,
    20,
    7266,
    'OUT',
    NULL,
    29,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    117,
    20,
    7246,
    'OUT',
    NULL,
    29,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    118,
    20,
    7226,
    'OUT',
    NULL,
    29,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    119,
    20,
    7206,
    'OUT',
    NULL,
    29,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    120,
    20,
    7186,
    'OUT',
    NULL,
    30,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    121,
    20,
    7166,
    'OUT',
    NULL,
    30,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    122,
    20,
    7146,
    'OUT',
    NULL,
    30,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    123,
    20,
    7126,
    'OUT',
    NULL,
    30,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    124,
    20,
    7106,
    'OUT',
    NULL,
    30,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    125,
    20,
    7086,
    'OUT',
    NULL,
    30,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    126,
    15,
    7071,
    'OUT',
    NULL,
    31,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    127,
    15,
    7056,
    'OUT',
    NULL,
    31,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    128,
    15,
    7041,
    'OUT',
    NULL,
    31,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    129,
    15,
    7026,
    'OUT',
    NULL,
    31,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    130,
    15,
    7011,
    'OUT',
    NULL,
    31,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    131,
    15,
    6996,
    'OUT',
    NULL,
    31,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    132,
    25,
    6971,
    'OUT',
    NULL,
    32,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    133,
    25,
    6946,
    'OUT',
    NULL,
    32,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    134,
    25,
    6921,
    'OUT',
    NULL,
    32,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    135,
    25,
    6896,
    'OUT',
    NULL,
    32,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    136,
    25,
    6871,
    'OUT',
    NULL,
    32,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    137,
    25,
    6846,
    'OUT',
    NULL,
    32,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    138,
    15,
    6831,
    'OUT',
    NULL,
    33,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    139,
    15,
    6816,
    'OUT',
    NULL,
    33,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    140,
    25,
    6791,
    'OUT',
    NULL,
    33,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    141,
    25,
    6766,
    'OUT',
    NULL,
    33,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    142,
    25,
    6741,
    'OUT',
    NULL,
    33,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    143,
    25,
    6716,
    'OUT',
    NULL,
    33,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    144,
    10,
    1475,
    'OUT',
    NULL,
    34,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    145,
    1,
    46,
    'OUT',
    NULL,
    35,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    146,
    10,
    1465,
    'OUT',
    NULL,
    34,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    147,
    1,
    45,
    'OUT',
    NULL,
    35,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    148,
    10,
    1455,
    'OUT',
    NULL,
    34,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    149,
    1,
    44,
    'OUT',
    NULL,
    35,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    150,
    23,
    6693,
    'OUT',
    NULL,
    36,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    151,
    23,
    6670,
    'OUT',
    NULL,
    36,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    152,
    23,
    6647,
    'OUT',
    NULL,
    36,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    153,
    23,
    6624,
    'OUT',
    NULL,
    36,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    154,
    23,
    6601,
    'OUT',
    NULL,
    36,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    155,
    23,
    6578,
    'OUT',
    NULL,
    36,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    156,
    15,
    6563,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    157,
    30,
    6533,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    158,
    30,
    6503,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    159,
    30,
    6473,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    160,
    30,
    6443,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    161,
    30,
    6413,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    162,
    12.4,
    1487.6,
    'OUT',
    NULL,
    38,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    163,
    1,
    43,
    'OUT',
    NULL,
    39,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    164,
    35,
    6378,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    165,
    35,
    6343,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    166,
    35,
    6308,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    167,
    35,
    6273,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    168,
    35,
    6238,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    169,
    35,
    6203,
    'OUT',
    NULL,
    37,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    170,
    36,
    6167,
    'OUT',
    NULL,
    40,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    171,
    36,
    6131,
    'OUT',
    NULL,
    40,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    172,
    36,
    6095,
    'OUT',
    NULL,
    40,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    173,
    36,
    6059,
    'OUT',
    NULL,
    40,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    174,
    36,
    6023,
    'OUT',
    NULL,
    40,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    175,
    36,
    5987,
    'OUT',
    NULL,
    40,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    176,
    36,
    5951,
    'OUT',
    NULL,
    41,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    177,
    36,
    5915,
    'OUT',
    NULL,
    41,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    178,
    36,
    5879,
    'OUT',
    NULL,
    41,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    179,
    36,
    5843,
    'OUT',
    NULL,
    41,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    180,
    36,
    5807,
    'OUT',
    NULL,
    41,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    181,
    36,
    5771,
    'OUT',
    NULL,
    41,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    182,
    40,
    5731,
    'OUT',
    NULL,
    42,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    183,
    40,
    5691,
    'OUT',
    NULL,
    42,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    184,
    40,
    5651,
    'OUT',
    NULL,
    42,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    185,
    40,
    5611,
    'OUT',
    NULL,
    42,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    186,
    40,
    5571,
    'OUT',
    NULL,
    42,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    187,
    40,
    5531,
    'OUT',
    NULL,
    42,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    188,
    45,
    5486,
    'OUT',
    NULL,
    43,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    189,
    45,
    5441,
    'OUT',
    NULL,
    43,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    190,
    45,
    5396,
    'OUT',
    NULL,
    43,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    191,
    45,
    5351,
    'OUT',
    NULL,
    43,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    192,
    45,
    5306,
    'OUT',
    NULL,
    43,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    193,
    45,
    5261,
    'OUT',
    NULL,
    43,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    194,
    12,
    5249,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    195,
    12,
    5237,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    196,
    48,
    5189,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    197,
    48,
    5141,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    198,
    48,
    5093,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    199,
    48,
    5045,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    200,
    49,
    4996,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    201,
    49,
    4947,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    202,
    49,
    4898,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    203,
    49,
    4849,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    204,
    49,
    4800,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    205,
    49,
    4751,
    'OUT',
    NULL,
    44,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    206,
    50,
    4701,
    'OUT',
    NULL,
    45,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    207,
    50,
    4651,
    'OUT',
    NULL,
    45,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    208,
    50,
    4601,
    'OUT',
    NULL,
    45,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    209,
    50,
    4551,
    'OUT',
    NULL,
    45,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    210,
    50,
    4501,
    'OUT',
    NULL,
    45,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    211,
    50,
    4451,
    'OUT',
    NULL,
    45,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    212,
    15,
    1440,
    'OUT',
    NULL,
    46,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    213,
    1,
    42,
    'OUT',
    NULL,
    47,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    214,
    50,
    4401,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    215,
    50,
    4351,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    216,
    55,
    4296,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    217,
    55,
    4241,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    218,
    15,
    1425,
    'OUT',
    NULL,
    46,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    219,
    1,
    41,
    'OUT',
    NULL,
    47,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    220,
    55,
    4186,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    221,
    55,
    4131,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    222,
    15,
    1410,
    'OUT',
    NULL,
    46,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    223,
    1,
    40,
    'OUT',
    NULL,
    47,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    224,
    60,
    4071,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    225,
    60,
    4011,
    'OUT',
    NULL,
    48,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    226,
    60,
    3951,
    'OUT',
    NULL,
    49,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    227,
    60,
    3891,
    'OUT',
    NULL,
    49,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    228,
    60,
    3831,
    'OUT',
    NULL,
    49,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    229,
    60,
    3771,
    'OUT',
    NULL,
    49,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    230,
    60,
    3711,
    'OUT',
    NULL,
    49,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    231,
    60,
    3651,
    'OUT',
    NULL,
    49,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    232,
    60,
    3591,
    'OUT',
    NULL,
    49,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    233,
    60,
    3531,
    'OUT',
    NULL,
    50,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    234,
    60,
    3471,
    'OUT',
    NULL,
    50,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    235,
    60,
    3411,
    'OUT',
    NULL,
    50,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    236,
    70,
    3341,
    'OUT',
    NULL,
    51,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    237,
    70,
    3271,
    'OUT',
    NULL,
    51,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    238,
    70,
    3201,
    'OUT',
    NULL,
    51,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    239,
    70,
    3131,
    'OUT',
    NULL,
    51,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    240,
    70,
    3061,
    'OUT',
    NULL,
    51,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    241,
    70,
    2991,
    'OUT',
    NULL,
    51,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    242,
    70,
    2921,
    'OUT',
    NULL,
    52,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    243,
    70,
    2851,
    'OUT',
    NULL,
    52,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    244,
    70,
    2781,
    'OUT',
    NULL,
    52,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    245,
    12,
    2769,
    'OUT',
    NULL,
    54,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    246,
    12,
    2757,
    'OUT',
    NULL,
    54,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    247,
    10,
    2747,
    'OUT',
    NULL,
    54,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    248,
    12,
    2735,
    'OUT',
    NULL,
    54,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    249,
    12,
    2723,
    'OUT',
    NULL,
    54,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    250,
    12,
    2711,
    'OUT',
    NULL,
    54,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    251,
    12,
    2699,
    'OUT',
    NULL,
    54,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    252,
    12,
    1398,
    'OUT',
    NULL,
    55,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    253,
    12,
    28,
    'OUT',
    NULL,
    56,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    254,
    12,
    1386,
    'OUT',
    NULL,
    57,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    255,
    1,
    4,
    'OUT',
    NULL,
    58,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    256,
    10,
    1376,
    'OUT',
    NULL,
    57,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    257,
    1,
    3,
    'OUT',
    NULL,
    58,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    258,
    12,
    2687,
    'OUT',
    NULL,
    59,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    259,
    12,
    2675,
    'OUT',
    NULL,
    59,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    260,
    60,
    1427.6,
    'OUT',
    NULL,
    60,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    261,
    10,
    1366,
    'OUT',
    NULL,
    61,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    262,
    72,
    1355.6,
    'OUT',
    NULL,
    60,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    263,
    72,
    1294,
    'OUT',
    NULL,
    61,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    264,
    12,
    2663,
    'OUT',
    NULL,
    59,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    265,
    12,
    2651,
    'OUT',
    NULL,
    59,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    266,
    45.23,
    2454.77,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    267,
    42.52,
    2412.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    268,
    12,
    2639,
    'OUT',
    NULL,
    59,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    269,
    60,
    1234,
    'OUT',
    NULL,
    61,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    270,
    10,
    18,
    'OUT',
    NULL,
    63,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    271,
    5,
    1229,
    'OUT',
    NULL,
    61,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    272,
    5,
    13,
    'OUT',
    NULL,
    63,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    273,
    12,
    2400.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    274,
    12,
    2388.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    275,
    12,
    2376.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    276,
    12,
    2364.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    277,
    12,
    2352.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    278,
    12,
    2340.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    279,
    12,
    2627,
    'OUT',
    NULL,
    59,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    280,
    12,
    2328.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    281,
    12,
    2316.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    282,
    12,
    2304.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    283,
    12,
    2292.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    284,
    12,
    2280.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    285,
    12,
    2268.25,
    'OUT',
    NULL,
    62,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    286,
    5,
    1224,
    'OUT',
    NULL,
    61,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    287,
    5,
    8,
    'OUT',
    NULL,
    63,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    288,
    600,
    3227,
    'IN',
    '2023-11-26',
    65,
    'public/attachments/3103650336.jpeg',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    289,
    600,
    2868,
    'IN',
    '2023-11-28',
    66,
    'public/attachments/3103650336.jpeg',
    NULL,
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    290,
    600,
    2627,
    'OUT',
    NULL,
    65,
    NULL,
    'Cancel Restock',
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    291,
    600,
    2268,
    'OUT',
    NULL,
    66,
    NULL,
    'Cancel Restock',
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    292,
    250,
    2018,
    'OUT',
    NULL,
    66,
    NULL,
    'Expired',
    'true',
    NULL
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    293,
    12,
    2488,
    'OUT',
    NULL,
    67,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    294,
    12,
    2476,
    'OUT',
    NULL,
    67,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );
INSERT INTO
  `tbl_stock_card_details` (
    `transaction_detail_id`,
    `transaction_quantity`,
    `total_quantity`,
    `type`,
    `expiration_date`,
    `stock_card_id`,
    `attachment`,
    `remark`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    295,
    3,
    1221,
    'OUT',
    NULL,
    68,
    NULL,
    'Scheduled Activity',
    'true',
    2
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_users
# ------------------------------------------------------------

INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    1,
    'Admin',
    '$2b$10$nEn7VNPb6cuXI.v78LnFhOLi.aJyo9NkUlL3XIOoKH7WdjQZB6d06',
    'April Jude',
    NULL,
    'Provido',
    '9082294875',
    'owner',
    'true'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    2,
    'AjWorker',
    '$2b$10$B3/ztuDpnHcud8bYre1hE.U2/pcEMKxCf9UOnaxA8wzpQRd00fBn6',
    'Royd ',
    '',
    'Catalunes',
    '9082294975',
    'worker',
    'true'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    3,
    'AjVet',
    '$2b$10$hRxAKiQk2/30kAfNzBWzP.YvtT1Dgl.DJg7THfqUWbd/bJvV39xJW',
    'Kaye',
    '',
    'Tumilap',
    '9082294975',
    'veterinarian',
    'false'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    4,
    'Jason',
    '$2b$10$tqYGq0oxyal2Zm07wZuypuVIbwnCQCKUYVYv51E2ES44sEnV.OOm6',
    'Jason',
    '',
    'Morgan',
    '9082294975',
    'worker',
    'true'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    5,
    'jason',
    '$2b$10$wvJlKX5CYeXTGf7RAkJSkOEwvNUICbgrV6R9KG5lmTlGOsfoGHKsO',
    'Morgan',
    '',
    'Snow',
    '9082294975',
    'worker',
    'true'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    6,
    'nick123',
    '$2b$10$6c3HmjMbNUKfihGinHco/OCl1hKhplJZo/ubjDNjDh0E0v9t5UriO',
    'Nick',
    'b',
    'Bill',
    '9123456789',
    'worker',
    'true'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    7,
    'ayner',
    '$2b$10$v47c55lYRq1Mn88qO3mtrOGzEa/pK41VitqJWKZvWv5E3PZNXMSf2',
    'ayner',
    'ayner',
    'ayner',
    '9464003615',
    'worker',
    'true'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    8,
    'AjVet',
    '$2b$10$3c0.S76TEGYY.OENiXGA2uduJ80RY6rzGI5LGjWq.ttI2Uks/Fd3S',
    'April Jude',
    '',
    'Provido',
    '9082294975',
    'veterinarian',
    'true'
  );
INSERT INTO
  `tbl_users` (
    `user_id`,
    `username`,
    `password`,
    `first_name`,
    `middle_name`,
    `last_name`,
    `phone`,
    `job`,
    `is_exist`
  )
VALUES
  (
    9,
    'kaye',
    '$2b$10$aGf0HJSmpeYDiDx.6MkTJeh5MKxqo9zqx5T6xzoZ1GHCFzbgwMMj6',
    'Pea Marie',
    'D.',
    'Tumilap',
    '9955559982',
    'worker',
    'true'
  );