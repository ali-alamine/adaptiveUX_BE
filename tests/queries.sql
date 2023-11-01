
-- insert into entity
INSERT INTO entity values(null,'customer',now(),now());

  -- inset into attribute
INSERT INTO attribute
(attr_id, attr_name, attr_data_type, attr_title, attr_order, filter_by, is_hidden, is_filterable, is_sortable, attr_width, is_required)
values
(null,'customer_first_name','varchar','First name',1,'text',0,1,1,null,1),
(null,'customer_last_name','varchar','First name',1,'text',0,1,1,null,1),
(null,'customer_email','varchar','Email','1','text',0,1,1,null,1),
(null,'customer_phone_number','varchar','phone',1,'text',0,1,1,null,1),
(null,'customer_notes','varchar','Notes',1,'text',0,1,1,null,1);

select * from entity;
select * from attribute;
-- insert into entity_attribute
INSERT INTO entity_attribute (entity_id, attr_id)
VALUES
    (36, 12),
    (36, 13),
    (36, 14),
    (36, 15),
    (36, 16);
    
-- INSERT INTO dy_value
INSERT INTO dy_value(entity_id, attr_id, field_value)
values
(36,12,'CAli'),
(36,13,'CAl Amine'),
(36,14,'Calamine128@gmail.com'),
(36,15,'17516411086'),
(36,16,'C test note');

-- SELECT all entity types
SELECT e.entity_id, a.*, dv.field_value
FROM entity e
JOIN entity_attribute ea ON e.entity_id = ea.entity_id
JOIN attribute a ON ea.attr_id = a.attr_id
LEFT JOIN dy_value dv ON e.entity_id = dv.entity_id AND ea.attr_id = dv.attr_id
WHERE e.entity_type = 'customer'; -- Specify the entity type for employees

-- select certain entity by id
SELECT e.entity_id, e.entity_type, ea.attr_id, a.attr_name, dv.field_value
FROM entity e
JOIN entity_attribute ea ON e.entity_id = ea.entity_id
JOIN attribute a ON ea.attr_id = a.attr_id
LEFT JOIN dy_value dv ON e.entity_id = dv.entity_id AND ea.attr_id = dv.attr_id
WHERE e.entity_type = 'employee' -- Specify the entity mtype for employees
AND e.entity_id = 2;

-- update entity by ID
UPDATE dy_value
SET field_value = 'Moe'
WHERE entity_id = 2
  AND attr_id = 1;
  
  -- UPDATE attribute
  
UPDATE attribute
SET attr_meta = JSON_SET(attr_meta, '$.is_sortable', 1, '$.is_filterable', 1)
 where attr_id = 12;
 
  UPDATE `attribute`
SET `attr_meta` = JSON_SET(attr_meta,'$.attr_order','5')
WHERE `attr_id` =16;
select * from attribute where attr_for ='customer';

-- JSON
SELECT *
FROM attribute
WHERE CAST(JSON_EXTRACT(attr_meta, '$.in_form') AS SIGNED) = 0;


UPDATE attribute SET attr_meta = JSON_OBJECT(
'$.in_form',1,
'$.in_grid',1,
'$.is_hidden',0,
'$.attr_order',1,
'$.attr_width','',
'$.is_sortable',1,
'$.is_filterable',1
);
