import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Main from '../template/Main'
import Header from '../template/Header'
import axios from 'axios'

import './SignUp.css'

const headerProps = {
    icon: 'umbrella',
    title: 'Improved Umbrella'
}

export default class SignUp extends Component {

    componentDidMount() {
        document.title = 'Improved Umbrella'
    }

    renderSignUpForm() {
        return (
            <React.Fragment>
                <div className="mainDiv">
                    <div className="title">
                        <h3>Cadastro</h3>
                    </div>
                    <br/>
                    <form className="form-group">
                        <div className="col-12">
                            <div className="row">
                                <label>Nome: </label>
                                <input type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Seu nome" />
                            </div>
                            <div className="row">
                                <label>Usuário: </label>
                                <input type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="Seu nome de usuário (usado para o login)" />
                            </div>
                            <div className="row">
                                <label>Senha: </label>
                                <input type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Sua senha (usada para o login)" />
                            </div>
                            <br/>
                            <button type="button" className="btn btn-success">Cadastrar</button>
                            <div className="row">
                                <Link to="/login">
                                    <p>Já possui uma conta? Faça o login aqui</p>
                                </Link>
                            </div>                     
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
           <React.Fragment>
               <div className="appLogout">
                <Header { ...headerProps } />
                    <div className="content container">
                        {this.renderSignUpForm()}
                    </div>
               </div>   
           </React.Fragment>
        )
    }
}