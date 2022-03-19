var db = require('./databaseConfig.js');

var spUsers = {

    verify: function (username, password, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
          if (err) {//database connection gt issue!
            console.log(err);
            return callback(err, null);
          } else {
            const query = "SELECT * FROM users WHERE username=? and password=?";

            dbConn.query(query, [username, password], (error, results) => {
              if (error) {
                callback(error, null);
                return;
              }
              if (results.length === 0) {
                return callback(null, null);
    
              } else {
                const user = results[0];
                console.log("this is spusers.js")
                console.log(user)
                return callback(null, user);
              }
            });
          }
        });
      },
    
    insert: function (user, callback){
    var dbConn = db.getConnection();
    const insertUserQuery = "INSERT into users (username, email, contact, type, profile_pic_url) values (?, ?, ?, ?, ?);"
        dbConn.query(insertUserQuery, [user.username, user.email, user.contact, user.type, user.profile_pic_url], (error, results) => {
            dbConn.end();
            if(error) {
                return callback(error, null);
            };
            return callback(null, results.insertId)
        });
    }
    ,findAll: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err){
            const findAllUsersQuery = "SELECT * from spmovies.users;";
            dbConn.query(findAllUsersQuery, (error, results) => {
                if (error) {
                    return callback(error, null);
                };
                return callback(null, results);
            });
        });
    }
   
    ,findByID: function (userID, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
           if (err) {
              console.log(err);
              return callback(err, null);
           } else {
               const findUserByIDQuery = "SELECT * from spmovies.users where userid = ?;";
               dbConn.query(findUserByIDQuery, [userID], (error, results) => {
                   dbConn.end();
                   if(error) {
                       return callback(error, null);

                   } else if (results.length === 0) {
                    callback(null, null);
                    return;
                };
                // console.log(results);
                return callback(null, results[0]);
            });
        }
    });
}

  ,edit: function (userID, user, callback) {
      var dbConn = db.getConnection();
      dbConn.connect(function (err) {
          if (err) {
              return callback(err, null);
          }
          else {
              const editUserQuery = "UPDATE spmovies.users SET username = ?, email = ?, contact = ?, type = ?, profile_pic_url = ? WHERE userid = ?;";
              dbConn.query(editUserQuery, [user.username, user.email, user.contact, user.type, user.profile_pic_url, userID], (error, results) => {
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

    ,delete: (movieID, callback) => {
        var dbConn = db.getConnection();
        dbConn.connect((err) => {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const deleteMovieQuery = "DELETE FROM movies WHERE movieid = ?;";
                dbConn.query(deleteMovieQuery, movieID, (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error);
                    };
                    return callback(null);
                });
            }
        });
    },
}
        

module.exports = spUsers;