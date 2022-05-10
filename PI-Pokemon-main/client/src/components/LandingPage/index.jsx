import React from "react";
import {Link} from "react-router-dom";
import './LandingPage.css';

export default function LandingPage(){

    return(
        <div className="Landing">
        <h1>Prepárate para una aventura Pokemon</h1>
        <Link to ="/home">
            <button>Entrar</button>
        </Link>
        </div>
    )
}