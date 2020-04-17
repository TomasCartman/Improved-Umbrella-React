import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                        <h3>Login</h3>
                    </div>
                    <br/>
                    <form className="form-group">
                        <div className="col-12">
                            <div className="row">
                                <label>Usuário: </label>
                                <input type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="Seu nome de usuário" />
                            </div>
                            <div className="row">
                                <label>Senha: </label>
                                <input type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Sua senha" />
                            </div>
                            <br/>
                            <button type="button" className="btn btn-success">Entrar</button>
                            <div className="row">
                                <Link to="/signup">
                                    <p>Não possui uma conta? Cadastre-se aqui</p>
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