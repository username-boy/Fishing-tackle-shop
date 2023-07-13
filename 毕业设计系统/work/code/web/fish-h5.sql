/*
 Navicat Premium Data Transfer

 Source Server         : nine
 Source Server Type    : MySQL
 Source Server Version : 100427
 Source Host           : localhost:3306
 Source Schema         : fish-h5

 Target Server Type    : MySQL
 Target Server Version : 100427
 File Encoding         : 65001

 Date: 05/04/2023 10:59:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for car_info
-- ----------------------------
DROP TABLE IF EXISTS `car_info`;
CREATE TABLE `car_info`  (
  `car_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id，理论上一个用户只能对应一个购物车',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '购物车所属用户，存储当前购物车的用户id',
  `product_id` int(11) NULL DEFAULT NULL COMMENT '购物车中存储的商品的id，最多添加99个商品到购物车',
  PRIMARY KEY (`car_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of car_info
-- ----------------------------
INSERT INTO `car_info` VALUES (3, 5, 3);
INSERT INTO `car_info` VALUES (17, 4, 0);
INSERT INTO `car_info` VALUES (18, 4, 2);

-- ----------------------------
-- Table structure for cate_info
-- ----------------------------
DROP TABLE IF EXISTS `cate_info`;
CREATE TABLE `cate_info`  (
  `cate_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `cate_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `cate_logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类logo，用于展示',
  PRIMARY KEY (`cate_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cate_info
-- ----------------------------
INSERT INTO `cate_info` VALUES (1, '剪刀', 'img/cate_1.png');
INSERT INTO `cate_info` VALUES (2, '后挂', 'img/cate_2.png');
INSERT INTO `cate_info` VALUES (3, '套盒', 'img/cate_3.png');
INSERT INTO `cate_info` VALUES (4, '鱼饵', 'img/cate_4.png');
INSERT INTO `cate_info` VALUES (5, '配件', 'img/cate_5.png');
INSERT INTO `cate_info` VALUES (6, '控鱼', 'img/cate_6.png');
INSERT INTO `cate_info` VALUES (7, '成品线组', 'img/cate_7.png');
INSERT INTO `cate_info` VALUES (8, '新品专区', 'img/cate_8.png');
INSERT INTO `cate_info` VALUES (9, '漂盒', 'img/cate_9.png');
INSERT INTO `cate_info` VALUES (10, '钓箱坐垫', 'img/cate_10.png');
INSERT INTO `cate_info` VALUES (11, '鱼竿', 'img/cate_11.png');
INSERT INTO `cate_info` VALUES (12, '炮台类', 'img/cate_12.png');
INSERT INTO `cate_info` VALUES (13, '支架', 'img/cate_13.png');
INSERT INTO `cate_info` VALUES (14, '钩类', 'img/cate_14.png');
INSERT INTO `cate_info` VALUES (15, '工具', 'img/cate_15.png');
INSERT INTO `cate_info` VALUES (16, '防晒用品', 'img/cate_16.png');

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info`  (
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '订单商品数量',
  `order_create_time` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单生成时间（保存时间戳）',
  `status` int(11) NULL DEFAULT NULL COMMENT '订单状态',
  `order_pro_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单相关商品id，保存字符串，一个订单最多支持10个商品信息',
  `product_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品标题',
  `product_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品价格',
  `product_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品封面图',
  `product_detail_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品详情图',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '商品数量'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('1680490350121', 4, '1680490350121', 1, '0', '小凤仙钓鱼剪刀专用多功能小配件铅皮大力马pe线便携折叠剪刀垂钓', 24.60, 'img/product_34.jpg', 'img/product_34.jpg&img/product_35.jpg&img/product_36.jpg&img/product_37.jpg', 1);

-- ----------------------------
-- Table structure for product_info
-- ----------------------------
DROP TABLE IF EXISTS `product_info`;
CREATE TABLE `product_info`  (
  `product_id` int(11) NOT NULL COMMENT '商品id',
  `product_title` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品标题',
  `product_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '商品价格',
  `product_sales` int(11) NULL DEFAULT NULL COMMENT '商品销量',
  `product_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `product_detail_img` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品详情图片，数组形式，需要在接口中处理',
  `product_is_onsale` int(11) NULL DEFAULT NULL COMMENT '商品是否促销 0 否 1是',
  `product_cate` int(11) NULL DEFAULT NULL COMMENT '商品所属分类',
  `product_store` int(11) NULL DEFAULT NULL COMMENT '商品库存',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_info
-- ----------------------------
INSERT INTO `product_info` VALUES (0, '小凤仙钓鱼剪刀专用多功能小配件铅皮大力马pe线便携折叠剪刀垂钓', 24.60, 22, 'img/product_34.jpg', 'img/product_34.jpg&img/product_35.jpg&img/product_36.jpg&img/product_37.jpg', 0, 1, 80);
INSERT INTO `product_info` VALUES (1, '剪刀钓鱼专用迷你折叠剪铅皮便携8字鱼线不锈钢多功能小剪子', 32.90, 0, 'img/product_1.jpg', 'img/product_1.jpg&img/product_2.jpg&img/product_3.jpg&img/product_4.jpg', 1, 1, 90);
INSERT INTO `product_info` VALUES (2, '佳钓尼路亚钓鱼小剪刀大力马鱼线pe线剪刀铅皮专用多功能钓鱼剪刀', 19.90, 99, 'img/product_5.jpg', 'img/product_5.jpg&img/product_6.jpg&img/product_7.jpg&img/product_8.jpg', 1, 1, 100);
INSERT INTO `product_info` VALUES (3, '通用炮台后挂天线铝合金防滑架杆防脱竿挂配件金属鱼杆钓鱼支架竿', 28.80, 0, 'img/product_9.jpg', 'img/product_9.jpg&img/product_10.jpg&img/product_11.jpg&img/product_12.jpg', 1, 2, 20);
INSERT INTO `product_info` VALUES (4, '北翔碳素炮台支架钓鱼竿支架超硬钓箱支架架杆地插钓鱼支架鱼竿架', 19.90, 0, 'img/product_13.jpg', 'img/product_13.jpg&img/product_14.jpg&img/product_15.jpg&img/product_16.jpg', 1, 2, 99);
INSERT INTO `product_info` VALUES (5, '碳素支架超硬超轻炮台鱼竿架杆大物钓鱼多功能台钓椅钓箱地插架竿', 20.90, 32, 'img/product_17.jpg', 'img/product_17.jpg&img/product_18.jpg&img/product_19.jpg&img/product_20.jpg', 0, 2, 80);
INSERT INTO `product_info` VALUES (6, '多功能炮台钓鱼杆支架地插鱼竿支架杆架后挂托杆手杆钓箱专用竿架', 9.90, 120, 'img/product_21.jpg', 'img/product_21.jpg&img/product_22.jpg&img/product_23.jpg&img/product_24.jpg', 0, 2, 190);
INSERT INTO `product_info` VALUES (7, '渔战将多功能鱼漂盒高灵敏纳米浮漂加粗醒目全套鱼漂套装日夜两用', 26.90, 45, 'img/product_25.jpg', 'img/product_25.jpg&img/product_26.jpg&img/product_27.jpg&img/product_28.jpg&img/product_29.jpg', 1, 3, 140);
INSERT INTO `product_info` VALUES (8, '川泽鱼漂套装高灵敏浮漂全套野钓醒目加粗鱼漂浮漂套装纳米鲫鱼漂', 19.90, 99, 'img/product_30.jpg', 'img/product_30.jpg&img/product_31.jpg&img/product_32.jpg&img/product_33.jpg', 1, 3, 20);
INSERT INTO `product_info` VALUES (9, '鱼饵料老鬼九一八蓝鲫野战918螺鲤鲫鱼野钓老三样速攻2号套装通杀', 9.90, 199, 'img/product_38.jpg', 'img/product_38.jpg&img/product_39.jpg', 1, 4, 199);
INSERT INTO `product_info` VALUES (10, '汉鼎钓鱼饵料野钓黑坑拉丝粉小药鲫鱼鲤鱼饵拉饵打窝料罗非饵夏季', 9.90, 98, 'img/product_40.jpg', 'img/product_40.jpg&img/product_41.jpg&img/product_42.jpg', 1, 4, 80);
INSERT INTO `product_info` VALUES (11, '钓鱼窝米饼窝料野钓酒香腥香奶香鲫鱼鲤鱼糠饼通杀饵料打窝方块饵', 9.90, 99, 'img/product_43.jpg', 'img/product_43.jpg&img/product_44.jpg&img/product_45.jpg', 1, 4, 100);
INSERT INTO `product_info` VALUES (12, '渔之源鱼线鱼钩套装双钩钓鱼钩散装太空豆鱼具渔具用品大全配件盒', 10.00, 0, 'img/product_46.jpg', 'img/product_46.jpg&img/product_47.jpg&img/product_48.jpg', 0, 5, 10);
INSERT INTO `product_info` VALUES (13, '快速环保大物刻度铅皮卷铅坠钓鱼专用防炸成品刻度铅坠套装小配件', 20.00, 0, 'img/product_49.jpg', 'img/product_49.jpg&img/product_50.jpg&img/product_51.jpg', 0, 5, 22);
INSERT INTO `product_info` VALUES (14, '快速环保大物刻度铅皮卷铅坠钓鱼专用防炸成品刻度铅坠套装小配件', 20.00, 10, 'img/product_52.jpg', 'img/product_52.jpg&img/product_53.jpg&img/product_54.jpg&img/product_55.jpg', 0, 5, 90);
INSERT INTO `product_info` VALUES (15, '多功能控鱼器带秤路亚钳新型钳子抓鱼钳取钩加长套装控大物鱼夹子', 55.00, 800, 'img/product_56.jpg', 'img/product_56.jpg&img/product_57.jpg&img/product_58.jpg&img/product_59.jpg&img/product_60.jpg', 1, 6, 199);
INSERT INTO `product_info` VALUES (16, '出口欧美 不锈钢控鱼器带秤轻便路亚控鱼器 取鱼控鱼钳夹鱼抓鱼器', 59.00, 200, 'img/product_61.jpg', 'img/product_61.jpg&img/product_62.jpg&img/product_63.jpg&img/product_64.jpg&img/product_65.jpg', 1, 6, 140);
INSERT INTO `product_info` VALUES (17, '铝合金控鱼器称重路亚钳套装不锈钢多功能小鹰嘴钓鱼剪刀控鱼钳子', 39.00, 199, 'img/product_66.jpg', 'img/product_66.jpg&img/product_67.jpg&img/product_68.jpg', 1, 6, 80);
INSERT INTO `product_info` VALUES (18, '龙王恨控鱼器带秤称重路亚钳大物控鱼钳多功能折叠鱼钳夹路亚装备', 49.00, 120, 'img/product_69.jpg', 'img/product_69.jpg&img/product_70.jpg&img/product_71.jpg', 1, 6, 80);
INSERT INTO `product_info` VALUES (19, '铝合金控鱼器彩钛路亚钳套装不锈钢多功能小鹰嘴钓鱼剪刀控鱼钳子', 99.00, 0, 'img/product_72.jpg', 'img/product_72.jpg&img/product_73.jpg&img/product_74.jpg&img/product_75.jpg&img/product_76.jpg', 1, 6, 99);
INSERT INTO `product_info` VALUES (20, 'Lureholic带秤控鱼器 控大物 铝合金路亚钳 套装 取钩摘钩抓鱼夹', 79.00, 22, 'img/product_77.jpg', 'img/product_77.jpg&img/product_78.jpg&img/product_79.jpg&img/product_80.jpg&img/product_81.jpg', 1, 6, 38);
INSERT INTO `product_info` VALUES (21, '威拓森 战神线组成品主线组绑好鱼线线组套装全套钓鱼高端正品', 39.00, 0, 'img/product_82.jpg', 'img/product_82.jpg&img/product_83.jpg&img/product_84.jpg&img/product_85.jpg', 1, 7, 27);
INSERT INTO `product_info` VALUES (22, '绑好成品大力马主线线组钓鱼线大马力全套大物鲢鳙巨物套装鱼钩', 39.00, 0, 'img/product_86.jpg', 'img/product_86.jpg&img/product_87.jpg&img/product_88.jpg&img/product_89.jpg', 1, 7, 20);
INSERT INTO `product_info` VALUES (23, '原装日本进口尼龙线绑好鱼线成品主线套装飞磕高灵敏手工竞技线组', 49.00, 55, 'img/product_90.jpg', 'img/product_90.jpg&img/product_91.jpg&img/product_92.jpg&img/product_93.jpg', 1, 7, 99);
INSERT INTO `product_info` VALUES (24, '出口欧美 不锈钢控鱼器带秤轻便路亚控鱼器 取鱼控鱼钳夹鱼抓鱼器', 59.00, 200, 'img/product_61.jpg', 'img/product_61.jpg&img/product_62.jpg&img/product_63.jpg&img/product_64.jpg&img/product_65.jpg', 1, 8, 140);
INSERT INTO `product_info` VALUES (25, '钓鱼窝米饼窝料野钓酒香腥香奶香鲫鱼鲤鱼糠饼通杀饵料打窝方块饵', 9.90, 99, 'img/product_43.jpg', 'img/product_43.jpg&img/product_44.jpg&img/product_45.jpg', 1, 8, 100);
INSERT INTO `product_info` VALUES (26, '川泽鱼漂套装高灵敏浮漂全套野钓醒目加粗鱼漂浮漂套装纳米鲫鱼漂', 19.90, 99, 'img/product_30.jpg', 'img/product_30.jpg&img/product_31.jpg&img/product_32.jpg&img/product_33.jpg', 1, 8, 20);
INSERT INTO `product_info` VALUES (27, '汉鼎鱼漂小碎目高灵敏野钓浮漂鲫鱼漂鲤鱼浮漂套装全套加粗醒目漂', 35.00, 298, 'img/product_94.jpg', 'img/product_94.jpg&img/product_95.jpg&img/product_96.jpg&img/product_97.jpg', 0, 9, 109);
INSERT INTO `product_info` VALUES (28, '民间艺人鱼漂套装高灵敏纳米全套混养轻口野钓鲫鱼漂加粗醒目浮漂', 29.00, 187, 'img/product_98.jpg', 'img/product_98.jpg&img/product_99.jpg&img/product_100.jpg&img/product_101.jpg', 0, 9, 80);
INSERT INTO `product_info` VALUES (29, '钓箱全套2022新款超轻多功能可坐2023新型钓鱼箱台钓箱子渔具装备', 158.00, 99, 'img/product_102.jpg', 'img/product_102.jpg&img/product_103.jpg&img/product_104.jpg&img/product_105.jpg', 1, 10, 180);
INSERT INTO `product_info` VALUES (30, '钓箱全套新款多功能超轻可坐钓箱装特价钓鱼箱加厚四脚升降台渔箱', 169.00, 0, 'img/product_106.jpg', 'img/product_106.jpg&img/product_107.jpg&img/product_108.jpg&img/product_109.jpg', 1, 10, 88);
INSERT INTO `product_info` VALUES (31, '佳之钓新款钓箱mini小型轻便野钓路亚钓箱多功能可坐迷你小钓鱼箱', 175.00, 88, 'img/product_110.jpg', 'img/product_110.jpg&img/product_111.jpg&img/product_112.jpg&img/product_113.jpg', 1, 10, 89);
INSERT INTO `product_info` VALUES (32, '钓箱全套2023新款超轻多功能可坐2023新型钓鱼箱台钓箱子渔具装备', 169.00, 90, 'img/product_114.jpg', 'img/product_114.jpg&img/product_115.jpg&img/product_116.jpg&img/product_117.jpg', 1, 10, 90);
INSERT INTO `product_info` VALUES (33, '天元江湖钓鱼竿手杆超轻超硬19调碳素鲤鱼竿鲫鱼竿综合台钓竿正品', 79.00, 199, 'img/product_118.jpg', 'img/product_118.jpg&img/product_119.jpg&img/product_120.jpg&img/product_121.jpg', 1, 11, 10);
INSERT INTO `product_info` VALUES (34, '浪尖逍遥鱼竿手杆超轻超硬19调大物杆台钓鲫鲤鱼竿正品鱼竿旗舰店', 190.00, 0, 'img/product_122.jpg', 'img/product_122.jpg&img/product_123.jpg&img/product_124.jpg&img/product_125.jpg', 1, 11, 34);
INSERT INTO `product_info` VALUES (35, '一味EX鱼竿手竿超轻台钓竿轻量综合竿超硬休闲野钓竿鲫鲤竿鲢鳙竿', 168.00, 193, 'img/product_126.jpg', 'img/product_126.jpg&img/product_127.jpg&img/product_128.jpg&img/product_129.jpg', 0, 11, 39);
INSERT INTO `product_info` VALUES (36, '澳西尼钓鱼竿台钓超轻超硬奥西尼手杆十大轻量大物野钓名牌旗舰店', 145.00, 99, 'img/product_130.jpg', 'img/product_130.jpg&img/product_131.jpg&img/product_132.jpg&img/product_133.jpg', 1, 11, 88);
INSERT INTO `product_info` VALUES (37, '沃鼎王者神剑钓鱼竿超轻超硬鱼竿手杆鲫鱼竿黑坑台钓竿轻量大物竿', 149.00, 102, 'img/product_134.jpg', 'img/product_134.jpg&img/product_135.jpg&img/product_136.jpg&img/product_137.jpg', 1, 11, 90);
INSERT INTO `product_info` VALUES (38, '新款碳素炮台支架超轻超硬钓鱼架杆钓箱钓椅地插竿架手竿台钓竿架', 45.00, 802, 'img/product_138.jpg', 'img/product_138.jpg&img/product_139.jpg&img/product_140.jpg&img/product_141.jpg', 1, 12, 100);
INSERT INTO `product_info` VALUES (39, '碳素支架大物超硬超轻炮台鱼竿架杆钓鱼多功能台钓椅钓箱地插架竿', 28.00, 0, 'img/product_142.jpg', 'img/product_142.jpg&img/product_143.jpg&img/product_144.jpg&img/product_145.jpg', 1, 13, 80);
INSERT INTO `product_info` VALUES (40, '不锈钢钓鱼支架多功能鱼竿架地插台钓架杆炮台支撑架鱼杆手竿杆架', 29.00, 202, 'img/product_146.jpg', 'img/product_146.jpg&img/product_147.jpg&img/product_148.jpg&img/product_149.jpg', 1, 13, 28);
INSERT INTO `product_info` VALUES (41, '久岩鲫鱼钩金袖有无刺成品子线双钩翻转防缠绕正品绑好短子线袖钩', 39.00, 1820, 'img/product_150.jpg', 'img/product_150.jpg&img/product_151.jpg&img/product_153.jpg&img/product_154.jpg', 1, 14, 289);
INSERT INTO `product_info` VALUES (42, '子线双钩成品鱼钩绑好的防缠绕伊豆伊势尼进口鲫鱼钓鱼钩套装全套', 38.00, 928, 'img/product_154.jpg', 'img/product_155.jpg&img/product_156.jpg&img/product_157.jpg&img/product_158.jpg', 1, 14, 290);
INSERT INTO `product_info` VALUES (43, '钓鱼金袖子线双钩成品进口鱼钩绑好正品伊势尼新关东鲫鱼专用袖钩', 39.90, 1999, 'img/product_159.jpg', 'img/product_159.jpg&img/product_160.jpg&img/product_161.jpg&img/product_162.jpg', 1, 14, 300);
INSERT INTO `product_info` VALUES (44, '鱼竿手竿杆套装超轻超硬名牌十大短节海鱼竿渔具套装组合全套大物', 59.90, 280, 'img/product_163.jpg', 'img/product_163.jpg&img/product_164.jpg&img/product_165.jpg&img/product_166.jpg', 1, 15, 200);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `user_tel` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户手机号',
  `user_email` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `user_avatar` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `user_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户密码，需要后端接口加密',
  `user_is_vip` int(11) NULL DEFAULT NULL COMMENT '用户是否为会员 0 否 1是',
  `user_token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户登录之后的token，需要后端接口生成，设置有效期为一周',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (4, '测试用户', '18781042709', '736722992@qq.com', 'b8d686a37ef6f65b01574b604.jpg', '3074d292c15bc5bf97bd3d07498950f0', 0, NULL);
INSERT INTO `user_info` VALUES (5, '艾向阳', '19150220870', '736722992@qq.com', NULL, '3074d292c15bc5bf97bd3d07498950f0', 0, NULL);
INSERT INTO `user_info` VALUES (6, 'nine', '15228491089', 'nine921292@gmail.com', NULL, '3074d292c15bc5bf97bd3d07498950f0', 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
