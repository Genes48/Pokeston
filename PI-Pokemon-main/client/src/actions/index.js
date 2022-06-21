import axios from "axios";
import { GET_POKEMONS, FILTER_CREATED, ORDEN_NAME, ATTACK, GET_NAME_POKE, GET_TYPES, FILTER_TYPE, GET_DETAIL, CLEAR, DELETE } from "./actionTypes";

export function getPokemons(){
    return async function(dispatch){
        try{
        var response = await axios.get("http://localhost:3001/pokemons");
        return dispatch({type:GET_POKEMONS, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
}

export function filterCreated(payload){
    return {type: FILTER_CREATED, payload}
}

export function filterType(payload){
    return {type: FILTER_TYPE, payload}
}

export function ordenName(payload){
    return {type: ORDEN_NAME, payload}
}

export function ordenAttack(payload){
    return {type: ATTACK, payload}
}

export function getNamePoke(name){
    return async function(dispatch){
        try{
            var response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            console.log(response.data)
            if(response.data.length!==0){ return dispatch ({type: GET_NAME_POKE, payload: response.data}) }
            else { alert("No existe el pokemon que estas buscando")}
        }catch(e){
             alert("No existe el pokemon que estas buscando")
        }
    }
}

export function deletePokemon(id){
    return async function(dispatch){
        try{
            var response = await axios.delete(`http://localhost:3001/pokemons/${id}`);
            return dispatch({type: DELETE})
        }
        catch(e){
            console.log(e)
        }
    }
}

export function getTypes (){
    return async function(dispatch){
        try{
        var response = await axios.get("http://localhost:3001/types");
        return dispatch({type:GET_TYPES, payload: response.data})
        }
        catch(e){
            console.log(e)
        }
    }
}

export function postPoke(payload){
    return async function(){
        try{
        var response = await axios.post("http://localhost:3001/pokemons", payload)
        return response;
    }
    catch(e){
        console.log(e)
    }
}
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({type:GET_DETAIL, payload:response.data})
        }
    
    catch(e){
        console.log(e)
    }
    }
}

export function clear(){
    return {type: CLEAR}
}