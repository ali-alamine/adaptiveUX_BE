-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pulse_core_adaptive
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pulse_core_adaptive
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pulse_core_adaptive` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pulse_core_adaptive` ;

-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`action` (
  `action_id` INT NOT NULL AUTO_INCREMENT,
  `action_key` VARCHAR(100) NULL DEFAULT NULL,
  `action_title` VARCHAR(100) NULL DEFAULT NULL,
  `action_icon` VARCHAR(100) NULL DEFAULT NULL,
  `action_desc` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`action_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`action_content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`action_content` (
  `content_id` INT NOT NULL,
  `action_id` INT NOT NULL,
  `action_content_query` JSON NULL DEFAULT NULL,
  `action_content_meta` JSON NULL DEFAULT NULL,
  PRIMARY KEY (`content_id`, `action_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`attribute` (
  `attr_id` INT NOT NULL AUTO_INCREMENT,
  `attr_type_id` INT NULL DEFAULT NULL,
  `content_id` INT NULL DEFAULT NULL,
  `attr_key` VARCHAR(255) NULL DEFAULT NULL,
  `attr_title` VARCHAR(255) NULL DEFAULT NULL,
  `attr_meta` JSON NULL DEFAULT NULL,
  PRIMARY KEY (`attr_id`),
  UNIQUE INDEX `attr_name` (`attr_key` ASC) VISIBLE,
  INDEX `idx_attribute_grid_id` (`content_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 73
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`attribute_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`attribute_type` (
  `attr_type_id` INT NOT NULL AUTO_INCREMENT,
  `attr_type_name` VARCHAR(100) NULL DEFAULT NULL,
  `attr_type` VARCHAR(70) NULL DEFAULT NULL,
  `attr_type_placeholder` VARCHAR(100) NULL DEFAULT NULL,
  `attr_data_type` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`attr_type_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`attribute_value`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`attribute_value` (
  `attr_value_id` INT NOT NULL AUTO_INCREMENT,
  `attr_id` INT NOT NULL,
  `attr_fetch_value` JSON NULL DEFAULT NULL,
  `attr_custom_placeholder` VARCHAR(100) NULL DEFAULT NULL,
  `attr_entered_value` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`attr_value_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`attribute_value_option`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`attribute_value_option` (
  `attr_value_opt_id` INT NOT NULL AUTO_INCREMENT,
  `attr_value_id` INT NULL DEFAULT NULL,
  `attr_value_opt_value` VARCHAR(255) NULL DEFAULT 'NA',
  `attr_value_opt_is_active` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`attr_value_opt_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`content` (
  `content_id` INT NOT NULL AUTO_INCREMENT,
  `content_type_id` INT NOT NULL,
  `content_title` VARCHAR(45) NULL DEFAULT NULL,
  `event_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`content_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`content_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`content_type` (
  `content_type_id` INT NOT NULL AUTO_INCREMENT,
  `content_type_title` VARCHAR(45) NULL DEFAULT NULL,
  `content_type_key` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`content_type_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`entity` (
  `entity_id` INT NOT NULL AUTO_INCREMENT,
  `content_id` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`entity_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 275
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`dy_value`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`dy_value` (
  `value_id` INT NOT NULL AUTO_INCREMENT,
  `entity_id` INT NULL DEFAULT NULL,
  `attr_id` INT NULL DEFAULT NULL,
  `field_value` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`value_id`),
  INDEX `entity_id` (`entity_id` ASC) VISIBLE,
  INDEX `attr_id` (`attr_id` ASC) VISIBLE,
  CONSTRAINT `dy_value_ibfk_1`
    FOREIGN KEY (`entity_id`)
    REFERENCES `pulse_core_adaptive`.`entity` (`entity_id`),
  CONSTRAINT `dy_value_ibfk_2`
    FOREIGN KEY (`attr_id`)
    REFERENCES `pulse_core_adaptive`.`attribute` (`attr_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 725
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`entity_attribute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`entity_attribute` (
  `entity_id` INT NOT NULL,
  `attr_id` INT NOT NULL,
  `attr_cell_meta` JSON NULL DEFAULT NULL,
  `content_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`entity_id`, `attr_id`),
  INDEX `attr_id` (`attr_id` ASC) VISIBLE,
  CONSTRAINT `entity_attribute_ibfk_1`
    FOREIGN KEY (`entity_id`)
    REFERENCES `pulse_core_adaptive`.`entity` (`entity_id`),
  CONSTRAINT `entity_attribute_ibfk_2`
    FOREIGN KEY (`attr_id`)
    REFERENCES `pulse_core_adaptive`.`attribute` (`attr_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`event` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `content_id` INT NULL DEFAULT NULL,
  `event_name` VARCHAR(45) NULL DEFAULT NULL,
  `event_trigger_criteria` JSON NULL DEFAULT NULL,
  `event_priority` INT NULL DEFAULT NULL,
  `event_notification_email` VARCHAR(100) NULL DEFAULT NULL,
  `event_log` VARCHAR(255) NULL DEFAULT NULL,
  `event_tags` VARCHAR(255) NULL DEFAULT NULL,
  `event_note` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`json_references`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`json_references` (
  `ref_id` INT NOT NULL AUTO_INCREMENT,
  `table_name` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `ref_value` JSON NULL DEFAULT NULL,
  `desc` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`ref_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`primary_route`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`primary_route` (
  `primary_route_id` INT NOT NULL AUTO_INCREMENT,
  `primary_route_title` VARCHAR(255) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `primary_route_icon` VARCHAR(255) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `primary_route_item_order` INT NULL DEFAULT NULL,
  `primary_route_path` VARCHAR(255) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `primary_route_status` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `primary_route_created_at` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  `primary_route_updated_at` VARCHAR(45) CHARACTER SET 'utf8mb3' NULL DEFAULT NULL,
  PRIMARY KEY (`primary_route_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`route_content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`route_content` (
  `route_content_id` INT NOT NULL AUTO_INCREMENT,
  `primary_route_id` INT NULL DEFAULT NULL,
  `content_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`route_content_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`subroute`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`subroute` (
  `subroute_id` INT NOT NULL,
  `primary_route_id` INT NULL DEFAULT NULL,
  `subroute_title` VARCHAR(100) NULL DEFAULT NULL,
  `subroute_path` VARCHAR(255) NULL DEFAULT NULL,
  `subroute_created_at` DATETIME NULL DEFAULT NULL,
  `subroute_updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`subroute_id`),
  INDEX `idx_subroute_route_id` (`primary_route_id` ASC) VISIBLE,
  CONSTRAINT `fk_subroute_route_id`
    FOREIGN KEY (`primary_route_id`)
    REFERENCES `pulse_core_adaptive`.`primary_route` (`primary_route_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`subroute_child`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`subroute_child` (
  `subroute_child_id` INT NOT NULL,
  `subroute_id` INT NULL DEFAULT NULL,
  `subroute_child_title` VARCHAR(100) NULL DEFAULT NULL,
  `subroute_child_path` VARCHAR(100) NULL DEFAULT NULL,
  INDEX `fk_subroute_child_subroute_id` (`subroute_id` ASC) VISIBLE,
  CONSTRAINT `fk_subroute_child_subroute_id`
    FOREIGN KEY (`subroute_id`)
    REFERENCES `pulse_core_adaptive`.`subroute` (`subroute_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pulse_core_adaptive`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pulse_core_adaptive`.`user_role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `role_name` VARCHAR(50) NOT NULL,
  `role_description` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name` (`role_name` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_role_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `pulse_core_adaptive`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
