import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar(){
    return (
    <>
    <nav className="navbar">
        <Link to="/" className="not-neflix">
            <p>Not Netflix</p>
        </Link>
    </nav>
    </>
    )
}