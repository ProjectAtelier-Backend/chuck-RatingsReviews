CREATE DATABASE sdc_ratings_and_reviews;

\c sdc_ratings_and_reviews;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INT NOT NULL,
  summary TEXT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  date VARCHAR(20) NOT NULL,
  response TEXT NULL DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  reported BOOLEAN NOT NULL
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url TEXT NULL DEFAULT NULL
);

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE IF EXISTS characteristics CASCADE;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  type VARCHAR(10) DEFAULT NULL
);

-- ---
-- Table 'characteristic_reviews'
--
-- ---

DROP TABLE IF EXISTS characteristic_reviews CASCADE;

CREATE TABLE characteristic_reviews (
  id SERIAL,
  characteristic_id INTEGER NULL DEFAULT NULL,
  review_id INTEGER NULL DEFAULT NULL,
  value INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);
-- ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
-- ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristic_reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `reviews` (`review_id`,`product_id`,`rating`,`summary`,`body`,`recommend`,`reviewer_name`,`reviewer_email`,`date`,`response`,`helpfulness`,`reported`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `photos` (`photo_id`,`review_id`,`url`) VALUES
-- ('','','');
-- INSERT INTO `characteristics` (`id`,`product_id`,`type`) VALUES
-- ('','','');
-- INSERT INTO `characteristic_reviews` (`id`,`characteristic_id`,`review_id`,`value`) VALUES
-- ('','','','');