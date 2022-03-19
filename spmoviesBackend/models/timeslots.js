var db = require('./databaseConfig.js');

var timeslots = {
    insert: function (timeslot, callback){
        var dbConn = db.getConnection();
        const insertUserQuery = "insert into timeslots (movieid, timeslots) values (?, ?);";
            dbConn.query(insertUserQuery, [timeslot.movieid, timeslot.timeslots], (error, results) => {
                dbConn.end();
                if(error) {
                    return callback(error, null);
                };
                return callback(null, results.insertId)
            });
        }

        ,findByID: function (movieID, callback) {
            var dbConn = db.getConnection();
            const findTimeslotsByIDQuery = "select title, time, opening_date, timeslots from movies join timeslots on movies.movieid = timeslots.movieid where timeslots.movieid = ?;";
            dbConn.connect(function (err) {
               if (err) {
                  console.log(err);
                  return callback(err, null);
               } else {
                   dbConn.query(findTimeslotsByIDQuery, [movieID], (error, results) => {
                       dbConn.end();
                       if(error) {
                           return callback(error, null);

                       } 
                       else if (results.length === 0) {
                        callback(null, null);
                        return;
                    };

                    console.log(results)
                    return callback(null, results);
                });
            }
        });
    }

    ,delete: (movieID, callback) => {
        var conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            const deleteMovie = "DELETE FROM timeslots WHERE movieid = ?;";
            conn.query(deleteMovie, [movieID], (error, results) => {
                conn.end();
                if (error) {
                    return callback(error, null);
                };
                return callback(null, results.affectedRows);
            });
        });
    }
}


module.exports = timeslots;