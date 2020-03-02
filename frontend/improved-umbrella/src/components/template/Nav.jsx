import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa "></i> First
            </Link>
            <Link to="/">
                <i className="fa "></i> Second
            </Link>
        </nav>
    </aside>