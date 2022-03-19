var mysql = require("mysql")

var dbConnect = { getConnection: function () {

    var conn = mysql.createConnection({ 
        host: 'localhost', 
        port: 3306, 
        user: 'root',
        password: 'Yanxudoo5227',  
        database: 'spmovies', 
        dateStrings: true
    });
    return conn; 
  } 
};
    // put this at the end of the file module.exports = dbconnect;

module.exports = dbConnect;