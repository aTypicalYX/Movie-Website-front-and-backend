
var db = require('./databaseConfig.js');

var genres = {
    insert: function (genre, callback){
        var dbConn = db.getConnection();
        const insertGenreQuery = "INSERT into genres (genre, description) values (?, ?);";
            dbConn.query(insertGenreQuery, [genre.genre, genre.description], (error, results) => {
                dbConn.end();
                if(error) {
                    return callback(error, null);
                };
                console.log(results)
                return callback(null, results.insertId)
            });
        }


        ,findAll: function (callback) {
            var dbConn = db.getConnection();
            dbConn.connect(function (err){
                const findAllGenresQuery = "SELECT * from spmovies.genres;";
                dbConn.query(findAllGenresQuery, (error, results) => {
                    if (error) {
                        return callback(error, null);
                    };
                    return callback(null, results);
                });
            });
        }
}


module.exports = genres;