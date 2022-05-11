import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({nam, ima, type, id}) {
  return (
    <div className='Card'>
        <Link style={{ textDecoration: 'none' }} to={`/pokemon/${id}`}><h3>{nam.toUpperCase()}</h3></Link>
        <img src={ima} alt="Not found" widht= "100px" height= "100px"/>
        {type.map(tip=>{
          return <h5 className='Tipos' key={tip.id+tip.name}>{tip.name}</h5>
        })}
    </div>
  )
}
