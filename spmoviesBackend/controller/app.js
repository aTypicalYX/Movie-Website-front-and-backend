var express = require('express');


var app = express();

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);

var spUsers = require("../models/spUsers.js");

var genres = require("../models/genres.js")

var movies = require("../models/movies.js")

var reviews = require("../models/reviews.js")

var timeslots = require("../models/timeslots.js")

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");

const cors = require("cors");
app.use(cors());



app.post("/login/",  (req, res) => {
  console.log("User attempting Login")
  spUsers.verify(
    req.body.username,
    req.body.password,

    (error, user) => {
      if (error) {
        console.log("Login error")
        res.status(500).send();
        return;
      }
      if (user === null) {
        console.log(user)
        console.log("User doesnt exist")
        res.status(401).send();
        return;
      }

      console.log('user id', user.userid);
      console.log('user type ', user.type)

      const payload = { user_id: user.userid, user_type: user.type };

      jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
        if (error) {
          console.log(error);
          res.status(401).send();
          return;
        }
        console.log('token generated');
        console.log(token)
        res.status(200).send({
          token: token,
          user_id: user.userid,
          user_type: user.type
        });
      })
    });
});

app.post('/spUsers/', (req, res) => {
  spUsers.insert(req.body, (error, userID) => {
    if (error) {
      console.log(error);
      if (error.code == 'ER_DUP_ENTRY') {
        res.status(422).send();
        console.log("Code reached here")
      }
      else {
        res.status(500).send();
      }
      console.log("Error with inserting new user")
      return;
    };
    console.log("New User received")
    res.status(201).send(`{"userid":"${userID}"}`);
  });
});

app.get("/spUsers/", (req, res, next) => {
  spUsers.findAll((error, users) => {
    if (error) {
      console.log(error);
      res.status(500).send();
      console.log("Error with getting all users")
    };

    res.status(200).send(users);
  });
});


app.get("/spUsers/:userID/", (req, res, next) => {
  const userID = parseInt(req.params.userID);
  // if userID is not a number, send a 400.
  if (isNaN(userID)) {
    res.status(400).send();
    console.log("UserID is invalid")
    return;
  }

  spUsers.findByID(userID, (error, user) => {
    if (error) {
      res.status(500).send();
      console.log("Internal server error")
      return;
    };

    if (user === null) {
      res.status(404).send();
      console.log("user ID is invalid")
      return;
    };
    console.log(user)
    res.status(200).send(user);
    console.log("Successful user ID")
  });
});


app.put("/spUsers/:userID/", isLoggedInMiddleware, (req, res, next) => {
  const userID = parseInt(req.params.userID);
  if (isNaN(userID)) {
    console.log("Userid is invalid")
    res.status(400).send();
    return;
  }

  if (userID !== req.decodedToken.user_id) {
    console.log(userID)
    console.log(req.decodedToken.user_id)
    res.status(403).send();
    return;
  }

  spUsers.edit(userID, req.body, (error) => {
    if (error) {
      console.log(error);
      if (error.code == 'ER_DUP_ENTRY') {
        res.status(422).send();
        console.log("Code reached here")
      }
      else {
        res.status(500).send();
      }
      return;
    };
    res.status(204).send();
  });
});

// METHODS BELOW ARE USED FOR THE GENRE TABLE IN MYSQL


app.post('/genres/', (req, res) => {
  genres.insert(req.body, (error, genreID) => {
    if (error) {
      console.log(error);
      res.status(500).send();
      return;
    };
    console.log("New genre received")
    res.status(204).send(`{"genreid":"${genreID}"}`);
  });
});



app.get("/genres/", isLoggedInMiddleware, (req, res, next) => {
  genres.findAll((error, genresAvailable) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    };
    console.log("Get genres successful")
    res.status(200).send(genresAvailable);
  });
});




// METHODS BELOW ARE USED FOR THE MOVIES TABLE IN MYSQL



app.post("/movies/", (req, res, next) => {
  movies.insert(req.body, (error, movieID) => {
    if (error) {
      console.log(error);
      res.status(500).send();
      return;
    };
    console.log("New movie received")
    res.status(201).send(`{"movieid":"${movieID}"}`);
  });
});


// GET MOVIE BY MOVIE NAME OR KEY WORD

app.get("/moviesKey/:movieKeyword", (req, res, next) => {
  const movieKeyword = req.params.movieKeyword;
  console.log(movieKeyword)
  movies.findByKeyword(movieKeyword, (error, movie) => {
    if (error) {
      res.status(500).send();
      console.log("get Id has error")
      return;
    };

    if (movie === null) {
      res.status(404).send();
      console.log("movie keyword is invalid")
      return;
    };

    //console.log(movie)
    res.status(200).send(movie);
    console.log("Successful movie ID")
  });
});



app.get("/moviesAll/", (req, res, next) => {
  console.log("Reached the app.js")
  movies.findAll((error, moviesAvailable) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    };
    res.status(200).send(moviesAvailable);
  });
});


app.get("/moviesID/:movieID/", (req, res, next) => {
  const movieID = parseInt(req.params.movieID);
  // if userID is not a number, send a 400.
  if (isNaN(movieID)) {
    res.status(400).send();
    console.log("Error has occured with getting movieID")
    return;
  }
  console.log(movieID)
  movies.findByID(movieID, (error, movie) => {
    if (error) {
      res.status(500).send();
      console.log("get Id has error")
      return;
    };

    if (movie === null) {
      res.status(404).send();
      console.log("movie ID is invalid")
      return;
    };

    //console.log(movie)
    console.log("This is the app.js side")
    console.log(movie)
    res.status(200).send(movie);
    console.log("Successful movie ID")
  });
});


// FIND MOVIE BY MOVIE GENRE

app.get("/moviesByGenre/:genreID/", (req, res, next) => {
  const genreID = req.params.genreID;
  console.log(req.params.genreID)
  console.log(req.params)
  console.log(genreID)
  // if userID is not a number, send a 400.
  if (isNaN(genreID)) {
    res.status(400).send();
    console.log("Error has occured with getting genreID")
    return;
  }

  movies.findByGenreID(genreID, (error, movie) => {
    if (error) {
      res.status(500).send();
      console.log("get Id has error")
      return;
    };

    if (movie === null) {
      res.status(404).send();
      console.log("movie ID is invalid")
      return;
    };

    console.log("These are the movies from the genre")
    console.log(movie)
    res.status(200).send(movie);
    console.log("Successful movie ID")
  });
});


app.get("/movieRating/:movieID", (req, res, next) => {
  const movieID = parseInt(req.params.movieID);
  if (isNaN(movieID)) {
    res.status(400).send();
    console.log("Error has occured with getting movieID")
    return;
  }
  console.log(movieID)

  movies.findAverageRate(movieID, (error, movie) => {
    if (error) {
      res.status(500).send();
      console.log("get Id has error")
      return;
    };
    
    console.log(movie)
    //console.log(movie[0])
    res.status(200).send(movie);
    console.log("Successful movie ID")
  });
});


app.put("/movies/:movieID/", (req, res, next) => {
  const movieID = parseInt(req.params.movieID);
  if (isNaN(movieID)) {
    console.log("movieid is invalid")
    res.status(400).send();
    return;
  }

  // if (userID !== req.decodedToken.user_id) {
  //   console.log(userID)
  //   console.log(req.decodedToken.user_id)
  //   res.status(403).send();
  //   return;
  // }

  movies.edit(movieID, req.body, (error) => {
    if (error) {
      console.log(error);
      if (error.code == 'ER_DUP_ENTRY') {
        res.status(422).send();
        console.log("Code reached here")
      }
      else {
        res.status(500).send();
      }
      return;
    };
    res.status(204).send();
  });
});

app.delete("/movies/:movieID/", (req, res) => {
  const movieID = parseInt(req.params.movieID);
  if (isNaN(movieID)) {
    return res.status(400).send();
  }
  movies.delete(movieID, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send();
    }
    console.log("Successful movie deletion")
    return res.status(204).send();

  });
});




// METHODS BELOW ARE USED FOR THE REVIEWS TABLE IN MYSQL


app.post("/reviews/", (req, res, next) => {
  reviews.insert(req.body, (error, reviewID) => {
    if (error) {
      console.log(error);
      res.status(500).send();
      return;
    };
    console.log("New review received")
    res.status(201).send(`{"reviewid":"${reviewID}"}`);
  });
});



app.get("/reviews/:movieIDreview/", (req, res, next) => {
  const movieIDreview = parseInt(req.params.movieIDreview);
  // if userID is not a number, send a 400.
  if (isNaN(movieIDreview)) {
    res.status(400).send();
    console.log("Error has occured with getting movieID")
    return;
  }

  reviews.findByID(movieIDreview, (error, review) => {
    if (error) {
      res.status(500).send();
      console.log("get review has error")
      return;
    };

    if (review === null) {
      res.status(404).send();
      console.log("review ID is invalid")
      return;
    };

    //console.log(movie)
    res.status(200).send(review);
    console.log("Successful movie ID")
  });
});



// METHODS BELOW ARE USED FOR THE Timeslots TABLE IN MYSQL

app.post("/timeslots/", (req, res, next) => {
  timeslots.insert(req.body, (error, timeslotID) => {
    if (error) {
      console.log(error);
      res.status(500).send();
      return;
    };
    console.log("New timeslot received")
    res.status(201).send(`{"timeslotid":"${timeslotID}"}`);
  });
});


app.get("/timeslots/:movieIDtimeslots/", (req, res, next) => {
  const movieIDtimeslots = parseInt(req.params.movieIDtimeslots);
  // if userID is not a number, send a 400.
  if (isNaN(movieIDtimeslots)) {
    res.status(400).send();
    console.log("Error has occured with getting movieIDtimeslots")
    return;
  }

  timeslots.findByID(movieIDtimeslots, (error, timeslot) => {
    if (error) {
      res.status(500).send();
      console.log("get timeslots has error")
      return;
    };

    if (timeslot === null) {
      res.status(404).send();
      console.log("movie ID is invalid")
      return;
    };

    //console.log(movie)
    res.status(200).send(timeslot);
    console.log("Successful timeslot")
  });
});


app.delete("/timeslots/:movieID/", (req, res) => {
  console.log("received request")
  const movieID = parseInt(req.params.movieID);
  console.log(movieID)
  console.log("here")

  timeslots.delete(movieID, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send();
    }
    console.log("Successful timeslot deletion")
    return res.status(204).send();
  });
});



module.exports = app;