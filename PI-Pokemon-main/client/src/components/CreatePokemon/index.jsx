import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getTypes, postPoke } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import './CreatePokemon.css';

export default function CreatePokemon() {
    const dispatch = useDispatch()
    const types = useSelector((state)=>state.types)
    const[disabled, setDisabled]=useState(true)
    
    const [input, setInput] = useState({
        name:"",
        hp:"",
        attack:"",
        special_attack:"",
        defense:"",
        special_defense:"",
        speed:"",
        height:"",
        weight:"",
        types:[]
    })
    
    const[error, setError]=useState({
        name:"",
        hp:"",
        attack:"",
        special_attack:"",
        defense:"",
        special_defense:"",
        speed:"",
        height:"",
        weight:"",
    })

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        e.preventDefault();
        if(!input.types.includes(e.target.value)){
        setInput({
            ...input,
            types:[...input.types, e.target.value]
        })}
    }
 
    function handleDelete(e){
        e.preventDefault();
        let arra=[]
        for(let tipo of input.types){
            if(tipo!==e.target.value){arra.push(tipo)}
        }
        setInput({
            ...input,
            types: arra
        })
    } 

    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch])


    function validateName(e){
        if(!e.target.value){
            setError({...error, name:"Debe ingresar un nombre para el pokemon"})
        }
        else{
            setError({...error, name:""})
        }
    }

    function validateHp(e){
        if(!e.target.value){
            setError({...error, hp:"Debe ingresar un valor"})
        }
        else if(e.target.value<=0){
            setError({...error, hp:"Los puntos de salud deben ser mayor que cero"})
        }
        else{
            setError({...error, hp:""})
        }
    }

    function validateSpeed(e){
        if(!e.target.value){
            setError({...error, speed:"Debe ingresar un valor"})
        }
        else if(e.target.value<=0||e.target.value>250){
            setError({...error, speed:"La velocidad debe ser mayor que cero y menor a 250"})
        }
        else{
            setError({...error, speed:""})
        }
    }

    function validateHeight(e){
        if(!e.target.value){
            setError({...error, height:"Debe ingresar un valor"})
        }
        else if(e.target.value<=0||e.target.value>50){
            setError({...error, height:"La altura debe ser mayor que cero y menor a 50"})
        }
        else{
            setError({...error, height:""})
        }
    }

    function validateWeight(e){
        if(!e.target.value){
            setError({...error, weight:"Debe ingresar un valor"})
        }
        else if(e.target.value<=0||e.target.value>1000){
            setError({...error, weight:"El peso debe ser mayor que cero y menor a 1000"})
        }
        else{
            setError({...error, weight:""})
        }
    }

    var disables = false
    if(input.types.length===2){
        disables= true
    }
      
   

    useEffect(()=>{
        if(input.name!==""&& input.hp!==""&& input.speed!==""&& input.height!==""&& input.weight!==""&&
        input.attack!==""&& input.defense!==""&& input.special_attack!==""&& input.special_defense!==""&& input.types.length>0&&           
        error.name===""&&
        error.hp===""&&
        error.speed===""&&
        error.height===""&&
        error.weight===""){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }, [input, error])

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postPoke(input))
        alert("Pokemon creado!")
        setInput({
            name:"",
            hp:"",
            attack:"",
            special_attack:"",
            defense:"",
            special_defense:"",
            speed:"",
            height:"",
            weight:"",
            types:[]
        })
    }

  return (
    <div className='Lab'>
        <Link to="/home"><button>Volver a home</button></Link>
        <h1 className='Title'>Creá tu pokemon :D</h1>
        <form className='Form'>
            <div>
                <label className='Label'>Nombre:</label>
                <input type="text" value={input.name} className='Input' name= "name" onChange={(e)=>{handleChange(e);validateName(e)}}/>
            {error.name===""?<span></span>:<span className='Error'>{error.name}</span>}
            </div>
            <div>
                <label className='Label'>Puntos de salud:</label>
                <input type="number" value={input.hp} className='Input' name= "hp" onChange={(e)=>{handleChange(e); validateHp(e)}}/>
            {error.hp===""?<span></span>:<span className='Error'>{error.hp}</span>}
            </div>
            <div>
                <label className='Label'>Ataque:</label>
                <input type="number" value={input.attack} className='Input' name= "attack" onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label className='Label'>Ataque especial:</label>
                <input type="number" value={input.special_attack} className='Input' name= "special_attack" onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label className='Label'>Defensa:</label>
                <input type="number" value={input.defense} className='Input' name= "defense" onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label className='Label'>Defensa especial:</label>
                <input type="number" value={input.special_defense} className='Input' name= "special_defense" onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label className='Label'>Velocidad:</label>
                <input type="number" value={input.speed} className='Input' name= "speed" onChange={(e)=>{handleChange(e); validateSpeed(e)}}/>
                {error.speed===""?<span></span>:<span className='Error'>{error.speed}</span>}
            </div>
            <div>
                <label className='Label'>Altura:</label>
                <input type="number" value={input.height} className='Input' name= "height" onChange={(e)=>{handleChange(e); validateHeight(e)}}/>
                <span className='Label'>m.</span>
                {error.height===""?<span></span>:<span className='Error'>{error.height}</span>}
            </div>
            <div>
                <label className='Label'>Peso:</label>
                <input type="number" value={input.weight} className='Input' name= "weight" onChange={(e)=>{handleChange(e); validateWeight(e)}}/>
                <span className='Label'>Kg.</span>
                {error.weight===""?<span></span>:<span className='Error'>{error.weight}</span>}
            </div>
            <div>
            <label className='SelectLabel'>Tipo:</label>
            <select className='Select' disabled={disables} onChange={(e)=>{handleSelect(e)}}>
                {types.map((el)=>(
                    <option value={el.name}>{el.name}</option>
                ))}
            </select>
            {input.types.map(typ=>
              <div>
              <span value={typ} key={typ.id}>{typ}</span>
              <button value={typ} onClick={(e)=>handleDelete(e)} key={typ.id}>x</button>
              </div>
                )}
            </div>
            <div>
            <button className='Boton' disabled={disabled} type="submit" onClick={(e)=>handleSubmit(e)}>Crear Pokemon</button>
            </div>
        </form>
    </div>
  )
}
