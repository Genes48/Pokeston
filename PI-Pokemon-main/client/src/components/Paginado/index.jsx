import React from 'react'

export default function Paginado({pokesPerPage, allPokes, paginar}) {
    const paginas=[]

    for(let i = 1; i<=Math.ceil(allPokes/pokesPerPage); i++){
        paginas.push(i)
    }

    return (
    <nav>
        <div className='paginado'>
            {
                paginas.map(num=>{
                    return(
                    <span className='numero' key={num}>
                    <button onClick={()=>paginar(num)} key={num}>{num}</button>
                    </span>
                    )
                })
            }
        </div>
    </nav>
  )
}
