import React from 'react'

export default function Paginado({pokesPerPage, current, allPokes, paginar, pagi}) {
    const paginas=[]
    
    var control1=false
    var control2=false

    for(let i = 1; i<=Math.ceil(allPokes/pokesPerPage); i++){
        paginas.push(i)
    }

    if (current === 1 ) control1= true
    if (current === paginas.length ) control2 = true

    return (
    <nav>
        <div className='paginado'>
            <button disabled={control1} value="previous" onClick={(e)=>pagi(e)} >Previous</button>
            {
                paginas.map(num=>{
                    return(
                    <span className='numero' key={num}>
                    <button onClick={()=>paginar(num)} key={num}>{num}</button>
                    </span>
                    )
                })
            }
            <button disabled={control2} value="next" onClick={(e)=>pagi(e)}>Next</button>
        </div>
    </nav>
  )
}
