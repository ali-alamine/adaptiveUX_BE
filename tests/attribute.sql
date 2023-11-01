SELECT * FROM attribute where content_id =7;
SELECT * FROM attribute_type; --  select id is 21
SELECT * FROM attribute_value;
SELECT * FROM entity_attribute WHERE attr_id =44;
SELECT * FROM attribute_value_option;
SELECT * FROM attribute_action;

SELECT * FROM attribute a left join attribute_type ea on a.attr_type_id  = ea.attr_type_id where ea.attr_type ='datalist';
-- INSERT INTO entity_attribute (entity_id, attr_id)
-- SELECT entity_id, 44
-- FROM entity
-- WHERE content_id = 3;
