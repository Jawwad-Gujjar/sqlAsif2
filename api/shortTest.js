const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const sql = require('mssql')

const config = {
    user: '',
    password: '',
    //server: '', 
    server:'',
    port : 1433,
    database: '',
    options: {
        encrypt: false// Use this if you're on Windows Azure
    }


}
var conn = new sql.ConnectionPool(config);

 conn.connect()
 // Successfull connection
 .then(function () {

   // Create request instance, passing in connection instance
   var req = new sql.Request(conn);

   // Call mssql's query method passing in params
   req.query("select * from users")
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
