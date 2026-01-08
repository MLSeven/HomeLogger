// SQLite3 repo functions
const debug = require('debug')('app:repo');
const path = require('path');

// import sqlite Interface functions
const dataBase = require(path.join(__dirname,'sqliteDb.js'));

// Create Table

async function createLog() {

    const sqlCmd = `CREATE TABLE IF NOT EXISTS homelog(
        id INTEGER PRIMARY KEY,
        tag TEXT NOT NULL,
        device TEXT NOT NULL,
        reading TEXT NOT NULL,
        state INTEGER,
        timestamp TEXT NOT NULL
    )`;
    try {
        debug('Seeding Database if required');
        await dataBase.execute(sqlCmd,[]);
    } catch (error) {
        console.log(error);
        debug('Error seeding homelog table');
    }
}

async function newLogEntry(logEntry) {
    const sql = `INSERT INTO homelog(tag, device, reading, state, timestamp) VALUES(?, ?, ?, ?, ?)`;
    try {
        debug('Inserting into table homelog');
        let params = [
            logEntry.tag,
            logEntry.device,
            logEntry.reading,
            logEntry.state,
            logEntry.timestamp
        ];
        console.log(params)
        await dataBase.execute(sql, params);

    } catch (error) {
        console.log(error);
        debug('Error seeding homelog table');
    }
}

debug('Exporting Module functions');

module.exports = {
    createLog,
    newLogEntry
}