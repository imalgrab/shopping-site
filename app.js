const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');

const mssql = require('mssql');

// mssql.on('error', err => {
//     console.log(err);
// });

// (async() => {
//     var conn = new mssql.ConnectionPool(
//         'server=localhost,1433;database=ClientsItemsCatalog;user id=weppoProjekt;password=weppo');
//     try {
//         await conn.connect();
//         var request = new mssql.Request(conn);
//         var result = await request.query('select * from Items');
//         result.recordset.forEach(r => {
//             console.log(`${r.Name} ${r.Price}`);
//         })
//         await conn.close();
//     } catch (err) {
//         if (conn.connected)
//             conn.close();
//         console.log(err);
//     }
// })();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

module.exports = app;