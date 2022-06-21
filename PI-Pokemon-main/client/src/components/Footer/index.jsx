import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {

    return (
        <>
            <div className="footContainer">
                <div className='foot'>
                    <h2 className="titleFoot">About me:</h2>
                    <br />
                    <ul style={{ marginTop: '15px' }}>
                        <li><span style={{ marginLeft: "5px" }}>Linkedin:</span> <a href='https://www.linkedin.com/in/gaston-cajal-skaf-fullstack/'>https://www.linkedin.com/in/gaston-cajal-skaf-fullstack</a></li>
                        <li><span style={{ marginLeft: "5px" }}>Git Hub: <a href='https://github.com/Genes48/'>https://github.com/Genes48</a></span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}