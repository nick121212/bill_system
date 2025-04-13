# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20089
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 9.2.0)
# 数据库: bill_zg
# 生成时间: 2025-04-13 03:46:20 +0000
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
	(10,'Coupang','ShangHai zhangjiang','13345678955','2025-03-13 21:22:16.832973','2025-04-01 10:49:53.000000',NULL),
	(11,'Coupang','shanghai zhangjiang','13564548667','2025-03-13 21:52:26.925798','2025-04-01 10:49:42.000000',NULL);

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
  `deletedDate` datetime(6) DEFAULT NULL,
  `companyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `fullname`, `contact`, `phone`, `email`, `address`, `deliver`, `level`, `discount`, `template`, `no`, `desc`, `create_time`, `update_time`, `deletedDate`, `companyId`, `userId`)
VALUES
	(1,'feng nick','11','13564548667','nick.feng3@cp.com','shanghai zhangjiang',0,1,100,1,'0','3333','2025-03-13 22:31:04.414045','2025-03-15 23:34:58.662931',NULL,10,1),
	(2,'lyx','44','1111111111111','lyx@126.com','shanghai',0,1,100,1,'0','4444','2025-03-15 19:58:41.758660','2025-03-15 23:34:57.079669',NULL,10,1),
	(3,'123','','13564548667','123123@111.com','shanghai zhangjiang',0,1,100,1,'0','','2025-03-15 23:35:40.006524','2025-03-15 23:36:35.978547',NULL,10,1),
	(4,'feng nick','','13564548667','3234@126.com','shanghai zhangjiang',0,1,100,1,'0','','2025-03-15 23:36:47.992769','2025-03-15 23:36:51.000000','2025-03-15 23:36:51.000000',10,1),
	(5,'顾总','','13564548667','nick121212@126.com','shanghai zhangjiang',0,1,100,1,'0','大姐夫卡拉多','2025-03-30 14:38:25.479236','2025-03-30 14:38:25.479236',NULL,10,1);

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
	(1,'sys.menu.workbench','Dashboard','',1,'dashboard',1,'/dashboard/workbench/index.tsx','2025-03-08 11:41:28.887279','2025-04-03 21:48:06.000000',NULL),
	(4,'sys.menu.management','Management','',0,'management',2,'','2025-03-08 11:41:28.896606','2025-04-03 21:45:52.000000',NULL),
	(8,'sys.menu.system.index','System','',0,'system',1,'','2025-03-08 11:41:28.902912','2025-03-08 11:41:28.902912',4),
	(10,'sys.menu.system.permission','Permission','',1,'permission',1,'/management/system/permission/index.tsx','2025-03-08 11:41:28.906014','2025-03-08 11:41:28.906014',8),
	(11,'sys.menu.system.role','Role','',1,'role',100,'/management/system/role/index.tsx','2025-03-08 11:41:28.907842','2025-03-16 01:01:24.000000',8),
	(12,'sys.menu.system.user','User','',1,'user',1,'/management/system/user/index.tsx','2025-03-08 11:41:28.909512','2025-03-08 11:41:28.909512',8),
	(38,'sys.menu.calendar','Calendar','solar:calendar-bold-duotone',1,'calendar',6,'/sys/others/calendar/index.tsx','2025-03-08 11:41:28.948108','2025-03-16 00:53:20.000000',NULL),
	(50,'sys.product.list','product list','',0,'products',1,'/management/user/product/index.tsx','2025-03-12 16:21:37.657012','2025-03-16 00:54:46.000000',NULL),
	(51,'sys.product.unit','product unit','',1,'products/unit',1,'/management/user/productUnit/index.tsx','2025-03-12 16:52:20.951854','2025-03-12 17:06:51.904334',50),
	(52,'sys.product.template','product template','',1,'products/template',1,'/management/user/productTemplate/index.tsx','2025-03-12 16:53:07.519749','2025-03-12 17:06:52.581020',50),
	(53,'sys.product.table','product ','',1,'products/dashboard',0,'/management/user/product/index.tsx','2025-03-12 17:03:59.528203','2025-03-12 17:06:53.197782',50),
	(54,'sys.product.category','product category','',1,'products/catetory',100,'/management/user/productCategory/index.tsx','2025-03-13 20:36:11.853902','2025-03-13 20:45:09.000000',50),
	(55,'sys.customer.title','客户管理','',0,'customer',1,'customer','2025-03-13 21:08:42.259786','2025-03-13 21:08:42.259786',NULL),
	(56,'sys.company.title','公司管理','',1,'company',100,'/management/system/company/index.tsx','2025-03-13 21:19:58.219147','2025-03-13 21:19:58.219147',8),
	(57,'sys.customer.list','客户管理','',1,'list',100,'/management/user/customer/index.tsx','2025-03-13 22:01:52.919649','2025-03-13 22:25:20.000000',55),
	(58,'sys.customer.detail','客户详情','',1,'detail/:id',100,'/management/user/customerDetail/index.tsx','2025-03-16 01:07:27.034247','2025-03-16 01:07:27.034247',55),
	(59,'sys.order.list','订单管理','',1,'orders',0,'/management/user/order/index.tsx','2025-03-22 00:24:22.107457','2025-04-03 21:46:27.000000',NULL),
	(60,'sys.order.bills','账单管理','',1,'bills',100,'/management/user/order/bills.tsx','2025-04-05 21:21:10.904829','2025-04-05 21:21:10.904829',NULL);

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
	(55,58),
	(56,56),
	(57,57),
	(58,58),
	(59,59),
	(60,60);

/*!40000 ALTER TABLE `menu_closure` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 order_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_category`;

CREATE TABLE `order_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `orderId` int DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7b0dc85d93d9955706a6ce4a4f0` (`categoryId`),
  CONSTRAINT `FK_7b0dc85d93d9955706a6ce4a4f0` FOREIGN KEY (`categoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `order_category` WRITE;
/*!40000 ALTER TABLE `order_category` DISABLE KEYS */;

INSERT INTO `order_category` (`id`, `name`, `orderId`, `create_time`, `update_time`, `categoryId`)
VALUES
	(106,'分类1',33,'2025-04-12 20:44:44.445118','2025-04-12 20:44:44.445118',NULL);

/*!40000 ALTER TABLE `order_category` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 order_entity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_entity`;

CREATE TABLE `order_entity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `no` varchar(255) NOT NULL DEFAULT '',
  `desc` varchar(255) NOT NULL,
  `discount` int NOT NULL,
  `companyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '0',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `delete_time` datetime(6) DEFAULT NULL,
  `customerId` int DEFAULT NULL,
  `totalPrice` float NOT NULL,
  `templateId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_5646dec7dc337e5302c7f9d6ad` (`no`),
  KEY `FK_4480b7afbd07c9d3dfa5324862a` (`customerId`),
  CONSTRAINT `FK_4480b7afbd07c9d3dfa5324862a` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `order_entity` WRITE;
/*!40000 ALTER TABLE `order_entity` DISABLE KEYS */;

INSERT INTO `order_entity` (`id`, `no`, `desc`, `discount`, `companyId`, `userId`, `status`, `create_time`, `update_time`, `delete_time`, `customerId`, `totalPrice`, `templateId`)
VALUES
	(33,'20250412-1-GLY-1','',100,10,1,'1','2025-04-12 20:44:44.441669','2025-04-12 20:45:37.000000',NULL,1,450,18);

/*!40000 ALTER TABLE `order_entity` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 order_products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_products`;

CREATE TABLE `order_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `discount` int NOT NULL,
  `count` int NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `orderCategoryId` int DEFAULT NULL,
  `times` int NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `totalPrice` float NOT NULL DEFAULT '0',
  `productCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_27ca18f2453639a1cafb7404ece` (`productId`),
  KEY `FK_3887544bab5496a18ed8aed7b34` (`orderCategoryId`),
  KEY `FK_b7b497ee70db8689fdad387b143` (`productCategoryId`),
  CONSTRAINT `FK_27ca18f2453639a1cafb7404ece` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_3887544bab5496a18ed8aed7b34` FOREIGN KEY (`orderCategoryId`) REFERENCES `order_category` (`id`),
  CONSTRAINT `FK_b7b497ee70db8689fdad387b143` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;

INSERT INTO `order_products` (`id`, `orderId`, `productId`, `name`, `discount`, `count`, `create_time`, `update_time`, `orderCategoryId`, `times`, `price`, `totalPrice`, `productCategoryId`)
VALUES
	(214,33,478,'A4黑白双面',100,5,'2025-04-12 20:44:44.448979','2025-04-12 20:44:44.000000',106,5,18,450,13);

/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `companyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `deletedDate` datetime(6) DEFAULT NULL,
  `unitId` int DEFAULT NULL,
  `price` float NOT NULL,
  `cost` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2ee96d5eff55f14a6e37470b782` (`unitId`),
  CONSTRAINT `FK_2ee96d5eff55f14a6e37470b782` FOREIGN KEY (`unitId`) REFERENCES `product_unit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `desc`, `create_time`, `update_time`, `companyId`, `userId`, `name`, `label`, `deletedDate`, `unitId`, `price`, `cost`)
VALUES
	(477,'A4 80g 复印纸','2025-04-12 20:37:48.846402','2025-04-12 20:37:48.846402',10,1,'A4黑白单面','A4黑白单面',NULL,7,22,19.2),
	(478,'A4 80g 复印纸','2025-04-12 20:37:48.847836','2025-04-12 20:37:48.847836',10,1,'A4黑白双面','A4黑白双面',NULL,7,18,15.5),
	(479,'A4 80g 复印纸','2025-04-12 20:37:48.848451','2025-04-12 20:37:48.848451',10,1,'A4彩色单面','A4彩色单面',NULL,7,162,143),
	(480,'A4 80g 复印纸','2025-04-12 20:37:48.849149','2025-04-12 20:37:48.849149',10,1,'A4彩色双面','A4彩色双面',NULL,7,156,138),
	(481,'彩色单面打印','2025-04-12 20:37:48.849586','2025-04-12 20:37:48.849586',10,1,'彩单A3D','彩单A3D',NULL,7,339,300),
	(482,'A3 80g 复印纸 ','2025-04-12 20:37:48.849916','2025-04-12 20:37:48.849916',10,1,'彩单A3','彩单A3',NULL,7,312,276),
	(483,'彩色铜版纸200 A3单面','2025-04-12 20:37:48.850317','2025-04-12 20:37:48.850317',10,1,'铜版A3 200','铜版A3 200',NULL,7,452,400),
	(484,'彩色铜版纸250 A3单面','2025-04-12 20:37:48.850705','2025-04-12 20:37:48.850705',10,1,'铜版A3 250','铜版A3 250',NULL,7,511,452),
	(485,'彩色铜版纸250 A3+单面','2025-04-12 20:37:48.851103','2025-04-12 20:37:48.851103',10,1,'铜版A3+ 250','铜版A3+ 250',NULL,7,511,452),
	(486,'彩色铜版纸300 A3单面','2025-04-12 20:37:48.851599','2025-04-12 20:37:48.851599',10,1,'铜版A3 300','铜版A3 300',NULL,7,511,452),
	(487,'','2025-04-12 20:37:48.852002','2025-04-12 20:37:48.852002',10,1,'铜版A4 250 ','铜版A4 250 ',NULL,7,320,226),
	(488,'彩色彩激纸100 A3 单面','2025-04-12 20:37:48.852450','2025-04-12 20:37:48.852450',10,1,'彩激A3 100','彩激A3 100',NULL,7,339,300),
	(489,'彩色彩激纸120 A3 单面','2025-04-12 20:37:48.852854','2025-04-12 20:37:48.852854',10,1,'彩激A3 120','彩激A3 120',NULL,7,362,320),
	(490,'彩色彩激纸80 A4 单面','2025-04-12 20:37:48.853170','2025-04-12 20:37:48.853170',10,1,'彩激A4 80','彩激A4 80',NULL,7,162,143),
	(491,'上白下红80g','2025-04-12 20:37:48.853514','2025-04-12 20:37:48.853514',10,1,'复写纸 80克','复写纸 80克',NULL,7,111,98),
	(492,'激彩胶装封面','2025-04-12 20:37:48.853959','2025-04-12 20:37:48.853959',10,1,'彩激封面胶装','彩激封面胶装',NULL,7,511,452),
	(493,'皮纹纸激打封面','2025-04-12 20:37:48.854369','2025-04-12 20:37:48.854369',10,1,'皮纹封面胶装','皮纹封面胶装',NULL,7,511,452),
	(494,'A4 250g铜版纸','2025-04-12 20:37:48.854694','2025-04-12 20:37:48.854694',10,1,'彩激封面胶装A款','彩激封面胶装A款',NULL,8,1153,1020),
	(495,'A4 250g铜版纸(含封面+压膜)','2025-04-12 20:37:48.855000','2025-04-12 20:37:48.855000',10,1,'彩激封面胶装B款','彩激封面胶装B款',NULL,8,1277,1130),
	(496,'A4 250g皮纹纸','2025-04-12 20:37:48.855300','2025-04-12 20:37:48.855300',10,1,'皮纹封面胶装C款','皮纹封面胶装C款',NULL,8,1153,1020),
	(497,'皮纹纸胶装(黑白封面3CM内)','2025-04-12 20:37:48.855608','2025-04-12 20:37:48.855608',10,1,'皮纹封面胶装A款','皮纹封面胶装A款',NULL,8,1277,1130),
	(498,'胶装本','2025-04-12 20:37:48.855937','2025-04-12 20:37:48.855937',10,1,'胶装服务','胶装服务',NULL,8,1153,1020),
	(499,'骑马订','2025-04-12 20:37:48.856284','2025-04-12 20:37:48.856284',10,1,'骑马订','骑马订',NULL,8,320,283),
	(500,'平钉装订','2025-04-12 20:37:48.856573','2025-04-12 20:37:48.856573',10,1,'平钉','平钉',NULL,8,107,94),
	(501,'两孔简易夹','2025-04-12 20:37:48.856857','2025-04-12 20:37:48.856857',10,1,'两孔夹','两孔夹',NULL,8,267,236),
	(502,'软塑料夹条','2025-04-12 20:37:48.857161','2025-04-12 20:37:48.857161',10,1,'塑料原子夹','塑料原子夹',NULL,8,320,283),
	(503,'自锁夹条','2025-04-12 20:37:48.857545','2025-04-12 20:37:48.857545',10,1,'自锁夹条','自锁夹条',NULL,9,565,500),
	(504,'黑色','2025-04-12 20:37:48.857909','2025-04-12 20:37:48.857909',10,1,'圈装A款','圈装A款',NULL,8,533,472),
	(505,'白色','2025-04-12 20:37:48.858350','2025-04-12 20:37:48.858350',10,1,'圈装B款','圈装B款',NULL,8,533,472),
	(506,'磨砂PVC  A4','2025-04-12 20:37:48.858710','2025-04-12 20:37:48.858710',10,1,'磨砂PVC B款','磨砂PVC B款',NULL,8,149,132),
	(507,'磨砂PVC  A5','2025-04-12 20:37:48.859069','2025-04-12 20:37:48.859069',10,1,'磨砂PVC A款','磨砂PVC A款',NULL,10,79,70),
	(508,'A4 可书写','2025-04-12 20:37:48.859391','2025-04-12 20:37:48.859391',10,1,'A4哑粉纸','A4哑粉纸',NULL,10,255,226),
	(509,'A5 可书写','2025-04-12 20:37:48.859686','2025-04-12 20:37:48.859686',10,1,'A5哑粉纸','A5哑粉纸',NULL,10,127.69,113),
	(510,'精装','2025-04-12 20:37:48.859974','2025-04-12 20:37:48.859974',10,1,'精装','精装',NULL,8,5863,5189),
	(511,'粉红插页纸','2025-04-12 20:37:48.860280','2025-04-12 20:37:48.860280',10,1,'粉红色隔页纸','粉红色隔页纸',NULL,10,12,11),
	(512,'蓝色插页纸','2025-04-12 20:37:48.860564','2025-04-12 20:37:48.860564',10,1,'蓝色隔页纸','蓝色隔页纸',NULL,10,12,11),
	(513,'塑封A4','2025-04-12 20:37:48.860844','2025-04-12 20:37:48.860844',10,1,'塑封A4','塑封A4',NULL,10,533,472),
	(514,'塑封A5&A6','2025-04-12 20:37:48.861295','2025-04-12 20:37:48.861295',10,1,'塑封A5&A6','塑封A5&A6',NULL,10,447,396),
	(515,'文件打孔100页','2025-04-12 20:37:48.861637','2025-04-12 20:37:48.861637',10,1,'打孔','打孔',NULL,11,106,94),
	(516,'文件订钉两个','2025-04-12 20:37:48.861949','2025-04-12 20:37:48.861949',10,1,'左侧上下钉','左侧上下钉',NULL,12,106,94),
	(517,'文件订钉单个','2025-04-12 20:37:48.862299','2025-04-12 20:37:48.862299',10,1,'左侧一钉','左侧一钉',NULL,12,53,47),
	(518,'文件夹侧标制作','2025-04-12 20:37:48.862639','2025-04-12 20:37:48.862639',10,1,'侧标','侧标',NULL,10,128,113),
	(519,'文件夹封面+侧标','2025-04-12 20:37:48.862982','2025-04-12 20:37:48.862982',10,1,'封面+侧标','封面+侧标',NULL,13,509,450),
	(520,'A5','2025-04-12 20:37:48.863273','2025-04-12 20:37:48.863273',10,1,'对折卡','对折卡',NULL,12,441,390),
	(521,'A6','2025-04-12 20:37:48.863615','2025-04-12 20:37:48.863615',10,1,'袖珍卡','袖珍卡',NULL,12,255,226),
	(522,'A5','2025-04-12 20:37:48.863991','2025-04-12 20:37:48.863991',10,1,'三折卡','三折卡',NULL,12,881,780),
	(523,'折扇形','2025-04-12 20:37:48.864355','2025-04-12 20:37:48.864355',10,1,'扇形卡','扇形卡',NULL,12,511,452),
	(524,'800X1800mm(含画面)','2025-04-12 20:37:48.864704','2025-04-12 20:37:48.864704',10,1,'X展架B款','X展架B款',NULL,13,10660,9434),
	(525,'600X1600mm(含画面)','2025-04-12 20:37:48.865055','2025-04-12 20:37:48.865055',10,1,'X展架A款','X展架A款',NULL,13,8528,7547),
	(526,'800X2000mm(含画面)','2025-04-12 20:37:48.865408','2025-04-12 20:37:48.865408',10,1,'易拉宝A款','易拉宝A款',NULL,13,19189,16981),
	(527,'1200*2000mm（含画面）','2025-04-12 20:37:48.865731','2025-04-12 20:37:48.865731',10,1,'易拉宝B款','易拉宝B款',NULL,13,21321,18868),
	(528,'800X2000mm(含画面)塑钢','2025-04-12 20:37:48.866040','2025-04-12 20:37:48.866040',10,1,'易拉宝C款','易拉宝C款',NULL,13,19210,17000),
	(529,'彩喷纸A3(420*297mm)','2025-04-12 20:37:48.866341','2025-04-12 20:37:48.866341',10,1,'海报A款A3','海报A款A3',NULL,10,1599,1415),
	(530,'彩喷纸A2(420*594mm)','2025-04-12 20:37:48.866638','2025-04-12 20:37:48.866638',10,1,'海报A款A2','海报A款A2',NULL,10,2452,2170),
	(531,'彩喷纸A1(840*594mm)','2025-04-12 20:37:48.866953','2025-04-12 20:37:48.866953',10,1,'海报A款A1','海报A款A1',NULL,10,3411,3019),
	(532,'PP背胶纸A3(420*297mm)','2025-04-12 20:37:48.867267','2025-04-12 20:37:48.867267',10,1,'海报B款A3','海报B款A3',NULL,10,1582,1400),
	(533,'PP背胶纸A2(420*594mm)','2025-04-12 20:37:48.867569','2025-04-12 20:37:48.867569',10,1,'海报B款A2','海报B款A2',NULL,10,2373,2100),
	(534,'PP背胶纸A1(840*594mm)','2025-04-12 20:37:48.868385','2025-04-12 20:37:48.868385',10,1,'海报B款A1','海报B款A1',NULL,10,4265,3774),
	(535,'PP背胶纸A0(840*1189mm)','2025-04-12 20:37:48.868693','2025-04-12 20:37:48.868693',10,1,'海报B款A0','海报B款A0',NULL,10,9061,8019),
	(536,'万次章30*50','2025-04-12 20:37:48.869012','2025-04-12 20:37:48.869012',10,1,'万次章固定款','万次章固定款',NULL,12,5330,4717),
	(537,'50*20以内','2025-04-12 20:37:48.869343','2025-04-12 20:37:48.869343',10,1,'万次章定制款','万次章定制款',NULL,12,5334,4720),
	(538,'其他','2025-04-12 20:37:48.869640','2025-04-12 20:37:48.869640',10,1,'万次章特规款','万次章特规款',NULL,12,10667,9440),
	(539,'固定尺寸','2025-04-12 20:37:48.869980','2025-04-12 20:37:48.869980',10,1,'回墨章','回墨章',NULL,12,16950,15000),
	(540,'光盘无标签','2025-04-12 20:37:48.870288','2025-04-12 20:37:48.870288',10,1,'刻录A款','刻录A款',NULL,12,1066,943),
	(541,'光盘含标签','2025-04-12 20:37:48.870590','2025-04-12 20:37:48.870590',10,1,'刻录B款','刻录B款',NULL,12,1067,944),
	(542,'32G','2025-04-12 20:37:48.870883','2025-04-12 20:37:48.870883',10,1,'U盘A款','U盘A款',NULL,12,3955,3500),
	(543,'64G','2025-04-12 20:37:48.871172','2025-04-12 20:37:48.871172',10,1,'U盘B款','U盘B款',NULL,12,5085,4500),
	(544,'A4/A5','2025-04-12 20:37:48.871463','2025-04-12 20:37:48.871463',10,1,'不干胶','不干胶',NULL,12,106,94),
	(545,'','2025-04-12 20:37:48.871805','2025-04-12 20:37:48.871805',10,1,'信封7号','信封7号',NULL,12,171,151),
	(546,'','2025-04-12 20:37:48.872149','2025-04-12 20:37:48.872149',10,1,'信封5号','信封5号',NULL,12,160,142),
	(547,'','2025-04-12 20:37:48.872459','2025-04-12 20:37:48.872459',10,1,'信封特规','信封特规',NULL,12,128,113),
	(548,'帛玉超滑普白 89*51','2025-04-12 20:37:48.872786','2025-04-12 20:37:48.872786',10,1,'名片','名片',NULL,14,3500,3097),
	(549,'2孔白色文件夹2.5cm','2025-04-12 20:37:48.873129','2025-04-12 20:37:48.873129',10,1,'白夹25mm','白夹25mm',NULL,12,1919,1698),
	(550,'2孔白色文件夹5cm','2025-04-12 20:37:48.873462','2025-04-12 20:37:48.873462',10,1,'白夹50mm','白夹50mm',NULL,12,2132,1887),
	(551,'2孔3寸黑色快劳夹7.5cm','2025-04-12 20:37:48.873763','2025-04-12 20:37:48.873763',10,1,'黑夹75mm','黑夹75mm',NULL,12,1919,1698),
	(552,'2孔3寸白色快劳夹7.5cm','2025-04-12 20:37:48.874051','2025-04-12 20:37:48.874051',10,1,'白夹75mm','白夹75mm',NULL,12,1919,1981),
	(553,'2孔3寸白色快劳夹10cm','2025-04-12 20:37:48.874387','2025-04-12 20:37:48.874387',10,1,'白夹100mm','白夹100mm',NULL,12,2345,2075),
	(554,'2孔2寸黑色文件夹5.5CM','2025-04-12 20:37:48.874736','2025-04-12 20:37:48.874736',10,1,'黑夹55mm','黑夹55mm',NULL,12,1706,1509),
	(555,'2孔2寸白色文件夹5.5CM','2025-04-12 20:37:48.875048','2025-04-12 20:37:48.875048',10,1,'白夹55mm','白夹55mm',NULL,12,1706,1887),
	(556,'2孔2寸黑色文件夹5.5CM','2025-04-12 20:37:48.875361','2025-04-12 20:37:48.875361',10,1,'固定款55mm','固定款55mm',NULL,12,2239,1770),
	(557,'2孔2寸黑色文件夹7.5CM','2025-04-12 20:37:48.875658','2025-04-12 20:37:48.875658',10,1,'固定款75mm','固定款75mm',NULL,12,2345,1947),
	(558,'2孔2寸黑色文件夹5.5CM','2025-04-12 20:37:48.875956','2025-04-12 20:37:48.875956',10,1,'指定款55mm','指定款55mm',NULL,12,2000,1770),
	(559,'2孔2寸黑色文件夹7.5CM','2025-04-12 20:37:48.876256','2025-04-12 20:37:48.876256',10,1,'指定款75mm','指定款75mm',NULL,12,2200,1947),
	(560,'3孔白色文件夹2.5cm','2025-04-12 20:37:48.876548','2025-04-12 20:37:48.876548',10,1,'3孔白夹25mm','3孔白夹25mm',NULL,12,2239,1981),
	(561,'3孔白色文件夹5cm','2025-04-12 20:37:48.876835','2025-04-12 20:37:48.876835',10,1,'3孔白夹50mm','3孔白夹50mm',NULL,12,2239,1981),
	(562,'4孔白色文件夹4cm','2025-04-12 20:37:48.877145','2025-04-12 20:37:48.877145',10,1,'4空白夹100mm','4空白夹100mm',NULL,12,2345,2075),
	(563,'双孔O环文件夹 TC5312（黑色）','2025-04-12 20:37:48.877461','2025-04-12 20:37:48.877461',10,1,'双孔夹','双孔夹',NULL,12,852,754),
	(564,'如意伸缩夹','2025-04-12 20:37:48.877763','2025-04-12 20:37:48.877763',10,1,'伸缩夹','伸缩夹',NULL,12,6780,6000),
	(565,'PP索引纸1-12等份','2025-04-12 20:37:48.878050','2025-04-12 20:37:48.878050',10,1,'PP索引纸A款','PP索引纸A款',NULL,13,1279,1132),
	(566,'PP索引纸1-20等份','2025-04-12 20:37:48.878329','2025-04-12 20:37:48.878329',10,1,'PP索引纸B款','PP索引纸B款',NULL,13,1919,1698),
	(567,'PP索引纸1-31等份','2025-04-12 20:37:48.878601','2025-04-12 20:37:48.878601',10,1,'PP索引纸C款','PP索引纸C款',NULL,13,2345,2075),
	(568,'PP索引纸1-50等份','2025-04-12 20:37:48.878899','2025-04-12 20:37:48.878899',10,1,'PP索引纸D款','PP索引纸D款',NULL,13,5999,5309),
	(569,'纸质1-12','2025-04-12 20:37:48.879185','2025-04-12 20:37:48.879185',10,1,'纸质索引纸','纸质索引纸',NULL,13,1500,1327),
	(570,'纯色1-21','2025-04-12 20:37:48.879497','2025-04-12 20:37:48.879497',10,1,'纯色索引纸A款','纯色索引纸A款',NULL,13,2000,1770),
	(571,'纯色1-31','2025-04-12 20:37:48.879774','2025-04-12 20:37:48.879774',10,1,'纯色索引纸B款','纯色索引纸B款',NULL,13,2500,2212),
	(572,'耳朵纸【纸质】','2025-04-12 20:37:48.880058','2025-04-12 20:37:48.880058',10,1,'定制耳朵纸','定制耳朵纸',NULL,10,179,158),
	(573,'铜版索引纸 10以内','2025-04-12 20:37:48.880341','2025-04-12 20:37:48.880341',10,1,'耳朵纸【铜版纸】A款','耳朵纸【铜版纸】A款',NULL,12,325,288),
	(574,'铜版索引纸 10以上','2025-04-12 20:37:48.880620','2025-04-12 20:37:48.880620',10,1,'耳朵纸【铜版纸】B款','耳朵纸【铜版纸】B款',NULL,12,255,226),
	(575,'塑料抽杆夹','2025-04-12 20:37:48.880906','2025-04-12 20:37:48.880906',10,1,'抽杆夹','抽杆夹',NULL,8,426,377),
	(576,'A4(含磨砂片1.2cm内)','2025-04-12 20:37:48.881180','2025-04-12 20:37:48.881180',10,1,'夹条A款','夹条A款',NULL,8,533,472),
	(577,'A4(含磨砂片1.2cm以上)','2025-04-12 20:37:48.881502','2025-04-12 20:37:48.881502',10,1,'夹条B款','夹条B款',NULL,8,640,566),
	(578,'铁圈/胶圈A5','2025-04-12 20:37:48.881759','2025-04-12 20:37:48.881759',10,1,'夹条C款','夹条C款',NULL,8,640,566),
	(579,'铁圈外精装A4(含封面)','2025-04-12 20:37:48.881974','2025-04-12 20:37:48.881974',10,1,'精装A款','精装A款',NULL,8,5863,5189),
	(580,'铁圈外精装A5(含封面)','2025-04-12 20:37:48.882238','2025-04-12 20:37:48.882238',10,1,'精装B款','精装B款',NULL,8,4797,4245),
	(581,'11孔袋','2025-04-12 20:37:48.882489','2025-04-12 20:37:48.882489',10,1,'11孔袋','11孔袋',NULL,12,53,47),
	(582,'透明纽扣袋 白扣','2025-04-12 20:37:48.882728','2025-04-12 20:37:48.882728',10,1,'纽扣袋','纽扣袋',NULL,12,320,283),
	(583,'长尾夹','2025-04-12 20:37:48.882968','2025-04-12 20:37:48.882968',10,1,'长尾夹A款','长尾夹A款',NULL,12,106,94),
	(584,'回形针彩色','2025-04-12 20:37:48.883208','2025-04-12 20:37:48.883208',10,1,'回形针','回形针',NULL,12,12,11),
	(585,'铁环','2025-04-12 20:37:48.883427','2025-04-12 20:37:48.883427',10,1,'铁环','铁环',NULL,12,132,117),
	(586,'档案袋','2025-04-12 20:37:48.883665','2025-04-12 20:37:48.883665',10,1,'牛皮纸文件袋','牛皮纸文件袋',NULL,12,320,283),
	(587,'文件盒','2025-04-12 20:37:48.883893','2025-04-12 20:37:48.883893',10,1,'文件盒','文件盒',NULL,12,853,755),
	(588,'夹条 止滑夹条','2025-04-12 20:37:48.884147','2025-04-12 20:37:48.884147',10,1,'止滑夹条','止滑夹条',NULL,12,110,97),
	(589,'塑料抽杆夹','2025-04-12 20:37:48.884416','2025-04-12 20:37:48.884416',10,1,'抽杆夹','抽杆夹',NULL,8,426,377),
	(590,'蓝色35mm','2025-04-12 20:37:48.884734','2025-04-12 20:37:48.884734',10,1,'档案盒A款','档案盒A款',NULL,12,852,754),
	(591,'蓝色55mm','2025-04-12 20:37:48.884969','2025-04-12 20:37:48.884969',10,1,'档案盒B款','档案盒B款',NULL,12,1066,943),
	(592,'蓝色75mm','2025-04-12 20:37:48.885199','2025-04-12 20:37:48.885199',10,1,'档案盒C款','档案盒C款',NULL,12,1279,1132),
	(593,'史泰博75mm','2025-04-12 20:37:48.885411','2025-04-12 20:37:48.885411',10,1,'档案盒指定C款','档案盒指定C款',NULL,12,3729,3300),
	(594,'加厚磁吸式','2025-04-12 20:37:48.885661','2025-04-12 20:37:48.885661',10,1,'档案盒指定B款','档案盒指定B款',NULL,12,3729,3300),
	(595,'升级55m','2025-04-12 20:37:48.885876','2025-04-12 20:37:48.885876',10,1,'档案盒升级B款','档案盒升级B款',NULL,12,2000,1770),
	(596,'升级75mm','2025-04-12 20:37:48.886119','2025-04-12 20:37:48.886119',10,1,'档案盒升级C款','档案盒升级C款',NULL,12,2300,2035),
	(597,'得力5683','2025-04-12 20:37:48.886332','2025-04-12 20:37:48.886332',10,1,'档案盒指定A1款','档案盒指定A1款',NULL,12,2260,2000),
	(598,'得力5604','2025-04-12 20:37:48.886559','2025-04-12 20:37:48.886559',10,1,'档案盒指定A2款','档案盒指定A2款',NULL,12,2260,2000),
	(599,'得力5684','2025-04-12 20:37:48.886799','2025-04-12 20:37:48.886799',10,1,'档案盒指定A3款','档案盒指定A3款',NULL,12,2486,2200),
	(600,'牛皮纸 5cm','2025-04-12 20:37:48.887044','2025-04-12 20:37:48.887044',10,1,'牛皮纸档案盒A','牛皮纸档案盒A',NULL,12,565,500),
	(601,'牛皮纸 8cm','2025-04-12 20:37:48.887318','2025-04-12 20:37:48.887318',10,1,'牛皮纸档案盒B','牛皮纸档案盒B',NULL,12,565,500),
	(602,'牛皮纸 10cm','2025-04-12 20:37:48.887605','2025-04-12 20:37:48.887605',10,1,'牛皮纸档案盒C','牛皮纸档案盒C',NULL,12,847.5,750),
	(603,'牛皮纸 12cm','2025-04-12 20:37:48.887818','2025-04-12 20:37:48.887818',10,1,'牛皮纸档案盒D','牛皮纸档案盒D',NULL,12,1017,900),
	(604,'内页 彩双','2025-04-12 20:37:48.888024','2025-04-12 20:37:48.888024',10,1,'扫描服务','扫描服务',NULL,15,32,28),
	(605,'PDF 书签','2025-04-12 20:37:48.888245','2025-04-12 20:37:48.888245',10,1,'扫描增值服务','扫描增值服务',NULL,12,106,94),
	(606,'资料册30袋','2025-04-12 20:37:48.888448','2025-04-12 20:37:48.888448',10,1,'资料册A款','资料册A款',NULL,12,1279,1132),
	(607,'资料册40袋','2025-04-12 20:37:48.888643','2025-04-12 20:37:48.888643',10,1,'资料册B款','资料册B款',NULL,12,1599,1415),
	(608,'资料册60袋','2025-04-12 20:37:48.888836','2025-04-12 20:37:48.888836',10,1,'资料册C款','资料册C款',NULL,12,2558,2264),
	(609,'资料册80袋','2025-04-12 20:37:48.889043','2025-04-12 20:37:48.889043',10,1,'资料册D款','资料册D款',NULL,12,2984,2641),
	(610,'资料册100袋','2025-04-12 20:37:48.889313','2025-04-12 20:37:48.889313',10,1,'资料册E款','资料册E款',NULL,12,2984,2641),
	(611,'塑形台牌 A5','2025-04-12 20:37:48.889559','2025-04-12 20:37:48.889559',10,1,'台牌A款','台牌A款',NULL,12,1390,1230),
	(612,'塑形台牌 A4','2025-04-12 20:37:48.889801','2025-04-12 20:37:48.889801',10,1,'台牌B款','台牌B款',NULL,12,2520,2230),
	(613,'给客户提供表格调整服务','2025-04-12 20:37:48.890024','2025-04-12 20:37:48.890024',10,1,'调整表格费  ','调整表格费  ',NULL,15,565,500),
	(614,'调整邮件格式为打印格式','2025-04-12 20:37:48.890218','2025-04-12 20:37:48.890218',10,1,'邮件转格式  ','邮件转格式  ',NULL,15,226,200),
	(615,'进行多版本文件比较','2025-04-12 20:37:48.890408','2025-04-12 20:37:48.890408',10,1,'文件对比','文件对比',NULL,15,1130,1000),
	(616,'排版设计','2025-04-12 20:37:48.890594','2025-04-12 20:37:48.890594',10,1,'设计费A','设计费A',NULL,11,5650,5000),
	(617,'抠图排版设计','2025-04-12 20:37:48.890807','2025-04-12 20:37:48.890807',10,1,'设计费B','设计费B',NULL,11,11300,10000),
	(618,'整合排版设计','2025-04-12 20:37:48.891014','2025-04-12 20:37:48.891014',10,1,'设计费C','设计费C',NULL,11,16950,15000),
	(619,'A5 80g 复印纸','2025-04-12 20:37:48.891234','2025-04-12 20:37:48.891234',10,1,'A5黑白双面打印','A5黑白双面打印',NULL,7,8.814,7.8),
	(620,'A5 80g 复印纸','2025-04-12 20:37:48.891567','2025-04-12 20:37:48.891567',10,1,'A5黑白单面打印','A5黑白单面打印',NULL,7,10.848,9.6),
	(621,'A5 80g 复印纸','2025-04-12 20:37:48.891840','2025-04-12 20:37:48.891840',10,1,'A5彩色双面打印','A5彩色双面打印',NULL,7,77.97,69),
	(622,'A5 80g 复印纸','2025-04-12 20:37:48.892088','2025-04-12 20:37:48.892088',10,1,'A5彩色单面打印','A5彩色单面打印',NULL,7,80.795,71.5),
	(623,'','2025-04-12 20:37:48.892338','2025-04-12 20:37:48.892338',10,1,'A3黑白单面','A3黑白单面',NULL,7,43.392,38.4),
	(624,'','2025-04-12 20:37:48.892565','2025-04-12 20:37:48.892565',10,1,'A3黑白双面','A3黑白双面',NULL,7,35.03,31),
	(625,'2孔2寸黑色文件夹3.5CM','2025-04-12 20:37:48.892824','2025-04-12 20:37:48.892824',10,1,'黑夹35mm','黑夹35mm',NULL,12,1491.6,1320),
	(626,'','2025-04-12 20:37:48.893061','2025-04-12 20:37:48.893061',10,1,'袖珍卡套+吊绳','袖珍卡套+吊绳',NULL,12,565,500),
	(627,'','2025-04-12 20:37:48.893271','2025-04-12 20:37:48.893271',10,1,'压虚线','压虚线',NULL,7,28.25,25),
	(628,'空光盘','2025-04-12 20:37:48.893484','2025-04-12 20:37:48.893484',10,1,'刻录C款','刻录C款',NULL,12,499.46,442);

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
  `companyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;

INSERT INTO `product_category` (`id`, `name`, `label`, `desc`, `create_time`, `update_time`, `companyId`, `userId`)
VALUES
	(13,'胶装本','','','2025-04-12 20:43:59.022323','2025-04-12 20:43:59.022323',10,1);

/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 product_category_products_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_category_products_product`;

CREATE TABLE `product_category_products_product` (
  `productCategoryId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`productCategoryId`,`productId`),
  KEY `IDX_2a7fd1bdf725fba8c49983a5ad` (`productCategoryId`),
  KEY `IDX_5c003b979b917a726cfd5c0759` (`productId`),
  CONSTRAINT `FK_2a7fd1bdf725fba8c49983a5add` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_5c003b979b917a726cfd5c07598` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product_category_products_product` WRITE;
/*!40000 ALTER TABLE `product_category_products_product` DISABLE KEYS */;

INSERT INTO `product_category_products_product` (`productCategoryId`, `productId`)
VALUES
	(13,478);

/*!40000 ALTER TABLE `product_category_products_product` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 product_customer_customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_customer_customer`;

CREATE TABLE `product_customer_customer` (
  `productId` int NOT NULL,
  `customerId` int NOT NULL,
  PRIMARY KEY (`productId`,`customerId`),
  KEY `IDX_612c92b741d054a071cc796897` (`productId`),
  KEY `IDX_5ee4bb6f08987c425a441b0889` (`customerId`),
  CONSTRAINT `FK_5ee4bb6f08987c425a441b08895` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_612c92b741d054a071cc796897a` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# 转储表 product_price
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_price`;

CREATE TABLE `product_price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discount` int NOT NULL DEFAULT '100',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `customerId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_79f8e2e404dc39131f8c031fc54` (`customerId`),
  KEY `FK_a164b9a56be4eb93c942ae5e986` (`productId`),
  CONSTRAINT `FK_79f8e2e404dc39131f8c031fc54` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`),
  CONSTRAINT `FK_a164b9a56be4eb93c942ae5e986` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product_price` WRITE;
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;

INSERT INTO `product_price` (`id`, `discount`, `create_time`, `update_time`, `customerId`, `productId`, `price`)
VALUES
	(141,100,'2025-04-12 20:54:38.837754','2025-04-12 20:54:38.837754',1,477,2200),
	(142,100,'2025-04-12 20:54:38.839525','2025-04-12 20:54:38.839525',1,480,15600);

/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;
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
  `companyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `product_unit` WRITE;
/*!40000 ALTER TABLE `product_unit` DISABLE KEYS */;

INSERT INTO `product_unit` (`id`, `name`, `label`, `desc`, `create_time`, `update_time`, `companyId`, `userId`)
VALUES
	(2,'张','张','张','2025-03-13 20:34:24.585124','2025-03-15 23:35:23.535729',10,1),
	(3,'个','个','个','2025-03-17 20:26:04.256955','2025-03-17 20:45:59.484642',10,1),
	(4,'次','次','次','2025-03-30 14:55:20.130909','2025-03-30 14:55:20.130909',10,1),
	(5,'页','页','页','2025-03-30 14:55:26.281577','2025-03-30 14:55:26.281577',10,1),
	(6,'3','3','3','2025-03-30 22:27:54.635999','2025-03-30 22:29:49.000000',10,1),
	(7,'元/P','元/P','元/P','2025-04-02 22:32:58.908320','2025-04-02 22:32:58.908320',NULL,NULL),
	(8,'元/本','元/本','元/本','2025-04-02 22:32:58.929855','2025-04-02 22:32:58.929855',NULL,NULL),
	(9,'元/根','元/根','元/根','2025-04-02 22:32:58.944313','2025-04-02 22:32:58.944313',NULL,NULL),
	(10,'元/张','元/张','元/张','2025-04-02 22:32:58.952507','2025-04-02 22:32:58.952507',NULL,NULL),
	(11,'元/次','元/次','元/次','2025-04-02 22:32:58.963899','2025-04-02 22:32:58.963899',NULL,NULL),
	(12,'元/个','元/个','元/个','2025-04-02 22:32:58.967648','2025-04-02 22:32:58.967648',NULL,NULL),
	(13,'元/套','元/套','元/套','2025-04-02 22:32:58.975893','2025-04-02 22:32:58.975893',NULL,NULL),
	(14,'元/盒','元/盒','元/盒','2025-04-02 22:32:59.001837','2025-04-02 22:32:59.001837',NULL,NULL),
	(15,'元/页','元/页','元/页','2025-04-02 22:32:59.037991','2025-04-02 22:32:59.037991',NULL,NULL);

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
	(2,'基础版用户','user','基础版本用户',2,1,'2025-03-08 11:41:28.960698','2025-04-01 10:53:29.000000',NULL);

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
	(1,4),
	(1,8),
	(1,10),
	(1,11),
	(1,12),
	(1,50),
	(1,51),
	(1,52),
	(1,53),
	(1,54),
	(1,56),
	(1,57),
	(1,59),
	(1,60),
	(2,50),
	(2,51),
	(2,52),
	(2,53),
	(2,54),
	(2,56),
	(2,57),
	(2,59),
	(2,60);

/*!40000 ALTER TABLE `role_menus_menu` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `template`;

CREATE TABLE `template` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `status` int NOT NULL DEFAULT '0',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  `companyId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `template` WRITE;
/*!40000 ALTER TABLE `template` DISABLE KEYS */;

INSERT INTO `template` (`id`, `name`, `desc`, `status`, `create_time`, `update_time`, `deletedDate`, `companyId`, `userId`)
VALUES
	(18,'Test','',1,'2025-04-12 20:44:23.373545','2025-04-12 20:44:23.373545',NULL,10,1);

/*!40000 ALTER TABLE `template` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 template_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `template_category`;

CREATE TABLE `template_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL DEFAULT '',
  `templateId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `template_category` WRITE;
/*!40000 ALTER TABLE `template_category` DISABLE KEYS */;

INSERT INTO `template_category` (`id`, `create_time`, `update_time`, `name`, `templateId`)
VALUES
	(99,'2025-04-12 20:44:23.380330','2025-04-12 20:44:23.380330','分类1',18);

/*!40000 ALTER TABLE `template_category` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 template_category_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `template_category_product`;

CREATE TABLE `template_category_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `productId` int DEFAULT NULL,
  `count` int NOT NULL DEFAULT '0',
  `templateCategoryId` int DEFAULT NULL,
  `templateId` int DEFAULT NULL,
  `times` int NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `productCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8ed1722c11c0ddc24827211b85f` (`productId`),
  KEY `FK_db4ba3786339b8261c4c7d36a37` (`templateCategoryId`),
  KEY `FK_ed8f2d088815a1641ab9d618480` (`productCategoryId`),
  CONSTRAINT `FK_8ed1722c11c0ddc24827211b85f` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_db4ba3786339b8261c4c7d36a37` FOREIGN KEY (`templateCategoryId`) REFERENCES `template_category` (`id`),
  CONSTRAINT `FK_ed8f2d088815a1641ab9d618480` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `template_category_product` WRITE;
/*!40000 ALTER TABLE `template_category_product` DISABLE KEYS */;

INSERT INTO `template_category_product` (`id`, `create_time`, `update_time`, `productId`, `count`, `templateCategoryId`, `templateId`, `times`, `price`, `productCategoryId`)
VALUES
	(167,'2025-04-12 20:44:23.384324','2025-04-12 20:44:23.000000',478,1,99,18,1,18,13);

/*!40000 ALTER TABLE `template_category_product` ENABLE KEYS */;
UNLOCK TABLES;




# 转储表 typeorm_metadata
# ------------------------------------------------------------

DROP TABLE IF EXISTS `typeorm_metadata`;

CREATE TABLE `typeorm_metadata` (
  `type` varchar(255) NOT NULL,
  `database` varchar(255) DEFAULT NULL,
  `schema` varchar(255) DEFAULT NULL,
  `table` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `typeorm_metadata` WRITE;
/*!40000 ALTER TABLE `typeorm_metadata` DISABLE KEYS */;

INSERT INTO `typeorm_metadata` (`type`, `database`, `schema`, `table`, `name`, `value`)
VALUES
	('VIEW',NULL,'bill_zg',NULL,'total_amount_view','select `order`.`customerId`, \n          `order`.`companyId`, \n          `customer`.`fullname`, \n          `order`.`status`, \n          `order`.`no`, \n          `order`.`create_time` as `createTime`,\n          `order`.`totalPrice`\n          from order_entity as `order`\n          inner join customer as `customer` on `order`.`customerId` = `customer`.`id`\n          where `order`.`delete_time` is NULL');

/*!40000 ALTER TABLE `typeorm_metadata` ENABLE KEYS */;
UNLOCK TABLES;


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
  `Abbreviation` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c12537c5ea29a60dbeb6319e64` (`email`,`fullname`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  KEY `FK_86586021a26d1180b0968f98502` (`companyId`),
  CONSTRAINT `FK_86586021a26d1180b0968f98502` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `fullname`, `companyId`, `email`, `password`, `avatar`, `address`, `phone`, `roleId`, `isActive`, `validateDate`, `create_time`, `update_time`, `deletedDate`, `Abbreviation`)
VALUES
	(1,'管理员',10,'nick@126.com','512ab25c35d7fc5862b7371339b8037d8b857f93a9b7002906560ca61a438b7a','','ceshi','13564548667',1,1,30,'2025-03-13 00:18:29.400890','2025-04-05 20:38:30.416096',NULL,''),
	(2,'测试人员',10,'nick1@126.com','512ab25c35d7fc5862b7371339b8037d8b857f93a9b7002906560ca61a438b7a','','ceshi','13564548667',2,1,30,'2025-03-13 00:18:29.403541','2025-04-05 20:38:35.321835',NULL,'');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# 导出视图 total_amount_view
# ------------------------------------------------------------

DROP TABLE IF EXISTS `total_amount_view`; DROP VIEW IF EXISTS `total_amount_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `total_amount_view`
AS SELECT
   `order`.`customerId` AS `customerId`,
   `order`.`companyId` AS `companyId`,
   `customer`.`fullname` AS `fullname`,
   `order`.`status` AS `status`,
   `order`.`no` AS `no`,
   `order`.`create_time` AS `createTime`,
   `order`.`totalPrice` AS `totalPrice`
FROM (`order_entity` `order` join `customer` on((`order`.`customerId` = `customer`.`id`))) where (`order`.`delete_time` is null);


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
