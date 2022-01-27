# Database class

This database class is a general purpose class for using Mariadb/Mysql or other relational databases queries. The constructor takes all the necessary information to open a database connection as a paramenter object. The layer is used between the database engine and out application.

The constructor take one parameter. Example: 

```js
{
    host: 'localhost',
    port: 3306, //mariadb default port
    user: 'zeke',
    password: 'secret',
    database: 'employeedb',
    allowPublicKeyRetrieval: true // mysql users add this
}
```


## usage
```js
const db = new Database(options);
```

## **doQuery(sql, parameters)**
Method has two parameters:
`sql`: is a sql statement as a string
`parameters`: an array of query parameters to be used in place of the question marks `?`in the sql statement. Parameters may also be omitted in if the sql statement has no placeholder `?`in it.

### Usage
#### No paramenters needed
```js
const result = await db.doQuery('select * from employee');
```

#### Query criterion is employeeId=1
```js
const result = await db.query('select * from employee where employeeId=?', [1]);
```

Return value of select, example:
```js
{
    queryResult: [
        {
            employeeId: 1,
            firstname: 'Matt',
            lastname: 'River',
            department: 'ict',
            salary: 7000,
        }
    ],
    resultSet: true
}
```

#### insert, update, delete etc.
##### INSERT
```js
const result = await db.query('insert into employee values(?,?,?,?,?)', [6, 'Petra', 'Bond', 'admin', 9000]');
```
Return a Promise. Return value is an object:

```js
{
    queryResult:{rowsChanged: 1, insertId: 0, status:0},
}
```