-- update an empty column:
UPDATE attribute_value
SET attr_fetch_value = JSON_OBJECT('fetchBy', 'content_id', 'fetchVal', '2')
WHERE attr_value_id = 2;

UPDATE attribute_value
SET attr_fetch_value = JSON_OBJECT('criteria', JSON_OBJECT('fetchBy', 'content_id', 'fetchValue', '2', 'attrId', '3'))
WHERE attr_value_id = 2;

UPDATE attribute_value
SET attr_fetch_value = JSON_OBJECT('criteria', JSON_OBJECT('fetch_by', 'content_id', 'fetch_value', '2', 'attr_ids', JSON_ARRAY(31, 32)))
WHERE attr_value_id = 2;

