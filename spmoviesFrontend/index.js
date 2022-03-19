const express = require("express");
const app = express();
app.use(express.static('public'));



// NOT LINKED TO BACK END


app.get("/", (req, res) => {
  res.sendFile("/public/home.html", { root: __dirname });
});


app.get("/login/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/home/", (req, res) => {
  res.sendFile("/public/home.html", { root: __dirname });
});

app.get("/admin/", (req, res) => {
  res.sendFile("/public/admin.html", { root: __dirname });
});

app.get("/movies/:movieID" , (req, res) => {
  res.sendFile("/public/movieDetails.html", { root: __dirname });
});


app.get("/moviesAll/", (req, res) => {
  res.sendFile("/public/home.html", { root: __dirname });
});

app.get("/genres/", (req, res) => {
  res.sendFile("/public/genres.html", { root: __dirname });
});

app.get("/moviesGenre/:genreID", (req, res) => {
  res.sendFile("/public/searchedMovies.html", { root: __dirname });
});

app.get("/moviesKeyword/:movieKeyword" , (req, res) => {
  res.sendFile("/public/searchedByKeyword.html", { root: __dirname });
});






// app.get("/users/:id", (req, res) => {
//   res.sendFile("/public/user.html", { root: __dirname });
// });

// app.get("/users/", (req, res) => {
//   res.sendFile("/public/users.html", { root: __dirname });
// });


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});