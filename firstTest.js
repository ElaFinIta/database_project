'use strict';

const MariaDb= require('./database');  // this file does not know what database we are using... encapsulated. Generic approach.

const options = {
        host:'localhost',  // the host of the db
        port: 3306,  // default port of the db, NOT the server post
        user: 'zeke',
        password: 'secret',
        database: 'employeedb',
        allowPublicKeyRetrieval: true  // mysql users need this
};

const db = new MariaDb(options);
// db.doQuery('select * from employee').then(console.log).catch(console.log);
function printWorkers(employees){
    for (let person of employees) {
        console.log(`${person.employeeId}: ${person.firstname} ${person.lastname}`+` Dept: ${person.department}, ${person.salary} €`);
    }
}

async function getAll() {
    try {
        const result = await db.doQuery('select * from employee');
        if (result.resultSet) {
            printWorkers(result.queryResult);
        }
    } catch(error) {
        console.log(error);
    }
};


async function get(id) {
    try {
        const result = await db.doQuery('select * from employee where employeeId=?', [id]);
        printWorkers(result.queryResult);
    } catch(err) {
        console.log(err);
    }
}

async function add(person) {
    try {
        const parameters = [
            person.employeeId,
            person.firstname,
            person.lastname,
            person.deparment,
            person.salary
        ];
        // alternative of the comemnted above but we dont know the order...
        // const parameters = Object.values(person)

        const sql = 'insert into employee values(?,?,?,?,?)';
        const status = await db.doQuery(sql, parameters);
        console.log('Status object', status);
    } catch(error) {
        console.log(error);
    }
}

async function remove(id) {
    try {
        const sql = 'delete from employee where employeeId=?';
        const status = await db.doQuery(sql, [id]);
        console.log('removal status', status);
    } catch (error) {
        console.log(error);
    }
}

async function update(person) {
    try {
        const sql = 'update employee set firstname=?, lastname=?, department=?, salary=? ' + 'where employeeId=?';
        const parameters = [
            person.firstname,
            person.lastname,
            person.deparment,
            person.salary,
            person.employeeId,
        ];
        const result = await db.doQuery('select employeeId from employee where employeeId=?', [person.employeeId]);
        if (result.queryResult.queryResult.lenght === 0) {
            console.log('nothing to update');
        } else  {
            const status = await db.doQuery(sql, parameters);
            console.log('update status: rowsChanged=', status.queryResult.rowsChanges);
        }

    } catch (error) {
        console.log(error);
    }
}


getAll();
async function run(){
    // without the await, async function will end when they end, you cannot know in wich order they'll output
    // console.log('#### get 1 ####');
    await get(1);
    // console.log('#### get 2 ####');
    await get(2);
    await remove(500);
    console.log('##### add #####');
    const newEmp = {
        employeeId: 200,
        firstname: 'Paul',
        lastname: 'Jones',
        deparment: 'maintenance',
        salary: 5000
    };
    await add(newEmp);
    console.log('#### remove 500  ####');
    await remove(500);
    await getAll();
    const updatedEmp = {
        employeeId: 2,
        firstname: "Maryxxxx",
        lastname: "Smithxxxxx",
        deparment: 'xxxxxx',
        salary: 1000
    };
    // await update(updatedEmp);
    await getAll();
}

run();