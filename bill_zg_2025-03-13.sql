# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20087
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 9.2.0)
# 数据库: bill_zg
# 生成时间: 2025-03-13 15:17:24 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# 转储表 company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

INSERT INTO `company` (`id`, `name`, `address`, `phone`, `create_time`, `update_time`, `deletedDate`)
VALUES
	(10,'上海昂闲科技有限公司','ShangHai zhangjiang','13345678955','2025-03-13 21:22:16.832973','2025-03-13 21:52:40.000000',NULL),
	(11,'上海昂闲科技有限公司','shanghai zhangjiang','13564548667','2025-03-13 21:52:26.925798','2025-03-13 21:52:26.925798',NULL);

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `deliver` int NOT NULL DEFAULT '0',
  `level` int NOT NULL,
  `discount` int NOT NULL,
  `template` int NOT NULL,
  `no` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `fullname`, `contact`, `phone`, `email`, `address`, `deliver`, `level`, `discount`, `template`, `no`, `desc`, `create_time`, `update_time`)
VALUES
	(1,'feng nick','','13564548667','nick.feng3@cp.com','shanghai zhangjiang',0,1,100,1,'0','3333','2025-03-13 22:31:04.414045','2025-03-13 22:31:04.414045');

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `type` int NOT NULL,
  `route` varchar(255) NOT NULL,
  `order` int NOT NULL,
  `component` varchar(255) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_23ac1b81a7bfb85b14e86bd23a5` (`parentId`),
  CONSTRAINT `FK_23ac1b81a7bfb85b14e86bd23a5` FOREIGN KEY (`parentId`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;

INSERT INTO `menu` (`id`, `label`, `name`, `icon`, `type`, `route`, `order`, `component`, `create_time`, `update_time`, `parentId`)
VALUES
	(1,'sys.menu.dashboard','Dashboard','ic-analysis',0,'dashboard',1,'','2025-03-08 11:41:28.887279','2025-03-08 11:41:28.887279',NULL),
	(2,'sys.menu.workbench','Workbench','',1,'workbench',1,'/dashboard/workbench/index.tsx','2025-03-08 11:41:28.892452','2025-03-08 11:41:28.892452',1),
	(3,'sys.menu.analysis','Analysis','',1,'analysis',1,'/dashboard/analysis/index.tsx','2025-03-08 11:41:28.894702','2025-03-08 11:41:28.894702',1),
	(4,'sys.menu.management','Management','ic-management',0,'management',2,'','2025-03-08 11:41:28.896606','2025-03-08 11:41:28.896606',NULL),
	(8,'sys.menu.system.index','System','',0,'system',1,'','2025-03-08 11:41:28.902912','2025-03-08 11:41:28.902912',4),
	(10,'sys.menu.system.permission','Permission','',1,'permission',1,'/management/system/permission/index.tsx','2025-03-08 11:41:28.906014','2025-03-08 11:41:28.906014',8),
	(11,'sys.menu.system.role','Role','',1,'role',1,'/management/system/role/index.tsx','2025-03-08 11:41:28.907842','2025-03-08 11:41:28.907842',8),
	(12,'sys.menu.system.user','User','',1,'user',1,'/management/system/user/index.tsx','2025-03-08 11:41:28.909512','2025-03-08 11:41:28.909512',8),
	(38,'sys.menu.calendar','Calendar','solar:calendar-bold-duotone',1,'calendar',1,'/sys/others/calendar/index.tsx','2025-03-08 11:41:28.948108','2025-03-08 11:41:28.948108',NULL),
	(50,'sys.product.list','product list','nimbus--calendar',0,'products',1,'/management/user/product/index.tsx','2025-03-12 16:21:37.657012','2025-03-12 17:08:28.090105',NULL),
	(51,'sys.product.unit','product unit','',1,'products/unit',1,'/management/user/productUnit/index.tsx','2025-03-12 16:52:20.951854','2025-03-12 17:06:51.904334',50),
	(52,'sys.product.template','product template','',1,'products/template',1,'/management/user/productTemplate/index.tsx','2025-03-12 16:53:07.519749','2025-03-12 17:06:52.581020',50),
	(53,'sys.product.table','product ','',1,'products/dashboard',0,'/management/user/product/index.tsx','2025-03-12 17:03:59.528203','2025-03-12 17:06:53.197782',50),
	(54,'sys.product.category','product category','',1,'products/catetory',100,'/management/user/productCategory/index.tsx','2025-03-13 20:36:11.853902','2025-03-13 20:45:09.000000',50),
	(55,'sys.customer.title','客户管理','',0,'customer',1,'customer','2025-03-13 21:08:42.259786','2025-03-13 21:08:42.259786',NULL),
	(56,'sys.company.title','公司管理','',1,'company',100,'/management/system/company/index.tsx','2025-03-13 21:19:58.219147','2025-03-13 21:19:58.219147',8),
	(57,'sys.customer.list','客户管理','',1,'list',100,'/management/user/customer/index.tsx','2025-03-13 22:01:52.919649','2025-03-13 22:25:20.000000',55);

/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 menu_closure
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menu_closure`;

CREATE TABLE `menu_closure` (
  `id_ancestor` int NOT NULL,
  `id_descendant` int NOT NULL,
  PRIMARY KEY (`id_ancestor`,`id_descendant`),
  KEY `IDX_2547be0cdfeccb9221c68976fd` (`id_ancestor`),
  KEY `IDX_6a0038e7e00bb09a06ba3b1131` (`id_descendant`),
  CONSTRAINT `FK_2547be0cdfeccb9221c68976fd7` FOREIGN KEY (`id_ancestor`) REFERENCES `menu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_6a0038e7e00bb09a06ba3b11319` FOREIGN KEY (`id_descendant`) REFERENCES `menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `menu_closure` WRITE;
/*!40000 ALTER TABLE `menu_closure` DISABLE KEYS */;

INSERT INTO `menu_closure` (`id_ancestor`, `id_descendant`)
VALUES
	(1,1),
	(1,2),
	(1,3),
	(2,2),
	(3,3),
	(4,4),
	(4,8),
	(4,10),
	(4,11),
	(4,12),
	(4,56),
	(8,8),
	(8,10),
	(8,11),
	(8,12),
	(8,56),
	(10,10),
	(11,11),
	(12,12),
	(38,38),
	(50,50),
	(50,51),
	(50,52),
	(50,53),
	(50,54),
	(51,51),
	(52,52),
	(53,53),
	(54,54),
	(55,55),
	(55,57),
	(56,56),
	(57,57);

/*!40000 ALTER TABLE `menu_closure` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `cost` int NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `unitId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ff0c0301a95e517153df97f6812` (`categoryId`),
  KEY `FK_2ee96d5eff55f14a6e37470b782` (`unitId`),
  CONSTRAINT `FK_2ee96d5eff55f14a6e37470b782` FOREIGN KEY (`unitId`) REFERENCES `product_unit` (`id`),
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `name`, `label`, `desc`, `price`, `cost`, `create_time`, `update_time`, `deletedDate`, `categoryId`, `unitId`)
VALUES
	(1,'纸 * 1.0','纸','打发斯蒂芬',5,6,'2025-03-13 20:54:19.434356','2025-03-13 21:03:30.000000','2025-03-13 21:03:30.000000',2,2),
	(2,'纸 * 1.0	','1','1232',5,6,'2025-03-13 21:03:41.506171','2025-03-13 21:03:41.506171',NULL,1,2),
	(3,'纸 * 2.0	','1','',6,7,'2025-03-13 21:04:08.875972','2025-03-13 21:04:08.875972',NULL,1,2);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 product_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;

INSERT INTO `product_category` (`id`, `name`, `label`, `desc`, `create_time`, `update_time`)
VALUES
	(1,'纸','adsfas','111','2025-03-13 20:37:01.475013','2025-03-13 20:53:10.000000'),
	(2,'装订方式','1','1','2025-03-13 20:53:24.815541','2025-03-13 20:53:24.815541');

/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 product_unit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_unit`;

CREATE TABLE `product_unit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product_unit` WRITE;
/*!40000 ALTER TABLE `product_unit` DISABLE KEYS */;

INSERT INTO `product_unit` (`id`, `name`, `label`, `desc`, `create_time`, `update_time`)
VALUES
	(2,'张','张','张','2025-03-13 20:34:24.585124','2025-03-13 20:34:24.585124');

/*!40000 ALTER TABLE `product_unit` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `order` int NOT NULL,
  `status` int NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`id`, `name`, `label`, `desc`, `order`, `status`, `create_time`, `update_time`, `deletedDate`)
VALUES
	(1,'超级管理员','admin','Super Admin',1,1,'2025-03-08 11:41:28.958972','2025-03-12 15:57:49.000000',NULL),
	(2,'基础版用户','test','test',2,1,'2025-03-08 11:41:28.960698','2025-03-12 15:58:05.000000',NULL),
	(3,'2','1','dd',100,0,'2025-03-10 14:27:17.992567','2025-03-10 14:56:03.000000','2025-03-10 14:56:03.000000'),
	(4,'12312','12312','3123123',100,0,'2025-03-10 14:28:47.008506','2025-03-10 14:55:58.000000','2025-03-10 14:55:58.000000'),
	(5,'43','114','11',100,1,'2025-03-10 14:45:01.382135','2025-03-10 15:31:09.000000','2025-03-10 15:31:09.000000'),
	(6,'123123','3123','123123',100,1,'2025-03-10 15:01:06.122938','2025-03-10 15:31:06.000000','2025-03-10 15:31:06.000000'),
	(7,'234','88','65656',100,1,'2025-03-10 15:28:50.632576','2025-03-10 15:31:04.000000','2025-03-10 15:31:04.000000');

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 role_menus_menu
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role_menus_menu`;

CREATE TABLE `role_menus_menu` (
  `roleId` int NOT NULL,
  `menuId` int NOT NULL,
  PRIMARY KEY (`roleId`,`menuId`),
  KEY `IDX_eec9c5cb17157b2294fd9f0edb` (`roleId`),
  KEY `IDX_f1adc6be166630ee2476d7bbf0` (`menuId`),
  CONSTRAINT `FK_eec9c5cb17157b2294fd9f0edbf` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f1adc6be166630ee2476d7bbf09` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `role_menus_menu` WRITE;
/*!40000 ALTER TABLE `role_menus_menu` DISABLE KEYS */;

INSERT INTO `role_menus_menu` (`roleId`, `menuId`)
VALUES
	(1,1),
	(1,2),
	(1,3),
	(1,4),
	(1,8),
	(1,10),
	(1,11),
	(1,12),
	(1,38),
	(1,50),
	(1,51),
	(1,52),
	(1,53),
	(1,54),
	(1,55),
	(1,56),
	(1,57),
	(2,1),
	(2,2),
	(2,3),
	(2,4),
	(2,8),
	(2,10),
	(2,11),
	(2,12),
	(3,1),
	(3,2),
	(3,3),
	(3,4),
	(3,8),
	(3,10),
	(3,11),
	(3,12),
	(3,38),
	(5,4),
	(5,8),
	(5,10),
	(5,11),
	(5,12);

/*!40000 ALTER TABLE `role_menus_menu` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `template`;

CREATE TABLE `template` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# 转储表 template_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `template_category`;

CREATE TABLE `template_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2df7de1834ccedb6d528934d24a` (`categoryId`),
  CONSTRAINT `FK_2df7de1834ccedb6d528934d24a` FOREIGN KEY (`categoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# 转储表 template_category_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `template_category_product`;

CREATE TABLE `template_category_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `templateCategoryId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_db4ba3786339b8261c4c7d36a37` (`templateCategoryId`),
  KEY `FK_8ed1722c11c0ddc24827211b85f` (`productId`),
  CONSTRAINT `FK_8ed1722c11c0ddc24827211b85f` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_db4ba3786339b8261c4c7d36a37` FOREIGN KEY (`templateCategoryId`) REFERENCES `template_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# 转储表 user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `companyId` int DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `validateDate` int NOT NULL DEFAULT '30',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c12537c5ea29a60dbeb6319e64` (`email`,`fullname`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  KEY `FK_86586021a26d1180b0968f98502` (`companyId`),
  CONSTRAINT `FK_86586021a26d1180b0968f98502` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `fullname`, `companyId`, `email`, `password`, `avatar`, `address`, `phone`, `roleId`, `isActive`, `validateDate`, `create_time`, `update_time`, `deletedDate`)
VALUES
	(1,'admin',10,'nick@126.com','512ab25c35d7fc5862b7371339b8037d8b857f93a9b7002906560ca61a438b7a','','ceshi','13564548667',1,1,30,'2025-03-13 00:18:29.400890','2025-03-13 21:26:56.000000',NULL),
	(2,'Test',10,'nick1@126.com','512ab25c35d7fc5862b7371339b8037d8b857f93a9b7002906560ca61a438b7a','','ceshi','13564548667',2,1,30,'2025-03-13 00:18:29.403541','2025-03-13 21:27:03.000000',NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
