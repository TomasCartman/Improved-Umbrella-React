import React, { Component } from 'react'
import Main from '../template/Main'
import Nav from '../template/Nav'
import axios from 'axios'

//import './Expense.css'

const itemsExemple = [{"id":1,"expense_id":2,"item_name":"Leite","item_value":3.04,"item_amount":5},{"id":2,"expense_id":2,"item_name":"Suco","item_value":3.27,"item_amount":3},{"id":3,"expense_id":2,"item_name":"Doritos sweet chili","item_value":2.89,"item_amount":2},{"id":4,"expense_id":3,"item_name":"Doritos 167g","item_value":7.09,"item_amount":1},{"id":5,"expense_id":3,"item_name":"Caixa de barra de cereal","item_value":21.38,"item_amount":1},{"id":6,"expense_id":3,"item_name":"Caixa de cereal crunch","item_value":11.89,"item_amount":3}]

const headerProps = {
    icon: 'umbrella',
    title: 'Improved Umbrella'
}

export default class AddExpense extends Component {

    componentDidMount() {
        document.title = 'Improved Umbrella'
    }

    renderWelcomeMensage() {
        const name = localStorage.getItem('name')
        return (
            <React.Fragment>
                <div className="row">
                    Bem vindo, {name}!
                </div>
            </React.Fragment>
        )
    }

    renderExpenses() {
        let i = 0
        return itemsExemple.map(item => {
            i += 1
            return (
                <React.Fragment>
                    <div className="row">
                        <h2>Gasto {i}</h2>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <h4>Nome:</h4>
                        </div>
                        <div className="col-2">
                            <h4>Valor:</h4>
                        </div>
                        <div className="col-2">
                            <h4>Quantidade:</h4>
                        </div>
                        <div className="col-2">
                            <h4>Valor total:</h4>
                        </div>
                    </div>      
                    <div className="row">
                        <div className="col-6">
                            <h4>{item.item_name}</h4>
                        </div>
                        <div className="col-2">
                            <h4>{item.item_value}</h4>
                        </div>
                        <div className="col-2">
                            <h4>{item.item_amount}</h4>
                        </div>
                        <div className="col-2">
                            <h4>{item.item_value * item.item_amount}</h4>
                        </div>
                    </div>                
                    <hr/>
                    <br/>
                </React.Fragment>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="app">
                    <Nav />
                    <Main { ...headerProps }>
                        <div className="container-fluid">
                            {this.renderWelcomeMensage()}
                        </div>
                        <div className="container-fluid">
                            {this.renderExpenses()}
                        </div>
                    </Main>
                </div>    
            </React.Fragment>
        )
    }
}