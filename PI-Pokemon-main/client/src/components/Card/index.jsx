import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({nam, ima, type, id}) {
  return (
    <div className='Card'>
        <img src={ima} alt="Not found" widht= "100px" height= "100px"/>
        <Link to={`/pokemon/${id}`}><h3>{nam}</h3></Link>
        {type.map(tip=>{
          return <h5 key={tip.id+tip.name}>{tip.name}</h5>
        })}
    </div>
  )
}
