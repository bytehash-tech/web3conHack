import React from 'react'
import './Header.css'
import icon from '../../assets/bytehash-icon.jpg'

export default function Header() {
  return (
    <header className="header">
        <img className="header--icon" src={icon} alt="icon"></img>
        <h1 className="header--title">byteHash</h1>
        <button className="header--button">connect wallet</button>
    </header>
  )
}
