var db = require('./databaseConfig.js');

var reviews = {
    insert: function (reviews, callback){
        var dbConn = db.getConnection();
        const insertReviewQuery = "insert into reviews (movieid, userid, rating, review) values (?, ?, ?, ?);"
            dbConn.query(insertReviewQuery, [reviews.movieid, reviews.userid, reviews.rating, reviews.review], (error, results) => {
                dbConn.end();
                if(error) {
                    return callback(error, null);
                };
                return callback(null, results.insertId)
            });
        }

        ,findByID: function (movieID, callback) {
            var dbConn = db.getConnection();
            const findReviewByIDQuery = "select reviews.movieid, reviews.userid, username, rating, review, reviews.created_at from reviews left join users on reviews.userid = users.userid where movieid = ?;";
            dbConn.connect(function (err) {
               if (err) {
                  console.log(err);
                  return callback(err, null);
               } else {
                   dbConn.query(findReviewByIDQuery, [movieID], (error, results) => {
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
}





module.exports = reviews;



