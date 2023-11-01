with gridView as (
        SELECT DISTINCT e.entity_id
        FROM entity e
        JOIN entity_attribute ea ON e.entity_id = ea.entity_id
        JOIN attribute a ON ea.attr_id = a.attr_id
        LEFT JOIN dy_value dv ON e.entity_id = dv.entity_id AND a.attr_id = dv.attr_id
        WHERE e.content_id = '3' AND 1=1
    )
    SELECT e.entity_id, dv.field_value, a.attr_id, a.attr_key, a.attr_title, a.content_id, ea.attr_cell_meta, avo.attr_value_opt_value
    FROM gridView gv
    JOIN entity e ON gv.entity_id = e.entity_id
    JOIN entity_attribute ea ON ea.entity_id = e.entity_id
    JOIN attribute a ON ea.attr_id = a.attr_id
    LEFT JOIN dy_value dv ON e.entity_id = dv.entity_id AND a.attr_id = dv.attr_id AND 
		CASE WHEN a.attr_type_id = (SELECT attr_type_id from attribute_type WHERE attr_type='datalist') THEN
        -- when the field_value is the id of another attribute, then select the actual value from the same table on key field_value
        -- if this CASE WHEN a.attr_type_id = (SELECT attr_type_id from attribute_type WHERE attr_type='datalist') is true, then the field_value has the id of the another another attribute then need to select the actual value from the same table using the dv.attr_id 
			ELSE NULL
		END 
        
    LEFT JOIN attribute_value_option avo ON
        CASE
            WHEN a.attr_type_id = (SELECT attr_type_id from attribute_type WHERE attr_type='select') THEN dv.field_value
            ELSE NULL
        END = avo.attr_value_opt_id
    ORDER BY CASE WHEN a.attr_key = 'null' THEN 0 ELSE 1 END, dv.field_value ASC