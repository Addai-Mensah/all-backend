const mongoose = require("mongoose");
const Joi = require ("joi")
const express = require ("express");
const app = express();
const {json} = require("express");
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')
.then (() => console.log("successfully connected to mongodb"))
.catch(() => console.error("could not connect to mongodb"))




// const movie = [
//     {id: 1, genres:"action"},
//     {id: 2, genres: "anime"},
//     {id: 3, genres: "comedy"},
//     {id: 4, genres: "drama"},
//     {id: 5, genres: "sci-fi"},
// ]

const movieSchema = new mongoose.Schema({
    genres:{
        type:String,
        required: true,
        maxlength: 40,
        minlength:4
    }
});

 const Movie = mongoose.model("Movie", movieSchema);


app.get("/", async (req,res) =>{

    const movie = await  Movie.find()
    .sort({genres:1})
    
    res.send(movie)
})

app.get("/:id", async (req,res) =>{
    const movieGenres = await Movie.findById(req.params.id)

    if(!movieGenres) return res.status(404).send("Movie with this ID cannot be found")

    res.send(movieGenres)
})


app.post("/", async (req,res) =>{
    const {error} = validateMovie(req.body)
    if (error)
       return res.status(400).send(error.details[0].message)

       let createMovie = new Movie({
        genres:req.body.genres,
      
       })
      createMovie = await createMovie.save()
       res.send(createMovie);
})

app.put("/:id", async (req,res) =>{

    const {error} = validateMovie(req.body)
    if (error) res.status(404).send(error.details[0].message)

    const  movieGenre = await Movie.findByIdAndUpdate(req.params.id, {
    $set:{
        genres: req.body.genres
    }
  },{new:true})
    if(!movieGenre) res.status(404).send("Movie with this ID cannot be found")

    res.send(movieGenre)
})

app.delete("/:id", async (req,res) =>{
    const {error} = validateMovie(req.body)
    if (error) res.status(404).send(error.details[0].message)

    const movieGenre = await Movie.findByIdAndRemove(req.params.id)
    if(!movieGenre) res.status(404).send("Movie with this ID cannot be found")

    res.send(movieGenre)
   

    
})

const port = process.env.PORT||3000
app.listen(port, console.log (`listening to port ${3000}`))

 function validateMovie (films){
    const schema = {
        genres: Joi.string().min(3).required()
    }
    return Joi.validate(films,schema);
 }




