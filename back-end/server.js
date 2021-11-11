var express = require("express");
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "js",
    password: "#!t&OoJ2yk@s",
    database: "wifi"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

function AddApostrophe(input) {
  var output = '\'' + input + '\'';
  return output;
}

app.get("/password", (req, res, next) => {
    var SsidReq = AddApostrophe(req.query.ssid);
    var HostnameReq = AddApostrophe(req.query.hostname);
    con.query(`SELECT * from wifi WHERE SSID=${SsidReq} AND hostname=${HostnameReq}`, (err, rows) => {
      if(err) throw err;
      // console.log('The data from users table are: \n', rows);
      res.json(rows);
      // con.end();
  });
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
