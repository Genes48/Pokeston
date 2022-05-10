import { GET_POKEMONS, FILTER_CREATED, ORDEN_NAME, ATTACK, GET_NAME_POKE, GET_TYPES, CREATE_POKE,FILTER_TYPE, GET_DETAIL, CLEAR } from "../actions/actionTypes";

const initialState={
    pokemons: [],
    pokemons2:[],
    types: [],
    detail: []
}


function rootReducer(state=initialState, {type, payload}){
    switch(type){
        case GET_POKEMONS: return {
            ...state,
            pokemons: payload,
            pokemons2: payload
        }
        case GET_NAME_POKE: return{
            ...state,
            pokemons:payload
        }
        case GET_TYPES: return{
            ...state,
            types:payload
        }
        case FILTER_CREATED: 
        const allPokes = state.pokemons2
        let pokesCreated=[]
        if(payload==="db"){
            pokesCreated=allPokes.filter(e=>e.createdInDb)
        }
        if(payload==="api"){
            pokesCreated=allPokes.filter(e=>!e.createdInDb)
        }
        if(payload==="all"){
            pokesCreated=allPokes
        }
        return{
            ...state,
            pokemons: pokesCreated
        }
        case ORDEN_NAME:
            let sortPokes= payload==="asc"?
            state.pokemons.sort(function(a, b){
                if(a.name>b.name){
                    return 1;
                }
                if(a.name<b.name){
                    return -1;
                }
                return 0;
            }):
            state.pokemons.sort(function(a, b){
                if(a.name<b.name){
                    return 1;
                }
                if(a.name>b.name){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: sortPokes
            }
        case FILTER_TYPE:
            const allPokes2=state.pokemons2
            let pokesType=[]
            if(payload==="all"){
                pokesType=allPokes2
            }
            else{pokesType=allPokes2.filter(e=>e.types[1]?e.types[1].name===payload||e.types[0].name===payload:
                    e.types[0].name===payload   )}
            return{
                ...state,
                pokemons: pokesType
            }

        case ATTACK:
            let attPokes= payload==="asc"?
            state.pokemons.sort(function(a, b){
                if(a.attack>b.attack){
                    return 1;
                }
                if(a.attack<b.attack){
                    return -1;
                }
                return 0;
            }):
            state.pokemons.sort(function(a, b){
                if(a.attack<b.attack){
                    return 1;
                }
                if(a.attack>b.attack){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: attPokes
            }
        case CREATE_POKE: return{
            ...state,
        }
        case GET_DETAIL: return{
            ...state,
            detail: payload
        }
        case CLEAR: return {
            ...state,
            detail:[]
        }
        default: return state
    }
    

}

export default rootReducer;