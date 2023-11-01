--  **************************** 1. Add primary routes    **************************** 
-- INSERT INTO primary_route (`primary_route_title`,`primary_route_item_order`,
-- `primary_route_path`, `primary_route_status`, `primary_route_created_at`, `primary_route_updated_at`)
-- values
-- ('Dashboard',1,'dashboard','active',now(),now()),
-- ('Stock',1,'stock','active',now(),now()),
-- ('Invoice',1,'invoice','active',now(),now()),
-- ('Purchase',1,'purchase','active',now(),now()),
-- ('Supplier',1,'supplier','active',now(),now()),
-- ('Client',1,'client','active',now(),now()),
-- ('Report',1,'report','active',now(),now())

--  **************************** 2. Add contents    **************************** 
-- INSERT INTO content (`content_type_id`, `content_title`) 
-- VALUES
-- (1,'Stock'),
-- (1,'Invoice'),
-- (1,'Purchase'),
-- (1,'Supplier'),
-- (1,'Client'),
-- (1,'Report')

--  **************************** 3. Link content with Routes    ****************************
-- INSERT INTO route_content (primary_route_id,content_id)
-- VALUES
-- (10,4),
-- (11,5),
-- (12,6),
-- (13,7),
-- (14,8),
-- (15,9)

--  **************************** 4. Define content variables (attributes)  ****************************

-- ------ STOCK
-- INSERT INTO `attribute`
-- (`attr_type_id`,
-- `content_id`,
-- `attr_key`,
-- `attr_title`,
-- `attr_meta`)
-- VALUES
-- (16,4,'item_code','Item code','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 1, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (16,4,'item_name','Item name','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 2, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (9,4,'item_buying_price','Item Cost','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 3, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (9,4,'item_selling_price','Item Price','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 4, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (9,4,'item_quantity_per_package','Quantity per package','{"in_form": 1, "in_grid": 1, "is_hidden": 5, "attr_order": 5, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (9,4,'item_total_quantity','Total Quantity','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 6, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (22,4,'item_supplier','Item supplier','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 7, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (16,4,'item_description','Item description','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 8, "attr_width": "", "is_sortable": 1, "is_filterable": 1}')

-- ---- Invoice

-- INSERT INTO `attribute`
-- (`attr_type_id`,
-- `content_id`,
-- `attr_key`,
-- `attr_title`,
-- `attr_meta`)
-- VALUES
-- (16,5,'invoice_number','#','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 1, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (16,5,'Invoice_total_price','Total price','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 2, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (22,5,'Invoice_supplier','Supplier name','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 3, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (4,5,'Invoice_issued_date','Issued date','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 4, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (22,5,'invoice_status','Invoice status','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 5, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (22,5,'invoice_items','Invoice items','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 6, "attr_width": "", "is_sortable": 1, "is_filterable": 1}')

-- -- Supplier
-- INSERT INTO `attribute`
-- (`attr_type_id`,
-- `content_id`,
-- `attr_key`,
-- `attr_title`,
-- `attr_meta`)
-- VALUES
-- (16,7,'supplier_full_name','Name','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 1, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (16,7,'supplier_first_name','First name','{"in_form": 1, "in_grid": 0, "is_hidden": 0, "attr_order": 2, "attr_width": "", "is_sortable": 0, "is_filterable": 0}'),
-- (16,7,'supplier_last_name','Last name','{"in_form": 1, "in_grid": 0, "is_hidden": 0, "attr_order": 3, "attr_width": "", "is_sortable": 0, "is_filterable": 0}'),
-- (9,7,'supplier_total_invoices','Total invoices','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 4, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (9,7,'supplier_unpaid_invoices','Un-paid invoices','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 5, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (9,7,'supplier_paid_invoices','Paid invoices','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 6, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (5,7,'supplier_email','Email','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 7, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (15,7,'supplier_phone','Phone','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 7, "attr_width": "", "is_sortable": 1, "is_filterable": 1}');


-- -- Client

-- INSERT INTO `attribute`
-- (`attr_type_id`,
-- `content_id`,
-- `attr_key`,
-- `attr_title`,
-- `attr_meta`)
-- VALUES
-- (16,8,'client_full_name','Name','{"in_form": 0, "in_grid": 1, "is_hidden": 0, "attr_order": 1, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (16,8,'client_first_name','First name','{"in_form": 1, "in_grid": 0, "is_hidden": 0, "attr_order": 2, "attr_width": "", "is_sortable": 0, "is_filterable": 0}'),
-- (16,8,'client_last_name','Last name','{"in_form": 1, "in_grid": 0, "is_hidden": 0, "attr_order": 3, "attr_width": "", "is_sortable": 0, "is_filterable": 0}'),
-- (5,8,'client_email','Email','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 4, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (15,8,'client_phone','Phone','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 5, "attr_width": "", "is_sortable": 1, "is_filterable": 1}'),
-- (16,8,'client_address','Address','{"in_form": 1, "in_grid": 1, "is_hidden": 0, "attr_order": 6, "attr_width": "", "is_sortable": 1, "is_filterable": 1}');


 --  Placeholders
-- SELECT * FROM attribute WHERE content_id =4; -- stock
-- INSERT INTO `pulse_core`.`attribute_value` (`attr_id`, `attr_custom_placeholder`) VALUES ('46', 'Item name');