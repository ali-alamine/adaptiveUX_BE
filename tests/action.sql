SELECT * FROM action;
SELECT * FROM content;
SELECT * FROM action_content;
SELECT * FROM event WHERE content_id = 2;
SELECT * FROM action WHERE action_id = 1;

SELECT * FROM dy_value;
SELECT a.* FROM action a 
JOIN action_content ac ON ac.action_id = a.action_id
JOIN content c ON c.content_id = ac.content_id WHERE c.content_id = 3;

SELECT a.*,ac.action_content_query,c.content_id,c.content_title FROM action a
JOIN action_content ac on ac.action_id = a.action_id
JOIN content c on c.content_id = ac.content_id WHERE c.content_id = 3;


SELECT a.*,ac.action_content_query,c.content_id,c.content_title FROM action a
    JOIN action_content ac on ac.action_id = a.action_id
    JOIN content c on c.content_id = ac.content_id WHERE c.content_id=3 and a.action_id=1;
    
    select * from action_content;



UPDATE action_content SET action_content_query = JSON_OBJECT(
"queries","['DELETE FROM entity_attribute WHERE entity_id = ', 'DELETE FROM dy_value WHERE entity_id = ', 'DELETE FROM entity WHERE entity_id =']",
"affected_tables","['entity_attribute','dy_value','entity']",
"action_desc",""
) WHERE content_id = 3 and action_id = 1;

 UPDATE action_content SET action_content_meta = JSON_OBJECT(
 "location","contenxt_menu",
 "order","3"
 ) WHERE content_id = 3 and action_id = 3;
 
-- '{
-- "queries":"[DELETE FROM entity_attribute WHERE entity_id = ", "DELETE FROM dy_value WHERE entity_id = ", "DELETE FROM entity WHERE entity_id ="]"
-- "affected_tables":"["entity_attribute","dy_value","entity"]",
-- "action_desc":""
-- }'