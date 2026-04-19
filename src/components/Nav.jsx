import React from 'react'
import './styles/intro.css'
import Logo from './assets/Logo.png'

export default function 
Nav() {
  return (
    <div className="nav">
        <div className="left">
            <img src={Logo} alt="Logo" id="navVectLogo" />
            <h1>ATHUL DAS</h1>
        </div>
        <div className="right">
            <a href="">About</a>
            <a href="">Projects</a>
            <a href="">Achievements</a>
            <a href="">Contact</a>
        </div>
    </div>
  )
}
