const debug = require('debug')('app:sqliteDb');
const path = require('path');
//SQLite3
const sqlite3 = require('sqlite3');

// db Name
const dbName = path.join(__dirname, (process.env.DB_NAME ?? 'home.db'));

debug('This is module %s', path.basename(__filename));
debug('Database filename: %s', dbName);

//private functions

function connectHandler(err) {
    if (err) {
        debug('Error connecting to database - %s', err.message);
        return
    }
    debug('db created');
}

// sqlite database object 


// Generic private sqlite functions 

async function sqliteExecute(db, sql, params = []) {
    if (params && params.length > 0) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

async function sqliteFetchAll(db, sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

async function sqliteFetchFirst(db, sql, params) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

// Exported sqlite async functions. Use await to call

async function execute(sql, params) {
    const db = new sqlite3.Database(dbName);
    try {
        await sqliteExecute(db,sql,params);
    } catch (error) {
        debug('Error executing SQL: %s',error.message)
    } finally {
        if (db) {db.close()}
    }
}

async function fetchAll(sql, params) {
    const db = new sqlite3.Database(dbName);
    try {
        await sqliteFetchAll(db,sql,params);
    } catch (error) {
        debug('Error executing SQL: %s',error.message)
    } finally {
        if (db) {db.close()}
    }
}

async function fetchFirst(sql, params) {
    const db = new sqlite3.Database(dbName);
    try {
        await sqliteFetchFirst(db,sql,params);
    } catch (error) {
        debug('Error executing SQL: %s',error.message)
    } finally {
        if (db) {db.close()}
    }
}

debug('Exporting Module functions');

module.exports = {
    execute,
    fetchAll,
    fetchFirst
}
