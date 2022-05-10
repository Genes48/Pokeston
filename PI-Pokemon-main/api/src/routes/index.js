const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllPokes, getPokebyId, getPokebyName, getTypes, createPoke} = require("./functions")
const { Pokemon , Type } = require('../db.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async function(req,res){
    let {name}=req.query
    try{
        if (name){
            var pok = await getPokebyName(name)
            pok!==[]?
            res.json(pok):
            res.status(404).send("El pokemon que busca no existe")
        }
        else{
    var pok = await getAllPokes()
    res.json(pok)}}
    catch(e){
        res.status(404).json(e)
    }
})

router.get("/pokemons/:id", async function(req,res){
    let {id}=req.params
    try{
    var pok = await getPokebyId(id)
    res.json(pok)}
    catch(e){
        res.send(e.message)
    }
})


router.post("/pokemons", async function(req,res){
    let {name, attack, special_attack, defense, special_defense, hp, speed, height, weight, types}=req.body
    try{
        var poke = await createPoke(name, attack, special_attack, defense, special_defense, hp, speed, height, weight, types)
    res.send("El pokemon ha sido creado!")}
    catch(e){
        console.log(e.message)
        res.send(e.message)
    }
})


router.get("/types", async function(req,res){
    try{
        const type = await getTypes()
        res.json(type)
        }
    catch(e){
        console.log(e.message)
        res.send(e.message)
    }
})


module.exports = router;
