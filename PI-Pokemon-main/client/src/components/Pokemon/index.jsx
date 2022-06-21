import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail, clear, deletePokemon } from '../../actions';
import './Pokemon.css';


export default function Pokemon() {

  const dispatch=useDispatch()
  const{id}=useParams()

  useEffect(()=>{
    dispatch(getDetail(id))
    return ()=>{
      dispatch(clear())
    }
  },[dispatch, id])

  function handleClick(id){
    dispatch(deletePokemon(id))
  }

  var pokeDet = useSelector(state=>state.detail)

  return (
    <div className='Detail'>
      <Link to="/home"><button className='Buton'>Volver a página principal</button></Link>
      {pokeDet.createdInDb&&<button onClick={()=>handleClick(pokeDet.id)} className='Buton'>Eliminar pokemon</button>}
      <div className='Izq'>
      <h1>{pokeDet.name}</h1>
      <img src={pokeDet.img} alt="" height="300px" width="300px"/>
      </div>
      <div className='Der'>
        <h2 className='Stats'>Stats</h2>
      <h3>Puntos de salud: {pokeDet.hp}</h3>
      <h3>Ataque: {pokeDet.attack}</h3>
      <h3>Ataque especial: {pokeDet.special_attack}</h3>
      <h3>Defensa: {pokeDet.defense}</h3>
      <h3>Defensa especial: {pokeDet.special_defense}</h3>
      <h3>Velocidad: {pokeDet.speed}</h3>
      <h3>Tipo: </h3>{pokeDet.types?pokeDet.types.map(el=>{
        return <h3>{el.name}</h3>
      }):null}
      <h4>Altura: {(pokeDet.height)/10} m.</h4>
      <h4>Peso: {(pokeDet.weight)/10} kg.</h4>
      <h4>ID: {pokeDet.id}</h4>
      </div>
    </div>
  )
}
