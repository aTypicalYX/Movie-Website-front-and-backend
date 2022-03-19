
const app=require('./controller/app.js');
const PORT=8081;


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

