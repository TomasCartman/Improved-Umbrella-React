import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Header from '../template/Header'
import { backendLink } from '../../config'
import axios from 'axios'

import './SignUp.css'


const headerProps = {
    icon: 'umbrella',
    title: 'Improved Umbrella'
}

const initialState = {
    user: {
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
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

    
    validate() { // THIS IS NOT WORKING AS IT SHOULD
        const user = { ...this.state.user }

        if(user.name.trim().length < 6) {
            console.log('Nome muito pequeno!')
            return false
        } else if(user.name.trim().length > 100) {
            console.log('Nome muito longo!')
            return false
        }
    
        if(user.username.trim().length < 4) {
            console.log('Nome de usuário muito pequeno!')
            return false
        } else if(user.username.trim().length > 30) {
            console.log('Nome de usuário muito longo!')
            return false
        } else if(user.username.trim().search(' ') !== -1){
            console.log(user.username.trim().search(' '))
            console.log('Nome de usuário não deve conter espaços')
            return false
        }
    
        if(user.password.trim().length < 6) {
            console.log('Senha muito curta!')
            return false
        } else if(user.password.trim().length > 30) {
            console.log('Senha muito longa!')
            return false
        }
    
        if(user.confirmPassword.trim() !== user.password.trim()) {
            console.log('As senhas não conferem')
            return false
        }

        return true
    }
    

    register() {
        if(this.validate()) {
            let inMemoryToken
            const user = { ...this.state.user }
            console.log(user)
            axios.post(backendLink + '/users', user)
                .then(result => {
                    console.log(result)
                    axios.post(backendLink + '/signin', user)
                        .then(result => {
                            localStorage.setItem('token', result.data.token)
                            localStorage.setItem('username', result.data.id)
                            localStorage.setItem('name', result.data.name)
                            localStorage.setItem('username', result.data.username)
                            localStorage.setItem('iat', result.data.iat)
                            localStorage.setItem('exp', result.data.exp)
                            this.setState({ redirect: true }) 
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ msg: 'Usuário já cadastrado'})
                })
        }     
    }

    renderSignUpForm() {
        return (
            <React.Fragment>
                <div className="mainDiv">
                    <div className="title">
                        <h3>Cadastro</h3>
                    </div>
                    <br/>
                    <h5 style={{color: "red"}}>{this.state.msg}</h5>
                    <form className="form-group">
                        <div className="col-12">
                            <div className="row">
                                <label>Nome: </label>
                                <input type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Seu nome"
                                            id="formName"
                                            value={this.state.user.name}
                                            onChange={e => this.updateField(e)} />
                            </div>
                            <div className="row">
                                <label>Usuário: </label>
                                <input type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="Seu nome de usuário (usado para o login)"
                                            id="formUsername"
                                            value={this.state.user.username}
                                            onChange={e => this.updateField(e)} />
                            </div>
                            <div className="row">
                                <label>Senha: </label>
                                <input type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Sua senha (usada para o login)"
                                            id="formPassword"
                                            value={this.state.user.password}
                                            onChange={e => this.updateField(e)} />
                            </div>
                            <div className="row">
                                <label>Repita a senha: </label>
                                    <input type="password"
                                                name="confirmPassword"
                                                className="form-control"
                                                placeholder="Repita sua senha"
                                                id="formConfirmPassword"
                                                value={this.state.user.confirmPassword}
                                                onChange={e => this.updateField(e)} />
                            </div>
                            <br/>
                            <button type="button" className="btn btn-success" onClick={() => this.register()}>Cadastrar</button>
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
        if(localStorage.getItem('token')) return <Redirect to="/allExpenses" />

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