const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// const sql = require("msnodesqlv8");

// const connectionString = "server=;Database=Biztekmain;User ID=erpuser;Password=;Driver={SQL Server Native Client 11.0}";
// const query = "SELECT userid FROM users";

// sql.query(connectionString, query, (err, rows) => {
//     console.log('reach')
//     console.log(rows);
//     console.log(err)
// });

const sql = require('mssql')

const config = {
    user: '',
    password: '',
    server: '', 
    port : 1433,
    database: 'biztekmain',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
var conn = new sql.ConnectionPool(config);

 conn.connect()
 // Successfull connection
 .then(function () {

   // Create request instance, passing in connection instance
   var req = new sql.Request(conn);

   // Call mssql's query method passing in params
   req.query("select 1 as number")
   .then(function (recordset) {
     console.dir(recordset);
     conn.close();
   })
   // Handle sql statement execution errors
   .catch(function (err) {
     console.log(err);
     conn.close();
   })
 })
 // Handle connection errors
 .catch(function (err) {
   console.log(err);
   conn.close();
 });



app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});

