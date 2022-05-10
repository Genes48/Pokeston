import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterCreated, ordenName, ordenAttack, getTypes, filterType } from '../../actions';
import Card from '../Card';
import Paginado from '../Paginado';
import SearchBar from '../SearchBar';
import './Home.css';


export default function Home() {
  
  const dispatch = useDispatch();
  var allPokemons = useSelector((state)=>state.pokemons);
  const allTypes = useSelector((state)=>state.types)

  const [currentPage, setCurrentPage] = useState(1)
  const pokemonsPerPage=12
  const lastPoke = currentPage*pokemonsPerPage
  const firstPoke = lastPoke-pokemonsPerPage
  let currentPokes = []
  if(allPokemons.length){
    currentPokes=allPokemons.slice(firstPoke,lastPoke)}
  const paginado = (numpag)=>{
    setCurrentPage(numpag)
  }
  const [orden, setOrden]= useState("")

  useEffect(()=>{
    dispatch (getPokemons());
    dispatch (getTypes());
  }, [dispatch])


  function handleFilterTypes(e){
    e.preventDefault();
    dispatch(filterType(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterCreated(e){
    e.preventDefault();
    dispatch (filterCreated(e.target.value))
    setCurrentPage(1)
  }

  function handleOrdenName(e){
    e.preventDefault();
    dispatch (ordenName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleOrdenAttack(e){
    e.preventDefault();
    dispatch (ordenAttack(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div className='Home'>
      <h1><img src="C:/Users/Gastón/Pictures/pokemonlogo.png" alt=""/></h1>
      <Link to="/create"><button>Crea tu propio pokemon!</button></Link>
      <div>
        <span>Filtrar por tipos </span>
        <select onChange={e=>handleFilterTypes(e)}>
          <option value="all">Todos</option>
          {allTypes.map(tipo=>{
            return (<option value={tipo.name} key={tipo.name+tipo.id}>{tipo.name}</option>)})}
        </select>
      </div>
      <div>
        <span>Filtrar por creación</span>
        <select onChange={e=>handleFilterCreated(e)}>
          <option value="all">Todos</option>
          <option value="api">Existentes</option>
          <option value="db">Creados</option>
        </select>
      </div>
      <span>Órdenes </span>
        <select onChange={e=>handleOrdenName(e)}>
          <option value="asc">Alfabético</option>
          <option value="desc">Alfabético invertido</option>
        </select>
        <select onChange={e=>handleOrdenAttack(e)}>
          <option value="asc">Ataque ascendente</option>
          <option value="desc">Ataque descendente</option>
        </select>
        <SearchBar/>
        <Paginado pokesPerPage={pokemonsPerPage} allPokes={allPokemons.length} paginar={paginado}/>
        <div className='Cards'>
         {currentPokes.length?
         currentPokes.map(a=>{
          return(
            <Card nam={a.name} ima={a.img} type={a.types} id={a.id} key={a.id}></Card>
            )
          }):<div>
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fes%2Fver%2Fpikachu-running-run-run-away-gif-13709403&psig=AOvVaw12cf_S861EoDZYt7QHp2FM&ust=1652131397078000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCICBgZzr0PcCFQAAAAAdAAAAABAD" alt="" widht= "200px" height= "200px"/>
            <h2>Cargando</h2>
            </div>} 
            </div>
      </div>
  )
}
