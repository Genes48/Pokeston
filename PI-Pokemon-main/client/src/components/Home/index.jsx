import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterCreated, ordenName, ordenAttack, getTypes, filterType } from '../../actions';
import Card from '../Card';
import Paginado from '../Paginado';
import SearchBar from '../SearchBar';
import Footer from '../Footer';
import './Home.css';
import img from "./img.png";
import pikachu from "./pikachu-running.gif";


export default function Home() {
  
  const dispatch = useDispatch();
  var allPokemons = useSelector((state)=>state.pokemons);
  const allTypes = useSelector((state)=>state.types)
  var desabilitar = false
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
  const pag = (e)=>{
    if(e.target.value==="previous")setCurrentPage(currentPage-1)
    if(e.target.value==="next")setCurrentPage(currentPage+1)
  }
  const [orden, setOrden]= useState("")

  useEffect (() => {
    if (allPokemons.length === 0 && allTypes.length === 0) {dispatch(getPokemons()).then(()=> dispatch(getTypes()))};
}, [dispatch, allPokemons.length, allTypes.length])

  if(allPokemons.length===0){
    desabilitar=true
  }

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
      <div className='Log'><img src={img} className='Logo' alt="" height="150px"  width="350px"/></div>
      <div className='Inicio'>
        <button disabled={desabilitar} onClick={()=>dispatch (filterCreated("all"))}> Volver a cargar todos los pokemons</button>
      <Link to="/create"><button>Crea tu propio pokemon!</button></Link>
      <div>
        <span>Filtrar por tipos </span>
        <select disabled={desabilitar} onChange={e=>handleFilterTypes(e)}>
          <option value="all">Todos</option>
          {allTypes.map(tipo=>{
            return (<option value={tipo.name} key={tipo.name+tipo.id}>{tipo.name}</option>)})}
        </select>
      </div>
      <div>
        <span>Filtrar por creación</span>
        <select disabled={desabilitar} onChange={e=>handleFilterCreated(e)}>
          <option value="all">Todos</option>
          <option value="api">Existentes</option>
          <option value="db">Creados</option>
        </select>
      </div>
      <span>Órdenes </span>
        <select disabled={desabilitar} onChange={e=>handleOrdenName(e)}>
          <option value="asc">Alfabético</option>
          <option value="desc">Alfabético invertido</option>
        </select>
        <select disabled={desabilitar} onChange={e=>handleOrdenAttack(e)}>
          <option value="asc">Ataque ascendente</option>
          <option value="desc">Ataque descendente</option>
        </select>
        <SearchBar/>
        </div>
        {!desabilitar?<Paginado pokesPerPage={pokemonsPerPage} current={currentPage} allPokes={allPokemons.length} paginar={paginado} pagi={pag}/>:null}
        <div className='Cards'>
         {currentPokes.length?
         currentPokes.map(a=>{
          return(
            <Card nam={a.name} ima={a.img} type={a.types} id={a.id} key={a.id}></Card>
            )
          }):<div className='Cargando'>
            <img src={pikachu} alt="Not Found" widht= "200px" height= "200px"/>
            <h2>Cargando...</h2>
            </div>} 
            </div>
            <Footer />
      </div>
  )
}
