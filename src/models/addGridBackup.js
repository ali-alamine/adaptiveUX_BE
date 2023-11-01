function addGridRecord(req, callback) {
    let request = req;
    const content_id = req.contentID;
    const userValues = request.userValues;
    let user_entered_values = [];
    for (let i = 0; i < userValues.length; i++) {
        user_entered_values.push(JSON.parse(userValues[i]));
    }

    pool.getConnection((err, conn) => {
        conn.beginTransaction((error) => {
            if (error) {
                conn.release();
                return callback(error, null);
            } else {

                // 1. Insert into entity
                const insertEntityQuery = `INSERT INTO entity (content_id, created_at, updated_at) values('${content_id}',now(),now())`;
                conn.query(insertEntityQuery, (error, result) => {
                    if (error) {
                        conn.rollback(() => { conn.release(); });
                        return callback(error, null);
                    }

                    // 2. Get attributes
                    let entityID = result.insertId;
                    const attrIDsQuery = `SELECT attr_id,attr_key from attribute WHERE content_id = '${content_id}'`; // AND JSON_EXTRACT(attr_meta,'$.in_form') = 1
                    conn.query(attrIDsQuery, (error, result_attributes) => {
                        if (error) {
                            conn.rollback(() => { conn.release(); });
                            return callback(error, null);
                        }

                        // 3. Link entity with its corresponding attr IDS
                        const attributeIDs = result_attributes.map(row => row.attr_id);
                        const IDs = attributeIDs.map(attrID => [entityID, attrID]);
                        const linkEntityAttributeQuery = `INSERT INTO entity_attribute(entity_id, attr_id) values ?`;
                        conn.query(linkEntityAttributeQuery, [IDs], (error, result) => {
                            if (error) {
                                conn.rollback((error) => { conn.release(); });
                                return callback(error, null);
                            }

                            // 4. Insert into values
                            let successfulQueries = 0;
                            for (let i = 0; i < user_entered_values.length; i++) {
                                const insertIntoValuesQuery = `INSERT INTO dy_value (entity_id,attr_id,field_value) values (?,?,?)`;
                                let values = [entityID, user_entered_values[i].attr_id, user_entered_values[i].entered_value];

                                conn.query(insertIntoValuesQuery, values, (error, result) => {
                                    if (error) {
                                        console.log(error)
                                        conn.rollback((rollbackError) => {
                                            conn.release();
                                            return callback(error, null);
                                        });
                                    } else {
                                        successfulQueries++;
                                        if (successfulQueries === user_entered_values.length) {

                                            // 5. Fetch events
                                            const fetchConfigurationQuery = `SELECT * FROM event WHERE content_id = '${content_id}'`;
                                            conn.query(fetchConfigurationQuery, (error, result) => {
                                                if (error) {
                                                    conn.rollback((rollbackError) => {
                                                        conn.release();
                                                        return callback(error, null);
                                                    });
                                                }

                                                if (result.length > 0) {
                                                    let event_data = result[0];
                                                    let event_criteria = event_data.event_trigger_criteria;
                                                    let event_source = event_criteria.event.event_source;
                                                    let event_validate = event_criteria.validate;
                                                    let event_action = event_criteria.action;
                                                    let query_attr_id = event_source.to_update_attr_id;;
                                                    let query_entity_id = '';

                                                    for (let i = 0; i < user_entered_values.length; i++) {
                                                        if (user_entered_values[i].attr_id == event_source.mapping_source_id) {
                                                            let enteredValue = JSON.parse(user_entered_values[i].entered_value);
                                                            query_entity_id = enteredValue.entity_id;
                                                        }
                                                    }

                                                    let event_validate_query = `${event_validate.validate_query} ${query_entity_id} limit 1`;
                                                    console.log(event_validate_query, " >>>>>>>>>>>>>>>>>>>>>> event_validate_query");
                                                    pool.query(event_validate_query, (error, event_validate_result) => {
                                                        if (error) {
                                                            conn.rollback((rollbackError) => {
                                                                conn.release();
                                                                return callback(error, null);
                                                            });
                                                        }
                                                        let validate_res = event_validate_result[0];
                                                        // 6.1 if validation returns value then execute action query
                                                        if ((event_validate_result.length > 0) && (validate_res[event_validate.validate_on.key] != event_validate.validate_on.value)) {
                                                            console.log(event_validate_result, " >>>>>>>>>>>>>>>>>>>>>> event_validate_result");
                                                            let event_query = event_action.action_query + event_action.action_formula + event_action.action_query_where + query_entity_id + " " + event_action.action_query_and + query_attr_id;
                                                            pool.query(event_query, (error, result) => {
                                                                if (error) {
                                                                    conn.rollback((rollbackError) => {
                                                                        conn.release();
                                                                        return callback(error, null);
                                                                    });
                                                                }
                                                                // Commit queries
                                                                conn.commit((commitError) => {
                                                                    if (commitError) {
                                                                        conn.rollback((rollbackError) => {
                                                                            conn.release();
                                                                            return callback(commitError, null);
                                                                        });
                                                                    } else {
                                                                        conn.release();
                                                                        return callback(null, `${user_entered_values.length} records inserted successfully`);
                                                                    }
                                                                });
                                                            });

                                                        } else {
                                                            // 6.2 if validation returns empty then execute validate_action query
                                                            const checkActionQuery = `${event_validate.validate_action} ${query_entity_id});`;
                                                            console.log(checkActionQuery, " >>>>>>>>>>>>>>>>>>>>>> checkActionQuery");
                                                            pool.query(checkActionQuery, (error, result) => {
                                                                if (error) {
                                                                    conn.rollback((rollbackError) => {
                                                                        conn.release();
                                                                        return callback(error, null);
                                                                    });
                                                                } else {
                                                                    // Commit queries
                                                                    conn.commit((commitError) => {
                                                                        if (commitError) {
                                                                            conn.rollback((rollbackError) => {
                                                                                conn.release();
                                                                                return callback(commitError, null);
                                                                            });
                                                                        } else {
                                                                            conn.release();
                                                                            return callback(null, `${user_entered_values.length} records inserted successfully`);
                                                                        }
                                                                    });
                                                                }

                                                            });
                                                        }
                                                    });

                                                } else {

                                                    conn.commit((commitError) => {
                                                        if (commitError) {
                                                            conn.rollback((rollbackError) => {
                                                                conn.release();
                                                                return callback(commitError, null);
                                                            });
                                                        } else {
                                                            conn.release();
                                                            return callback(null, `${user_entered_values.length} records inserted successfully`);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        })

                    })

                })
            }
        })
    })
}