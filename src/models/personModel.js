const pool = require('../config/db');

function fetchPerson(req, person_type, callback) {
    const base_query = `SELECT * FROM person WHERE person_type = '${person_type}'`;
    const search_criteria = req[0]?.queries;
    const sort_criteria = req[0]?.sortBy;
    const sort_type = req[0]?.sortBy[0]?.sort_type
    const limit = req[0]?.itemsPerPage;
    const currentPage = req[0]?.currentPage;
    const offset_value = currentPage && search_criteria.length == 0 ? ((parseInt(currentPage) - 1) * parseInt(limit)) : 0;

    const conditions = [];
    if (Array.isArray(search_criteria) && search_criteria.length > 0) {
        for (const criteria of search_criteria) {
            const { field_key, query } = criteria;
            conditions.push(`${field_key} LIKE '%${query}%'`);
        }
    } else {
        conditions.push('1=1');
    }

    const sortClause = [];
    if (Array.isArray(sort_criteria) && sort_criteria.length > 0) {
        for (const sort of sort_criteria) {
            sortClause.push(`${sort.field_key} ASC`);
        }
    }

    const limitClause = `limit ${limit != null ? limit : '10'}`;

    const dynamicQuery = `
  ${sortClause.length > 0 ? 'SELECT * FROM ( ' : ''}
  ${base_query} 
  ${conditions.length > 0 ? 'AND ' : ''}
  ${conditions.join(' AND ')} 
  ${sortClause.length > 0 ? 'ORDER BY ' : 'ORDER BY is_pinned DESC, person_id DESC'}
  ${sortClause.join(', ')} 
  ${limitClause} 
  ${offset_value > 0 ? 'OFFSET ' + offset_value : ''}
  ${sortClause.length > 0 ? ') AS sortQuery ORDER BY ' + req[0]?.sortBy[0]['field_key'] + ' ' + sort_type : ''} `;


    // Query for total number of records
    const totalRecordsQuery = `SELECT COUNT(*) AS total_records FROM person ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}`;

    // Execute both queries
    pool.query(dynamicQuery, (error, grid_data) => {
        if (error) {
            return callback(error, null);
        } else {
            // Execute totalRecordsQuery
            pool.query(totalRecordsQuery, (error, result) => {
                if (error) {
                    return callback(error, null);
                } else {
                    const totalRecords = result[0]?.total_records || 0;
                    const query2 = 'SELECT * FROM fields_metadata WHERE table_id = 1 ORDER BY field_order ASC';
                    pool.query(query2, (error, columnNames) => {
                        if (error) {
                            return callback(error, null);
                        } else {
                            return callback(null, { columnNames, grid_data, totalRecords });
                        }
                    });
                }
            });
        }
    });
}

function deletePerson(req, person_type, callback) {
    console.log(req, "req req");

    pool.query('DELETE FROM person WHERE person_id = ' + req, (error, result) => {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, 'Deleted successfully');
        }
    })
}

function pinPerson(req, person_type, callback) {
    pool.query('UPDATE person SET is_pinned = 1 WHERE person_id = ' + req, (error, result) => {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, 'Pinned successfully');
        }
    })
}
function unPinPerson(req, person_type, callback) {
    pool.query('UPDATE person SET is_pinned = 0 WHERE person_id = ' + req, (error, result) => {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, 'unpinned successfully');
        }
    })
}

function addNewPerson(req, callback) {
    const columns = Object.keys(req).join(', ');
    const values = Object.values(req).map(value => pool.escape(value)).join(', ');

    const query = `INSERT INTO person (${columns}) VALUES (${values})`;

    pool.query(query, (error, result) => {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, 'unpinned successfully');
        }
    });
}

module.exports = {
    fetchPerson,
    deletePerson,
    pinPerson,
    unPinPerson,
    addNewPerson,
};