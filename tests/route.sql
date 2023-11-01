select * from primary_route;

select * from subroute;

select * from subroute_child;

SELECT * FROM grid;

select * from route_content;

-- UPDATE route_content SET route_content_data = JSON_OBJECT(
-- 'grid_id',3
-- );
-- insert into route_content (central_route_id) values(7);

SELECT pr.*, rc.* FROM primary_route pr
JOIN route_content rc
ON pr.primary_route_id = rc.primary_route_id; -- JSON_EXTRACT(rc.route_content_data, '$.gird_id');

-- INSERT INTO primary_route (primary_route_title,primary_route_item_order,primary_route_path) values('Invoices',1,'invoice')

INSERT INTO route_content values (null,8,JSON_OBJECT('grid_id',3))
