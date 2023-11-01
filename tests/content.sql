SELECT * FROM primary_route;
SELECT * FROM route_content;
SELECT * FROM content;
SELECT * FROM content_type;


select * from entity;


-- route_id, route_title, route_path, content_id, content_name, content_type_name

SELECT
pr.primary_route_id, pr.primary_route_title, pr.primary_route_icon, pr.primary_route_item_order, pr.primary_route_path, pr.primary_route_status,
c.content_id, c.content_title,
ct.content_type_title,ct.content_type_key
FROM primary_route pr
INNER JOIN route_content rt ON rt.primary_route_id = pr.primary_route_id
INNER JOIN content c ON c.content_id = rt.content_id
INNER JOIN content_type ct on ct.content_type_id = c.content_type_id;

SELECT * FROM entity;