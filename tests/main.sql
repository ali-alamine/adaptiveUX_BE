SELECT e.entity_id, dv.field_value, a.*
    FROM entity e
    JOIN entity_attribute ea ON e.entity_id = ea.entity_id
    JOIN attribute a ON ea.attr_id = a.attr_id
    LEFT JOIN dy_value dv ON e.entity_id = dv.entity_id AND ea.attr_id = dv.attr_id
    WHERE e.entity_type = 'customer'
    ORDER BY
      CASE WHEN a.attr_key = 'null' THEN dv.field_value ELSE NULL END ASC