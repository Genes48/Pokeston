const axios = require("axios");
const { Pokemon , Type } = require('../db.js')


const getApiPokes = async function(){
    var pokes=[];
    try{
    for(let i=1;i<=40;i++){
        const apiUrl = await axios.get (`https://pokeapi.co/api/v2/pokemon/${i}`)
        let a=apiUrl.data
        let typ2= null
        if(a.types.length>1){typ2=a.types[1].type.name}
        var apiInfo = {
            id: a.id,
            name: a.name,
            hp: a.stats[0]["base_stat"],
            attack: a.stats[1]["base_stat"],
            special_attack: a.stats[3]["base_stat"],
            defense: a.stats[2]["base_stat"],
            special_defense: a.stats[4]["base_stat"],
            speed: a.stats[5]["base_stat"],
            height: a.height,
            weight: a.weight,
            img: a.sprites.other.home.front_default,
            types: [{name: a.types[0].type.name },{ name: typ2 }]
        }
        pokes.push(apiInfo)
    }
    return pokes}
    catch(e){
        res.json(e)
    }
}

const getDbPokes = async function(){
    try{
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        }
    })}
    catch(e){
        res.json(e)
    }
}

const getAllPokes = async function(){
    try{
    const apiPokes = await getApiPokes();
    const dbPokes = await getDbPokes();
    const allPokes = apiPokes.concat(dbPokes);
    return allPokes;}
    catch(e){
        res.json(e)
    }
}
    
const getPokebyId = async function(id){
    try{
        try{let typ2=null
    const apiUr = await axios.get (`https://pokeapi.co/api/v2/pokemon/${id}`)
        let a=apiUr.data
        if(a.types.length>1){typ2=a.types[1].type.name}
        var poke = {
            id: a.id,
            name: a.name,
            hp: a.stats[0]["base_stat"],
            attack: a.stats[1]["base_stat"],
            special_attack: a.stats[3]["base_stat"],
            defense: a.stats[2]["base_stat"],
            special_defense: a.stats[4]["base_stat"],
            speed: a.stats[5]["base_stat"],
            height: a.height,
            weight: a.weight,
            img: a.sprites.other.home.front_default,
            types: [{name: a.types[0].type.name },{ name: typ2 }]
        }
        return (poke)}
        catch(e){
            var poke= await Pokemon.findByPk(id, {
                include:{
                    model:Type,
                    attributes: ["name"],
                    through: {
                        attributes:[]
                    }
                }
            })
            return (poke)
        }}
        catch(e){
            res.json(e)
        }
    
}

const deletePokemon = async function(id){
    try{
        var poke = await Pokemon.findByPk(id, {
            include:{
                model:Type,
                attributes: ["name"],
                through: {
                    attributes:[]
                }
            }
        })
        await poke.destroy()
        res.send("El pokemon ha sido eliminado")
    }
    catch(e){
        res.json(e.message)
    }
}

const getPokebyName = async function(name){
    try{
        try{
    let arra=[]
    let nam = name.toLowerCase()
    const apiUr = await axios.get (`https://pokeapi.co/api/v2/pokemon/${nam}`)
        let a=apiUr.data
        let typ2= null
        if(a.types.length>1){typ2=a.types[1].type.name}
        var poke = {
            id: a.id,
            name: a.name,
            hp: a.stats[0]["base_stat"],
            attack: a.stats[1]["base_stat"],
            special_attack: a.stats[3]["base_stat"],
            defense: a.stats[2]["base_stat"],
            special_defense: a.stats[4]["base_stat"],
            speed: a.stats[5]["base_stat"],
            height: a.height,
            weight: a.weight,
            img: a.sprites.other.home.front_default,
            types: [{name: a.types[0].type.name },{ name: typ2 }]
        }
        arra.push(poke)
    return arra}
    catch(e){
        let nam = name.toLowerCase()
        var poke= await Pokemon.findAll( {
            where:{name:nam},
            include:{
                model:Type,
                attributes: ["name"],
                through: {
                    attributes:[]
                }
            }
        })
        console.log(poke)
    return poke
    }
    }
    catch(e){
        res.json(e)
    }
}

const createPoke = async function(name, attack, special_attack, defense, special_defense, hp, speed, height, weight, types){
    try{    
    var poke = await Pokemon.create({
            name: name.toLowerCase(),
            hp: hp,
            attack: attack,
            special_attack: special_attack,
            defense: defense,
            special_defense: special_defense,
            speed: speed,
            height: height*10,
            weight: weight*10,
        })
        var index=[]
        for(tipo of types){
            let ind=await Type.findAll({
                where:{name:tipo}
            })
            index.push(ind)
        }
        for(ind of index){
            poke.addType(ind[0].id)
        }
    return poke}
    catch(e){
        console.log(e)
    }
}


const getTypes = async function(){
    var types=[];
    let urls=[] 
    try{
    const apiInfo = await axios.get (`https://pokeapi.co/api/v2/type`)
    apiInfo.data.results.forEach(c=>{
        urls.push(c.url)
    })
    for(let i=0; i<urls.length; i++){
        let typ = await axios.get (urls[i])
        let ty={
            name:typ.data.name,
            id:typ.data.id
        }
        types.push(ty)
    }
    types.forEach(d=>{
        Type.findOrCreate({
            where:{
                name: d.name,
                id: d.id
            }
        })
    })
    const allTypes = await Type.findAll();
    return allTypes}
    catch(e){
        res.json(e)
    }
}
module.exports = {getAllPokes, getPokebyId, getPokebyName, getTypes, createPoke, deletePokemon}