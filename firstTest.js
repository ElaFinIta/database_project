'use strict';

const Database = require('./database');
const mariadb = require('./database');

const options = {
        host:'localhost',  // the host of the db
        port: 3306,  // default port of the db, NOT the server post
        user: 'zeke',
        password: 'secret',
        database: 'employeedb',
        allowPublicKeyRetrieval: true  // mysql users need this
};

const db = new Database(options);
db.doQuery('select * from employee').then(console.log).catch(console.log);