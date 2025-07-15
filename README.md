# Movie-Website-front-and-backend

This is the repository for the movie website front and back end that our group created during my back end web development module.

The website uses JSON web tokens and Axios for the server backend, for the database, it uses MySQL. As such, you will have to make some changes to the file
for it to use whatever database you want to use.

A full documentation of how thw website works and its code can be found in the word document, but I have also included a short summary of it in the README on github.

The home page consists of an API that supports the get all movies function. This will be loaded every time the user visits the  home page. This displays all the movies in the database.

When a user clicks on the read more button on a movie listing on the home page, they will be taken to another page where they can view that specific movie’s details. We have also created an API to get all the reviews for that specific movie on the same page.

The user also has the ability to leave a review for a selected movie. The data will then be passed to the back-end, where it is stored in the mysql database.

The user can search for movie using a search bar at the top. When the user inputs a word and presses enter, the data will be passed to a script in home.html, which will load the searchedByKeyword.html page.

Finally, there is alaos an admin page, where admins can create new mvies, new genres, edit a movie listing, or delete a movie.


