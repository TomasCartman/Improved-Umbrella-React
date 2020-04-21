import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Header from '../template/Header'
import axios from 'axios'

import './SignUp.css'

// const backendLink = 'https://improved-umbrella.herokuapp.com'
const backendLink = 'http://localhost:3001'

const headerProps = {
    icon: 'umbrella',
    title: 'Improved Umbrella'
}

const initialState = {
    user: {
        username: "",
        password: ""
    },
    msg: "",
    redirect: false
}

export default class SignUp extends Component {

    state = { ...initialState }

    componentDidMount() {
        document.title = 'Improved Umbrella'
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    login() {
        const user = { ...this.state.user }
        if(!user.username || !user.password){
            console.log("Preencha os campos!")
            return
        }

        axios.post(backendLink + '/signin', user)
            .then(result => {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('name', result.data.name)
                localStorage.setItem('username', result.data.username)
                this.setState({ redirect: true })
            })
            .catch(err => {
                console.log(err)
            })
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
                                            placeholder="Seu nome de usuário"
                                            onChange={e => this.updateField(e)} />
                            </div>
                            <div className="row">
                                <label>Senha: </label>
                                <input type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Sua senha"
                                            onChange={e => this.updateField(e)} />
                            </div>
                            <br/>
                            <button type="button" className="btn btn-success" onClick={() => this.login()}>Entrar</button>
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
        const redirect = { ...this.state.redirect }
        if(redirect) return <Redirect to="/" />

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