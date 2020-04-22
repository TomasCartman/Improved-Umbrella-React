import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <br/>
            <Link to="/nada">
                <i className="fa "></i> Ultimos gastos
            </Link>
            <Link to="/allExpenses">
                <i className="fa "></i> Todos os gastos
            </Link>
            <Link to="/">
                <i className="fa "></i> Adiconar gasto
            </Link>
            <Link to="/login">
                <i className="fa " onClick={() => localStorage.clear()}></i> Sair
            </Link>
        </nav>
    </aside>