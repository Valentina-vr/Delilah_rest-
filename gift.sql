/*creating the database*/
CREATE DATABASE `delilah_resto` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;

/*creating the tables in the database */

DROP TABLE IF EXISTS `delilah_resto`.`users`;
CREATE TABLE `delilah_resto`.`users`
(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `telephone` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `isAdmin` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `delilah_resto`.`products`;
CREATE TABLE `delilah_resto`.`products` 
(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `description` varchar(255) NOT NULL,
    `type` varchar(255) NOT NULL,
    `price` varchar(255) NOT NULL,
    `imagen` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `delilah_resto`.`requests`;
CREATE TABLE `delilah_resto`.`requests` 
(
    `id` int NOT NULL AUTO_INCREMENT,
    `userId` int NOT NULL,
    `request_date` datetime NOT NULL,
    `state` varchar(255) NOT NULL,
    `pay_method` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `userId` (`userId`),
    CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `delilah_resto`.`orders`;
CREATE TABLE `delilah_resto`.`orders` 
(
    `requestId` int NOT NULL,
    `productId` int NOT NULL,
    `quantity` int NOT NULL,
    PRIMARY KEY (`requestId`,`productId`),
    UNIQUE KEY `orders_requestId_productId_unique` (`requestId`,`productId`),
    KEY `productId` (`productId`),
    CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`requestId`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/*adding the data in the tables */

INSERT INTO `delilah_resto`.`users`
    (`id`,`name`,`email`,`password`,`telephone`,`address`,`isAdmin`)
VALUES
    ('1','Martin Villada','martinvillada@gmail.com','789456123','123456789', 'Cra 38 # 45 Sur', 0),
    ('2','Nikki Villada','nikkivillada@gmail.com','789456123','123456789', 'Cra 38 # 45 Sur', 1),
    ('3','Thoby Villada','thobyvillada@gmail.com','789456123','123456789', 'Cra 38 # 45 Sur', 0),
    ('4','Minnie Villada','minnievillada@gmail.com','789456123','123456789', 'Cra 38 # 45 Sur', 0),
    ('5','Valentin Villada','valentinvillada@gmail.com','789456123','123456789', 'Cra 38 # 45 Sur', 0),
    ('6','Arya Jimenez','aryajimeneza@gmail.com','789456123','123456789', 'Cra 38 # 45 Sur', 0)
    ;

INSERT INTO `delilah_resto`.`products`
    (`id`,`name`,`description`,`type`,`price`,`imagen`)
VALUES
    ('1', 'Hamburguesa', 'Bread with meat, tomato, bacon and cheese', '1', '30000', 'https://www.hosteleriasalamanca.es/fotos/1558942005.6261.jpg'),
    ('2', 'Hot dog', 'sausage breada', '2', '15000', 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2020/06/hot-dogs-estilo-sonora.jpg'),
    ('3', 'Pizza', 'Pizza Napolitana', '3', '30000', 'https://solorecetas.com/wp-content/uploads/2017/05/pizza-napolitana-2.jpg'),
    ('4', 'Fries', 'bacon sausage fries', '4000', '35', 'http://bayoucitywings.com/wp-content/uploads/2012/09/CheesyBaconFries.jpg'),
    ('5', 'Beer', 'Stout beer', '5', '10000', 'https://cdn.tasteatlas.com/images/ingredients/6b580a058cda4914ac1119ba9c338838.jpg?mw=1300')
    ;

INSERT INTO `delilah_resto`.`requests`
    (`id`,`userId`,`request_date`,`state`,`pay_method`)

VALUES
    ('1','1','2020-11-02 00:50:50', 'new', 'cash'),
    ('2','1','2020-11-02 00:50:50','New','credit_card'),
    ('3','2','2020-11-02 00:52:50','in progress','cash'),
    ('4','3','2020-11-02 00:53:50','in progress','credit_card'),
    ('5','4','2020-11-02 00:55:50','Canceled','cash'),
    ('6','5','2020-11-02 00:58:50','New','cash')
    ;

INSERT INTO `delilah_resto`.`orders`
    (`requestId`,`productId`,`quantity`)
VALUES
    ('1','1','3'),
    ('2','2','2'),
    ('3','1','3'),
    ('4','5','5'),
    ('1','3','3')
    ;
