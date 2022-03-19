var db = require('./databaseConfig.js');

var movies = {
    insert: function (movie, callback) {
        var dbConn = db.getConnection();
        const insertUserQuery = "INSERT into movies (title, description, cast, genreid, time, opening_date) values (?, ?, ?, ?, ?, ?);"
        dbConn.query(insertUserQuery, [movie.title, movie.description, movie.cast, movie.genreid, movie.time, movie.opening_date], (error, results) => {
            dbConn.end();
            if (error) {
                return callback(error, null);
            };
            return callback(null, results.insertId)
        });
    }

    , findAll: function (callback) {
        console.log("reached users")
        var dbConn = db.getConnection();
        const findAllMoviesQuery = "SELECT title, description, cast, time, opening_date, movieid, picture from movies;";
        dbConn.connect(function (err) {
            dbConn.query(findAllMoviesQuery, (error, results) => {
                if (error) {
                    return callback(error, null);
                };
                return callback(null, results);
            });
        });
    }

    , findByKeyword: function (movieKeyword, callback) {
        console.log("Reached find by keyword")
        var dbConn = db.getConnection();
        const findMoviesKeywordQuery = "SELECT * FROM movies WHERE locate (?,title);"
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                dbConn.query(findMoviesKeywordQuery, [movieKeyword], (error, results) => {
                    dbConn.end();
                    if (error) {
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

    ,findByID: function (movieID, callback) {
        var dbConn = db.getConnection();
        const findMovieByIDQuery = "select movies.movieid, movies.title, movies.description, movies.cast, movies.time, movies.opening_date, movies.picture, genres.genre from movies join genres on movies.genreid = genres.genreid  where movies.movieid = ?;";
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                dbConn.query(findMovieByIDQuery, [movieID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);

                    }
                    else if (results.length === 0) {
                        callback(null, null);
                        return;
                    };

                    console.log(" This is the movie.js side ")
                    console.log(results)
                    return callback(null, results);
                });
            }
        });
    }
    ,findByGenreID: function (genreID, callback) {
        var dbConn = db.getConnection();
        const findMovieByGenreIDQuery = "select * from genres join movies on genres.genreid = movies.genreid where genres.genreid = ?";
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                dbConn.query(findMovieByGenreIDQuery, [genreID], (error, results) => {
                    dbConn.end();
                    if (error) {
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

    , delete: (movieID, callback) => {
        var conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            const deleteMovie = "DELETE FROM movies WHERE movieid = ?;";
            conn.query(deleteMovie, [movieID], (error, results) => {
                conn.end();
                if (error) {
                    return callback(error, null);
                };
                return callback(null, results.affectedRows);
            });
        });
    }
    
    ,findAverageRate: function (movieID, callback) {
        var dbConn = db.getConnection();
        const findMovieAverageQuery = "select AVG(rating) as avg_rating from reviews where movieid = ?;";
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                dbConn.query(findMovieAverageQuery, [movieID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);

                    }
                    else if (results.length === 0) {
                        callback(null, null);
                        return;
                    };
                    console.log("in the movies.js")
                    console.log(results)
                    console.log(results[0])
                    return callback(null, results[0]);
                });
            }
        });
    }
    ,edit: function (movieID, movie, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                const editUserQuery = "UPDATE spmovies.movies SET title = ?, description = ?, cast = ?, genreid = ?, time = ?, opening_date = ? WHERE movieid = ?;"
                dbConn.query(editUserQuery, [movie.title, movie.description, movie.cast, movie.genreid, movie.time, movie.opening_date, movieID], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error);
                    }
                    else if (results.length === 0){
                        callback(null, null);
                        return;
                    }
                    else {
                        console.log(results);
                        return callback(null, results); 
                      }
  
                  });
              }
          });
      }
}


module.exports = movies