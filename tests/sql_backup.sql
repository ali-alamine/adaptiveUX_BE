-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pulse_core
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pulse_core
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pulse_core` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pulse_core` ;

-- -----------------------------------------------------
-- Table `pulse_core`.`attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`attribute` (
  `attr_id` INT NOT NULL AUTO_INCREMENT,
  `attr_name` VARCHAR(255) NULL DEFAULT NULL,
  `attr_data_type` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`attr_id`),
  UNIQUE INDEX `attr_name` (`attr_name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core`.`entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`entity` (
  `entity_id` INT NOT NULL AUTO_INCREMENT,
  `entity_type` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`entity_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core`.`dy_value`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`dy_value` (
  `value_id` INT NOT NULL AUTO_INCREMENT,
  `entity_id` INT NULL DEFAULT NULL,
  `attr_id` INT NULL DEFAULT NULL,
  `field_value` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`value_id`),
  INDEX `entity_id` (`entity_id` ASC) VISIBLE,
  INDEX `attr_id` (`attr_id` ASC) VISIBLE,
  CONSTRAINT `dy_value_ibfk_1`
    FOREIGN KEY (`entity_id`)
    REFERENCES `pulse_core`.`entity` (`entity_id`),
  CONSTRAINT `dy_value_ibfk_2`
    FOREIGN KEY (`attr_id`)
    REFERENCES `pulse_core`.`attribute` (`attr_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core`.`entity_attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`entity_attribute` (
  `entity_id` INT NOT NULL,
  `attr_id` INT NOT NULL,
  PRIMARY KEY (`entity_id`, `attr_id`),
  INDEX `attr_id` (`attr_id` ASC) VISIBLE,
  CONSTRAINT `entity_attribute_ibfk_1`
    FOREIGN KEY (`entity_id`)
    REFERENCES `pulse_core`.`entity` (`entity_id`),
  CONSTRAINT `entity_attribute_ibfk_2`
    FOREIGN KEY (`attr_id`)
    REFERENCES `pulse_core`.`attribute` (`attr_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core`.`fields_metadata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`fields_metadata` (
  `field_id` INT NOT NULL AUTO_INCREMENT,
  `assigned_to` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `field_key` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `field_order` INT NULL DEFAULT NULL,
  `field_title` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `field_type` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `filter_by` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `is_hidden` TINYINT NULL DEFAULT NULL,
  `is_filterable` TINYINT NULL DEFAULT '1',
  `is_sortable` TINYINT NULL DEFAULT '1',
  `table_id` INT NULL DEFAULT NULL,
  `field_width` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `is_in_form` TINYINT(1) NOT NULL DEFAULT '1',
  `form_order` INT NULL DEFAULT NULL,
  `is_required` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`field_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13;


-- -----------------------------------------------------
-- Table `pulse_core`.`main_menu_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`main_menu_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `icon` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `is_sub_menu` TINYINT NULL DEFAULT NULL,
  `order_num` INT NULL DEFAULT NULL,
  `parent_id` INT NULL DEFAULT NULL,
  `route` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8;


-- -----------------------------------------------------
-- Table `pulse_core`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`person` (
  `person_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `last_name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `email` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `phone` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `person_type` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `address` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `birthdate` DATE NULL DEFAULT NULL,
  `city` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `company` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `country` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_pinned` TINYINT NULL DEFAULT '0',
  `job_title` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `last_contact_date` DATE NULL DEFAULT NULL,
  `notes` TEXT COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `postal_code` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `preferred_contact` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `source` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `state` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `status` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `total_purchases` INT NULL DEFAULT NULL,
  `total_spent` DECIMAL(10,2) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`person_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1121;


-- -----------------------------------------------------
-- Table `pulse_core`.`table_registry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core`.`table_registry` (
  `table_id` INT NOT NULL AUTO_INCREMENT,
  `table_name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`table_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
