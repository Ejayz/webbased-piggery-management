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
  `batch_id` int(11) NOT NULL AUTO_INCREMENT,
  `batch_name` varchar(50) DEFAULT NULL,
  `boar_id` varchar(50) DEFAULT NULL,
  `sow_id` varchar(50) DEFAULT NULL,
  `batch_capacity` int(11) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `FKtblbatchtblpig` (`boar_id`),
  KEY `FKtblbatchtblpig2` (`sow_id`),
  KEY `FK_tbl_batch_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_batch_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtblbatchtblpig` FOREIGN KEY (`boar_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtblbatchtblpig2` FOREIGN KEY (`sow_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_breed
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_breed`;
CREATE TABLE `tbl_breed` (
  `breed_id` int(11) NOT NULL AUTO_INCREMENT,
  `breed_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`breed_id`),
  KEY `FK_tbl_breed_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_breed_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_cage
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_cage`;
CREATE TABLE `tbl_cage` (
  `cage_id` int(11) NOT NULL AUTO_INCREMENT,
  `cage_name` varchar(50) DEFAULT NULL,
  `cage_type` varchar(50) DEFAULT NULL,
  `cage_capacity` int(11) DEFAULT NULL,
  `current_caged` int(11) DEFAULT 0,
  `is_exist` varchar(50) DEFAULT 'true',
  `is_full` varchar(50) DEFAULT 'false',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cage_id`),
  KEY `FK_tbl_cage_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_cage_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE `tbl_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_inventory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_inventory`;
CREATE TABLE `tbl_inventory` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `item_description` varchar(250) DEFAULT NULL,
  `item_unit` varchar(50) DEFAULT NULL,
  `item_net_weight` float DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `FK_ tbl_inventory_tbl_category` (`category_id`),
  KEY `FK_tbl_inventory_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_inventory_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtblinventorytblcategory` FOREIGN KEY (`category_id`) REFERENCES `tbl_category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_operation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_operation`;
CREATE TABLE `tbl_operation` (
  `operation_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_type_id` int(11) DEFAULT NULL,
  `operation_date` date DEFAULT NULL,
  `pig_id` varchar(50) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `is_exist` varchar(50) DEFAULT 'true',
  `am_pm` varchar(50) DEFAULT NULL,
  `total_patient` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`operation_id`),
  KEY `FK_tbl_operation_tbl_pig` (`pig_id`),
  KEY `FK_tbl_operation_tbl_batch` (`batch_id`),
  KEY `FK_tbl_operation_tbl_cage` (`cage_id`),
  KEY `FK_tbl_operation_tbl_operation_type` (`operation_type_id`),
  KEY `FK_tbl_operation_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_operation_tbl_batch` FOREIGN KEY (`batch_id`) REFERENCES `tbl_batch` (`batch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_operation_tbl_cage` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_operation_tbl_operation_type` FOREIGN KEY (`operation_type_id`) REFERENCES `tbl_operation_type` (`operation_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_operation_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_operation_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_operation_item_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_operation_item_details`;
CREATE TABLE `tbl_operation_item_details` (
  `operation_item_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_item_details_id`),
  KEY `FK__tbl_operation_item` (`operation_id`),
  KEY `FK__ tbl_inventory_item` (`item_id`),
  CONSTRAINT `FKtblinventoryitem` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtbloperationitem` FOREIGN KEY (`operation_id`) REFERENCES `tbl_operation` (`operation_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_operation_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_operation_type`;
CREATE TABLE `tbl_operation_type` (
  `operation_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `operation_name` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`operation_type_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_pig
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_pig`;
CREATE TABLE `tbl_pig` (
  `pig_id` varchar(50) NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `breed_id` int(11) DEFAULT NULL,
  `pig_type` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `unit` varchar(50) DEFAULT 'kg',
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`pig_id`),
  KEY `FK__tbl_batch` (`batch_id`),
  KEY `FK__tbl_breed` (`breed_id`),
  KEY `FK_tbl_pig_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_pig_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtblbatch` FOREIGN KEY (`batch_id`) REFERENCES `tbl_batch` (`batch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtblpigtbl_breed` FOREIGN KEY (`breed_id`) REFERENCES `tbl_breed` (`breed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_pig_history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_pig_history`;
CREATE TABLE `tbl_pig_history` (
  `pig_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `pig_id` varchar(50) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `pig_tag` varchar(50) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `pig_status` varchar(50) DEFAULT 'active',
  `status` varchar(50) DEFAULT 'active',
  `is_exist` varchar(50) DEFAULT 'true',
  `remarks` varchar(250) DEFAULT NULL,
  `pig_history_status` varchar(50) DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`pig_history_id`),
  KEY `FK_tbl_pig_history_tbl_pig` (`pig_id`),
  KEY `FK_tbl_pig_history_tbl_cage` (`cage_id`),
  KEY `FK_tbl_pig_history_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_pig_history_tbl_cage` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_pig_history_tbl_pig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_pig_history_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 37 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_plan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_plan`;
CREATE TABLE `tbl_plan` (
  `plan_id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(250) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`plan_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_plan_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_plan_details`;
CREATE TABLE `tbl_plan_details` (
  `plan_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`plan_detail_id`),
  KEY `FK_tbl_plan_details_tbl_inventory` (`item_id`),
  KEY `FK_tbl_plan_details_tbl_plan` (`plan_id`),
  KEY `FK_tbl_plan_details_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_plan_details_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_plan_details_tbl_plan` FOREIGN KEY (`plan_id`) REFERENCES `tbl_plan` (`plan_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_plan_details_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 169 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_quarantine
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_quarantine`;
CREATE TABLE `tbl_quarantine` (
  `quarantine_id` int(11) NOT NULL AUTO_INCREMENT,
  `remarks` longtext DEFAULT NULL,
  `quarantine_date` date DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`quarantine_id`),
  KEY `FK_tbl_quarantine_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_quarantine_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_quarantine_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_quarantine_details`;
CREATE TABLE `tbl_quarantine_details` (
  `quarantine_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `quarantine_id` int(11) DEFAULT NULL,
  `cage_id` int(11) DEFAULT NULL,
  `pig_id` varchar(50) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  PRIMARY KEY (`quarantine_details_id`),
  KEY `FK__tbl_quarantine` (`quarantine_id`),
  KEY `FK__tbl_cage_q` (`cage_id`),
  KEY `FK__tbl_pig_q` (`pig_id`),
  CONSTRAINT `FKtblcageq` FOREIGN KEY (`cage_id`) REFERENCES `tbl_cage` (`cage_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtblquarantine` FOREIGN KEY (`quarantine_id`) REFERENCES `tbl_quarantine` (`quarantine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKtblquarantinedetailstblpig` FOREIGN KEY (`pig_id`) REFERENCES `tbl_pig` (`pig_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_stock_card
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_stock_card`;
CREATE TABLE `tbl_stock_card` (
  `stock_card_id` int(11) NOT NULL AUTO_INCREMENT,
  `opening_quantity` float DEFAULT NULL,
  `closing_quantity` float DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `transaction_date` date NOT NULL,
  `status` varchar(50) DEFAULT 'active',
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`stock_card_id`),
  KEY `FK__tbl_stock` (`item_id`) USING BTREE,
  KEY `FK_tbl_stock_card_tbl_users` (`user_id`),
  CONSTRAINT `FK_tbl_stock_card_tbl_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_stock_card_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_stock_card_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_stock_card_details`;
CREATE TABLE `tbl_stock_card_details` (
  `transaction_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_quantity` float DEFAULT NULL,
  `total_quantity` float DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `stock_card_id` int(11) DEFAULT NULL,
  `attachment` varchar(250) DEFAULT NULL,
  `remark` varchar(250) DEFAULT NULL,
  `is_exist` varchar(50) DEFAULT 'true',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`transaction_detail_id`),
  KEY `FK__tbl_stock_card` (`stock_card_id`),
  KEY `FK_tbl_stock_card_details_tbl_users` (`user_id`),
  CONSTRAINT `FK__tbl_stock_card` FOREIGN KEY (`stock_card_id`) REFERENCES `tbl_stock_card` (`stock_card_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_tbl_stock_card_details_tbl_users` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tbl_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci; # ------------------------------------------------------------
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
    `user_id`
  )
VALUES
  (1, 'Breeder', NULL, NULL, 3, 'true', NULL);
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    2,
    'Batch 2',
    'pig_8m81ngv5k5',
    'pig_5f1hbvl92w',
    2,
    'true',
    NULL
  );
INSERT INTO
  `tbl_batch` (
    `batch_id`,
    `batch_name`,
    `boar_id`,
    `sow_id`,
    `batch_capacity`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    3,
    'Batch 3',
    'pig_jpon3foiz8',
    'pig_c32cb41ril',
    3,
    'true',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_breed
# ------------------------------------------------------------

INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (1, 'Landrace', 'true', NULL);
INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (2, 'Duroc', 'true', NULL);
INSERT INTO
  `tbl_breed` (`breed_id`, `breed_name`, `is_exist`, `user_id`)
VALUES
  (3, 'Chinese Swine', 'true', NULL);

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
    1,
    'true',
    'true',
    NULL
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
    1,
    'true',
    'true',
    NULL
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
    1,
    'true',
    'true',
    NULL
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
    'Nursery 1',
    'Nursery Pens',
    20,
    2,
    'true',
    'false',
    NULL
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
    'Quarantine 1',
    'Quarantine Cage',
    10,
    1,
    'true',
    'false',
    NULL
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
    `user_id`
  )
VALUES
  (
    1,
    'BMEG 3000',
    1,
    'A bmeg item for 2months piglet',
    'kg',
    12,
    'true',
    NULL
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
    `user_id`
  )
VALUES
  (
    2,
    'BRMEG 400',
    1,
    'VIEPro Premium Fattening Pig Feed – Starter – 50kg.',
    'sack',
    50,
    'true',
    NULL
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
    `user_id`
  )
VALUES
  (
    3,
    'Ivermictin',
    2,
    'Deworming injectable medicine for pigs',
    'mg',
    100,
    'true',
    NULL
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
    `user_id`
  )
VALUES
  (
    4,
    'BMEG 30',
    1,
    'A bmeg item for 2months piglet',
    'sack',
    50,
    'true',
    NULL
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
    `user_id`
  )
VALUES
  (
    5,
    '2.5 Inch Needles',
    4,
    '2.5 inch injection',
    'pcs',
    1,
    'true',
    NULL
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
    `user_id`
  )
VALUES
  (
    6,
    'BRMEG 600',
    1,
    'VIEPro Premium Fattening Pig Feed – Starter – 50kg.',
    'sack',
    12,
    'true',
    2
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
    `user_id`
  )
VALUES
  (
    1,
    1,
    '2023-04-17',
    'pig_c32cb41ril',
    NULL,
    NULL,
    'confirmed',
    'true',
    'AM',
    12,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    2,
    1,
    '2023-04-19',
    'pig_c32cb41ril',
    NULL,
    NULL,
    'pending',
    'true',
    'PM',
    12,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    3,
    2,
    '2023-04-17',
    'pig_c32cb41ril',
    NULL,
    NULL,
    'confirmed',
    'true',
    NULL,
    12,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    4,
    3,
    '2023-04-17',
    'pig_c32cb41ril',
    NULL,
    NULL,
    'confirmed',
    'true',
    NULL,
    12,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    5,
    3,
    '2023-04-17',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    12,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    7,
    4,
    '2023-04-17',
    NULL,
    1,
    NULL,
    'confirmed',
    'true',
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    8,
    2,
    '2023-04-17',
    NULL,
    1,
    NULL,
    'pending',
    'true',
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    11,
    2,
    '2023-04-19',
    'pig_51czvqigek',
    NULL,
    NULL,
    'pending',
    'true',
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    12,
    3,
    '2023-04-20',
    'pig_5enujtw0h0',
    NULL,
    NULL,
    'confirmed',
    'true',
    NULL,
    1,
    NULL
  );
INSERT INTO
  `tbl_operation` (
    `operation_id`,
    `operation_type_id`,
    `operation_date`,
    `pig_id`,
    `batch_id`,
    `cage_id`,
    `status`,
    `is_exist`,
    `am_pm`,
    `total_patient`,
    `user_id`
  )
VALUES
  (
    13,
    3,
    '2023-04-21',
    NULL,
    NULL,
    1,
    'canceled',
    'true',
    NULL,
    1,
    NULL
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
  (1, 1, 1, 50, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (2, 2, 1, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (3, 3, 3, 0.5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (4, 4, 3, 1, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (5, 5, 3, 1, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (6, 7, 3, 0.5, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (7, 8, 3, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (8, 11, 3, NULL, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (9, 12, 3, 7, 'true');
INSERT INTO
  `tbl_operation_item_details` (
    `operation_item_details_id`,
    `operation_id`,
    `item_id`,
    `quantity`,
    `is_exist`
  )
VALUES
  (10, 13, NULL, NULL, 'true');

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
    `batch_id`,
    `breed_id`,
    `pig_type`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    'pig_51czvqigek',
    1,
    1,
    'Sow',
    '2023-04-17',
    'kg',
    'true',
    NULL
  );
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `batch_id`,
    `breed_id`,
    `pig_type`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    'pig_5enujtw0h0',
    3,
    1,
    'Piglet',
    '2023-04-16',
    'kg',
    'true',
    NULL
  );
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `batch_id`,
    `breed_id`,
    `pig_type`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    'pig_c32cb41ril',
    1,
    1,
    'Sow',
    '2023-04-17',
    'kg',
    'true',
    NULL
  );
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `batch_id`,
    `breed_id`,
    `pig_type`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    'pig_jpk7racr9l',
    3,
    1,
    'Piglet',
    '2023-04-16',
    'kg',
    'true',
    NULL
  );
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `batch_id`,
    `breed_id`,
    `pig_type`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    'pig_jpon3foiz8',
    1,
    2,
    'Boar',
    '2023-04-17',
    'kg',
    'true',
    NULL
  );
INSERT INTO
  `tbl_pig` (
    `pig_id`,
    `batch_id`,
    `breed_id`,
    `pig_type`,
    `birthdate`,
    `unit`,
    `is_exist`,
    `user_id`
  )
VALUES
  (
    'pig_ysyn4zgjoi',
    3,
    1,
    'Piglet',
    '2023-04-16',
    'kg',
    'true',
    NULL
  );

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
    `user_id`
  )
VALUES
  (
    1,
    'pig_c32cb41ril',
    1,
    '12',
    50,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-18 14:25:53',
    NULL
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
    `user_id`
  )
VALUES
  (
    2,
    'pig_jpon3foiz8',
    2,
    'SW-324',
    50,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-18 14:25:53',
    NULL
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
    `user_id`
  )
VALUES
  (
    3,
    'pig_51czvqigek',
    3,
    'SW-325',
    50,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-18 14:25:53',
    NULL
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
    `user_id`
  )
VALUES
  (
    4,
    'pig_ysyn4zgjoi',
    4,
    'SW-325',
    NULL,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-18 14:25:53',
    NULL
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
    `user_id`
  )
VALUES
  (
    5,
    'pig_jpk7racr9l',
    4,
    'lj547',
    NULL,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-18 14:25:53',
    NULL
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
    `user_id`
  )
VALUES
  (
    6,
    'pig_5enujtw0h0',
    4,
    'SW-324',
    NULL,
    'active',
    'active',
    'true',
    NULL,
    'inactive',
    '2023-04-18 14:25:53',
    NULL
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
    `user_id`
  )
VALUES
  (
    8,
    'pig_c32cb41ril',
    5,
    '12',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever 24 hours ago',
    'inactive',
    '2023-04-18 14:25:53',
    NULL
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
    `user_id`
  )
VALUES
  (
    9,
    'pig_jpon3foiz8',
    5,
    'SW-324',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever past 24 hours',
    'inactive',
    '2023-04-18 14:38:59',
    NULL
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
    `user_id`
  )
VALUES
  (
    10,
    'pig_jpon3foiz8',
    5,
    'SW-324',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever for past 12 hours',
    'inactive',
    '2023-04-18 14:46:47',
    NULL
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
    `user_id`
  )
VALUES
  (
    11,
    'pig_51czvqigek',
    5,
    'SW-325',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever ',
    'inactive',
    '2023-04-18 14:49:55',
    NULL
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
    `user_id`
  )
VALUES
  (
    12,
    'pig_51czvqigek',
    5,
    'SW-325',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-08 14:50:57',
    NULL
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
    `user_id`
  )
VALUES
  (
    13,
    'pig_51czvqigek',
    5,
    'SW-325',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 14:51:29',
    NULL
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
    `user_id`
  )
VALUES
  (
    14,
    'pig_51czvqigek',
    5,
    'SW-325',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 14:52:22',
    NULL
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
    `user_id`
  )
VALUES
  (
    15,
    'pig_ysyn4zgjoi',
    5,
    'SW-325',
    NULL,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 14:54:47',
    NULL
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
    `user_id`
  )
VALUES
  (
    16,
    'pig_jpk7racr9l',
    5,
    'lj547',
    NULL,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 14:55:25',
    NULL
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
    `user_id`
  )
VALUES
  (
    17,
    'pig_5enujtw0h0',
    5,
    'SW-324',
    NULL,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 14:56:03',
    NULL
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
    `user_id`
  )
VALUES
  (
    18,
    'pig_51czvqigek',
    1,
    'SW-325',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-14 15:14:10',
    NULL
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
    `user_id`
  )
VALUES
  (
    19,
    'pig_5enujtw0h0',
    2,
    'SW-324',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-18 15:23:29',
    NULL
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
    `user_id`
  )
VALUES
  (
    20,
    'pig_c32cb41ril',
    3,
    '12',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-18 15:25:17',
    NULL
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
    `user_id`
  )
VALUES
  (
    21,
    'pig_jpk7racr9l',
    5,
    'lj547',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-18 15:26:58',
    NULL
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
    `user_id`
  )
VALUES
  (
    22,
    'pig_jpk7racr9l',
    4,
    'lj547',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-18 15:27:24',
    NULL
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
    `user_id`
  )
VALUES
  (
    23,
    'pig_jpon3foiz8',
    4,
    'SW-324',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-18 15:27:40',
    NULL
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
    `user_id`
  )
VALUES
  (
    24,
    'pig_ysyn4zgjoi',
    4,
    'SW-325',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-18 15:27:54',
    NULL
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
    `user_id`
  )
VALUES
  (
    25,
    'pig_51czvqigek',
    5,
    'SW-325',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever ',
    'inactive',
    '2023-04-10 18:52:41',
    NULL
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
    `user_id`
  )
VALUES
  (
    26,
    'pig_c32cb41ril',
    5,
    '12',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 18:57:04',
    NULL
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
    `user_id`
  )
VALUES
  (
    27,
    'pig_c32cb41ril',
    5,
    '12',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'active',
    '2023-04-18 18:59:36',
    NULL
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
    `user_id`
  )
VALUES
  (
    28,
    'pig_5enujtw0h0',
    5,
    'SW-324',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 19:01:37',
    NULL
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
    `user_id`
  )
VALUES
  (
    29,
    'pig_jpon3foiz8',
    5,
    'SW-324',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 19:02:23',
    NULL
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
    `user_id`
  )
VALUES
  (
    30,
    'pig_jpk7racr9l',
    5,
    'lj547',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'inactive',
    '2023-04-18 19:02:42',
    NULL
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
    `user_id`
  )
VALUES
  (
    31,
    'pig_ysyn4zgjoi',
    5,
    'SW-325',
    50,
    'Quarantined',
    'active',
    'true',
    'High Fever',
    'active',
    '2023-04-18 19:04:19',
    NULL
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
    `user_id`
  )
VALUES
  (
    32,
    'pig_51czvqigek',
    1,
    'SW-325',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'active',
    '2023-04-18 19:06:36',
    NULL
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
    `user_id`
  )
VALUES
  (
    33,
    'pig_5enujtw0h0',
    2,
    'SW-324',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'inactive',
    '2023-04-18 19:09:07',
    NULL
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
    `user_id`
  )
VALUES
  (
    34,
    'pig_jpk7racr9l',
    4,
    'lj547',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'active',
    '2023-04-18 19:34:36',
    NULL
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
    `user_id`
  )
VALUES
  (
    35,
    'pig_jpon3foiz8',
    4,
    'SW-324',
    50,
    'active',
    'active',
    'true',
    'Updated information of pig.',
    'active',
    '2023-04-18 19:34:55',
    NULL
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
    `user_id`
  )
VALUES
  (
    36,
    'pig_5enujtw0h0',
    2,
    'SW-324',
    50.54,
    'active',
    'active',
    'true',
    '',
    'active',
    '2023-04-20 02:53:40',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_plan
# ------------------------------------------------------------

INSERT INTO
  `tbl_plan` (`plan_id`, `plan_name`, `is_exist`)
VALUES
  (1, 'Forrowing', 'false');
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
  (1, 2, 1, 4, 'feeding', 'true', 3);
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
  (2, 2, 2, 4, 'feeding', 'true', 3);
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
  (3, 2, 3, 4, 'feeding', 'true', 3);
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
  (4, 2, 4, 4, 'feeding', 'true', 3);
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
  (5, 2, 5, 4, 'feeding', 'true', 3);
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
  (6, 2, 6, 4, 'feeding', 'true', 3);
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
  (7, 2, 7, 4, 'feeding', 'true', 3);
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
  (8, 2, 8, 4, 'feeding', 'true', 3);
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
  (9, 2, 9, 4, 'feeding', 'true', 3);
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
  (10, 2, 10, 4, 'feeding', 'true', 3);
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
  (11, 2, 11, 4, 'feeding', 'true', 3);
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
  (12, 2, 12, 4, 'feeding', 'true', 3);
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
  (13, 2, 13, 4, 'feeding', 'true', 3);
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
  (14, 2, 14, 4, 'feeding', 'true', 3);
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
  (15, 2, 15, 4, 'feeding', 'true', 3);
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
  (16, 2, 16, 4, 'feeding', 'true', 3);
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
  (17, 2, 17, 4, 'feeding', 'true', 3);
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
  (18, 2, 18, 4, 'feeding', 'true', 3);
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
  (19, 2, 19, 4, 'feeding', 'true', 3);
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
  (20, 2, 20, 4, 'feeding', 'true', 3);
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
  (21, 2, 21, 4, 'feeding', 'true', 3);
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
  (22, 2, 22, 4, 'feeding', 'true', 3);
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
  (23, 2, 23, 4, 'feeding', 'true', 3);
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
  (24, 2, 24, 4, 'feeding', 'true', 3);
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
  (25, 2, 25, 4, 'feeding', 'true', 3);
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
  (26, 2, 26, 4, 'feeding', 'true', 3);
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
  (27, 2, 27, 4, 'feeding', 'true', 3);
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
  (28, 2, 28, 4, 'feeding', 'true', 3);
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
  (29, 2, 29, 4, 'feeding', 'true', 3);
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
  (30, 2, 30, 4, 'feeding', 'true', 3);
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
  (31, 2, 31, 4, 'feeding', 'true', 3);
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
  (32, 2, 32, 4, 'feeding', 'true', 3);
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
  (33, 2, 33, 4, 'feeding', 'true', 3);
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
  (34, 2, 34, 4, 'feeding', 'true', 3);
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
  (35, 2, 35, 4, 'feeding', 'true', 3);
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
  (36, 2, 36, 4, 'feeding', 'true', 3);
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
  (37, 2, 37, 4, 'feeding', 'true', 3);
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
  (38, 2, 38, 4, 'feeding', 'true', 3);
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
  (39, 2, 39, 4, 'feeding', 'true', 3);
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
  (40, 2, 40, 4, 'feeding', 'true', 3);
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
  (41, 2, 41, 4, 'feeding', 'true', 3);
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
  (42, 2, 42, 4, 'feeding', 'true', 3);
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
  (43, 2, 43, 4, 'feeding', 'true', 3);
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
  (44, 2, 44, 4, 'feeding', 'true', 3);
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
  (45, 2, 45, 4, 'feeding', 'true', 3);
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
  (46, 2, 46, 4, 'feeding', 'true', 3);
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
  (47, 2, 47, 4, 'feeding', 'true', 3);
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
  (48, 2, 48, 4, 'feeding', 'true', 3);
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
  (49, 2, 49, 4, 'feeding', 'true', 3);
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
  (50, 2, 50, 4, 'feeding', 'true', 3);
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
  (51, 2, 51, 4, 'feeding', 'true', 3);
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
  (52, 2, 52, 4, 'feeding', 'true', 3);
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
  (53, 2, 53, 4, 'feeding', 'true', 3);
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
  (54, 2, 54, 4, 'feeding', 'true', 3);
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
  (55, 2, 55, 4, 'feeding', 'true', 3);
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
  (56, 2, 56, 4, 'feeding', 'true', 3);
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
  (57, 3, 1, 6, 'feeding', 'true', 3);
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
  (58, 3, 2, 6, 'feeding', 'true', 3);
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
  (59, 3, 3, 6, 'feeding', 'true', 3);
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
  (60, 3, 4, 6, 'feeding', 'true', 3);
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
  (61, 3, 5, 6, 'feeding', 'true', 3);
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
  (62, 3, 6, 6, 'feeding', 'true', 3);
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
  (63, 3, 7, 6, 'feeding', 'true', 3);
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
  (64, 3, 8, 6, 'feeding', 'true', 3);
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
  (65, 3, 9, 6, 'feeding', 'true', 3);
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
  (66, 3, 10, 6, 'feeding', 'true', 3);
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
  (67, 3, 11, 6, 'feeding', 'true', 3);
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
  (68, 3, 12, 6, 'feeding', 'true', 3);
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
  (69, 3, 13, 6, 'feeding', 'true', 3);
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
  (70, 3, 14, 6, 'feeding', 'true', 3);
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
  (71, 3, 15, 6, 'feeding', 'true', 3);
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
  (72, 3, 16, 6, 'feeding', 'true', 3);
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
  (73, 3, 17, 6, 'feeding', 'true', 3);
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
  (74, 3, 18, 6, 'feeding', 'true', 3);
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
  (75, 3, 19, 6, 'feeding', 'true', 3);
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
  (76, 3, 20, 6, 'feeding', 'true', 3);
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
  (77, 3, 21, 6, 'feeding', 'true', 3);
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
  (78, 3, 22, 6, 'feeding', 'true', 3);
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
  (79, 3, 23, 6, 'feeding', 'true', 3);
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
  (80, 3, 24, 6, 'feeding', 'true', 3);
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
  (81, 3, 25, 6, 'feeding', 'true', 3);
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
  (82, 3, 26, 6, 'feeding', 'true', 3);
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
  (83, 3, 27, 6, 'feeding', 'true', 3);
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
  (84, 3, 28, 6, 'feeding', 'true', 3);
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
  (85, 3, 29, 6, 'feeding', 'true', 3);
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
  (86, 3, 30, 6, 'feeding', 'true', 3);
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
  (87, 3, 31, 6, 'feeding', 'true', 3);
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
  (88, 3, 32, 6, 'feeding', 'true', 3);
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
  (89, 3, 33, 6, 'feeding', 'true', 3);
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
  (90, 3, 34, 6, 'feeding', 'true', 3);
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
  (91, 3, 35, 6, 'feeding', 'true', 3);
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
  (92, 3, 36, 6, 'feeding', 'true', 3);
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
  (93, 3, 37, 6, 'feeding', 'true', 3);
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
  (94, 3, 38, 6, 'feeding', 'true', 3);
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
  (95, 3, 39, 6, 'feeding', 'true', 3);
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
  (96, 3, 40, 6, 'feeding', 'true', 3);
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
  (97, 3, 41, 6, 'feeding', 'true', 3);
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
  (98, 3, 42, 6, 'feeding', 'true', 3);
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
  (99, 3, 43, 6, 'feeding', 'true', 3);
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
  (100, 3, 44, 6, 'feeding', 'true', 3);
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
  (101, 3, 45, 6, 'feeding', 'true', 3);
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
  (102, 3, 46, 6, 'feeding', 'true', 3);
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
  (103, 3, 47, 6, 'feeding', 'true', 3);
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
  (104, 3, 48, 6, 'feeding', 'true', 3);
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
  (105, 3, 49, 6, 'feeding', 'true', 3);
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
  (106, 3, 50, 6, 'feeding', 'true', 3);
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
  (107, 3, 51, 6, 'feeding', 'true', 3);
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
  (108, 3, 52, 6, 'feeding', 'true', 3);
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
  (109, 3, 53, 6, 'feeding', 'true', 3);
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
  (110, 3, 54, 6, 'feeding', 'true', 3);
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
  (111, 3, 55, 6, 'feeding', 'true', 3);
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
  (112, 3, 56, 6, 'feeding', 'true', 3);
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
  (113, 4, 1, 6, 'feeding', 'true', 3);
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
  (114, 4, 2, 6, 'feeding', 'true', 3);
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
  (115, 4, 3, 6, 'feeding', 'true', 3);
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
  (116, 4, 4, 6, 'feeding', 'true', 3);
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
  (117, 4, 5, 6, 'feeding', 'true', 3);
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
  (118, 4, 6, 6, 'feeding', 'true', 3);
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
  (119, 4, 7, 6, 'feeding', 'true', 3);
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
  (120, 4, 8, 6, 'feeding', 'true', 3);
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
  (121, 4, 9, 6, 'feeding', 'true', 3);
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
  (122, 4, 10, 6, 'feeding', 'true', 3);
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
  (123, 4, 11, 6, 'feeding', 'true', 3);
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
  (124, 4, 12, 6, 'feeding', 'true', 3);
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
  (125, 4, 13, 6, 'feeding', 'true', 3);
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
  (126, 4, 14, 6, 'feeding', 'true', 3);
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
  (127, 4, 15, 6, 'feeding', 'true', 3);
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
  (128, 4, 16, 6, 'feeding', 'true', 3);
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
  (129, 4, 17, 6, 'feeding', 'true', 3);
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
  (130, 4, 18, 6, 'feeding', 'true', 3);
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
  (131, 4, 19, 6, 'feeding', 'true', 3);
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
  (132, 4, 20, 6, 'feeding', 'true', 3);
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
  (133, 4, 21, 6, 'feeding', 'true', 3);
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
  (134, 4, 22, 6, 'feeding', 'true', 3);
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
  (135, 4, 23, 6, 'feeding', 'true', 3);
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
  (136, 4, 24, 6, 'feeding', 'true', 3);
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
  (137, 4, 25, 6, 'feeding', 'true', 3);
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
  (138, 4, 26, 6, 'feeding', 'true', 3);
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
  (139, 4, 27, 6, 'feeding', 'true', 3);
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
  (140, 4, 28, 6, 'feeding', 'true', 3);
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
  (141, 4, 29, 6, 'feeding', 'true', 3);
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
  (142, 4, 30, 6, 'feeding', 'true', 3);
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
  (143, 4, 31, 6, 'feeding', 'true', 3);
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
  (144, 4, 32, 6, 'feeding', 'true', 3);
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
  (145, 4, 33, 6, 'feeding', 'true', 3);
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
  (146, 4, 34, 6, 'feeding', 'true', 3);
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
  (147, 4, 35, 6, 'feeding', 'true', 3);
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
  (148, 4, 36, 6, 'feeding', 'true', 3);
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
  (149, 4, 37, 6, 'feeding', 'true', 3);
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
  (150, 4, 38, 6, 'feeding', 'true', 3);
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
  (151, 4, 39, 6, 'feeding', 'true', 3);
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
  (152, 4, 40, 6, 'feeding', 'true', 3);
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
  (153, 4, 41, 6, 'feeding', 'true', 3);
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
  (154, 4, 42, 6, 'feeding', 'true', 3);
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
  (155, 4, 43, 6, 'feeding', 'true', 3);
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
  (156, 4, 44, 6, 'feeding', 'true', 3);
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
  (157, 4, 45, 6, 'feeding', 'true', 3);
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
  (158, 4, 46, 6, 'feeding', 'true', 3);
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
  (159, 4, 47, 6, 'feeding', 'true', 3);
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
  (160, 4, 48, 6, 'feeding', 'true', 3);
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
  (161, 4, 49, 6, 'feeding', 'true', 3);
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
  (162, 4, 50, 6, 'feeding', 'true', 3);
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
  (163, 4, 51, 6, 'feeding', 'true', 3);
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
  (164, 4, 52, 6, 'feeding', 'true', 3);
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
  (165, 4, 53, 6, 'feeding', 'true', 3);
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
  (166, 4, 54, 6, 'feeding', 'true', 3);
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
  (167, 4, 55, 6, 'feeding', 'true', 3);
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
  (168, 4, 56, 6, 'feeding', 'true', 3);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_quarantine
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tbl_quarantine_details
# ------------------------------------------------------------


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
  (1, 0, 0, 1, '2023-04-15', 'active', 'true', NULL);
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
  (2, 0, 0, 2, '2023-04-16', 'active', 'true', NULL);
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
  (3, 0, 0, 3, '2023-04-16', 'active', 'true', NULL);
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
  (4, 0, 2500, 4, '2023-04-17', 'active', 'true', NULL);
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
  (5, 0, 100, 5, '2023-04-17', 'active', 'true', NULL);
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
  (6, 0, 0, 1, '2023-04-17', 'active', 'true', NULL);
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
  (7, 0, 600, 2, '2023-04-17', 'active', 'true', NULL);
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
  (9, 0, 4200, 3, '2023-04-17', 'active', 'true', NULL);
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
  (10, 0, 0, 6, '2023-04-19', 'active', 'true', 2);
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
  (11, 4200, 3000, 3, '2023-04-20', 'active', 'true', NULL);

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
    600,
    600,
    'IN',
    '2026-07-17',
    6,
    'public/attachments/8404411826.jpeg',
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
    600,
    600,
    'IN',
    '2027-06-25',
    7,
    'public/attachments/8404411826.jpeg',
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
    100,
    100,
    'IN',
    NULL,
    5,
    'public/attachments/8404411826.jpeg',
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
    600,
    0,
    'OUT',
    NULL,
    6,
    NULL,
    'Scheduled Activity',
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
    4500,
    4500,
    'IN',
    '2027-06-25',
    9,
    'public/attachments/2258053647.jpeg',
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
    4,
    'public/attachments/2258053647.jpeg',
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
    50,
    4450,
    'OUT',
    NULL,
    9,
    NULL,
    'Scheduled Activity',
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
    100,
    4350,
    'OUT',
    NULL,
    9,
    NULL,
    'Scheduled Activity',
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
    100,
    4250,
    'OUT',
    NULL,
    9,
    NULL,
    'Scheduled Activity',
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
    50,
    4200,
    'OUT',
    NULL,
    9,
    NULL,
    'Scheduled Activity',
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
    500,
    3700,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
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
    12,
    700,
    3000,
    'OUT',
    NULL,
    11,
    NULL,
    'Scheduled Activity',
    'true',
    NULL
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
    'ejayz',
    '$2b$10$LmRX4aBeWMTSIMQvVTi2Z.MS8h/YEQiVRgHaRsTVrj/shqfO01q1K',
    'April Jude',
    'Dapulang',
    'Provido',
    '9082294975',
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
    'ejayz',
    '$2b$10$HEZtqsnVID2bxNFWYbCwteio9z2Nm/gYP6yL9fi3p7GgRZC.f9lla',
    'April Jude',
    '',
    'Provido',
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
    'ejayz',
    '$2b$10$mJT1xMlS4NTNjcgjj5gSdeGoa07XNN/4rNdzU/RlFvFXNq0pryOLO',
    'April Jude',
    '',
    'Provido',
    '9082294975',
    'veterinarian',
    'true'
  );