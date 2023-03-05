const mongoose = require("mongoose");
const Joi = require ("joi")
const express = require ("express");
const app = express();
const {json} = require("express");
app.use(express.json());

mongoose.connect()




const movie = [
    {id: 1, genres:"action"},
    {id: 2, genres: "anime"},
    {id: 3, genres: "comedy"},
    {id: 4, genres: "drama"},
    {id: 5, genres: "sci-fi"},
]


app.get("/api/movies",(req,res) =>{
    res.send(movie)
})


app.get("/api/movies/:id", (req,res) =>{
    movieGenre = movie.find( m => m.id === parseInt(req.params.id))
    if(!movieGenre) res.status(404).send("Course with this ID cannot be found")
    res.send(movieGenre)
})


app.post("/api/movies/",(req,res) =>{
    const {error} = validateMovie(req.body)
    if (error)
       return res.status(400).send(error.details[0].message)
    
       const createMovie = {
        id: movie.length +1,
        genres: req.body.genres
       }
       movie.push(createMovie)
       res.send(createMovie)
})

app.put("/api/movies/:id", (req,res) =>{
    movieGenre = movie.find( m => m.id === parseInt(req.params.id))
    if(!movieGenre) res.status(404).send("Movie with this ID cannot be found")

    const {error} = validateMovie(req.body)
    if (error) res.status(404).send(error.details[0].message)

    movieGenre.genres = req.body.genres
    res.send(movieGenre)
})

app.delete("/api/movies/:id",(req,res) =>{
    movieGenre = movie.find( m => m.id === parseInt(req.params.id))
    if(!movieGenre) res.status(404).send("Movie with this ID cannot be found")

    const {error} = validateMovie(req.body)
    if (error) res.status(404).send(error.details[0].message)

    const index = movie.indexOf(movieGenre);
    movie.splice(index,1);
    res.send(movieGenre);
})

const port = process.env.PORT||3000
app.listen(port, console.log (`listening to port ${3000}`))

 function validateMovie (films){
    const schema = {
        genres: Joi.string().min(3).required()
    }
    return Joi.validate(films,schema);
 }




