import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Main from '../template/Main'
import Nav from '../template/Nav'
import axios from 'axios'

import { Line } from 'react-chartjs-2';



//import './Expense.css'

const expensesExemple = [{"id": 2, "username": "TomasCartman", "expense_type": 0, "expense_name": "Supermercado", "expense_value": 177.28, "expense_localization": "Maxxi Atacado", "expense_date": "2020-04-17"},
                        {"id": 3, "username": "TomasCartman", "expense_type": 0, "expense_name": "Padaria", "expense_value": 6, "expense_localization": "Rios Delicatessen", "expense_date": "2020-03-22"}]

const itemsExemple = [{"id":1,"expense_id":2,"item_name":"Leite","item_value":3.04,"item_amount":5},
                    {"id":2,"expense_id":2,"item_name":"Suco","item_value":3.27,"item_amount":3},
                    {"id":3,"expense_id":2,"item_name":"Doritos sweet chili","item_value":2.89,"item_amount":2},
                    {"id":4,"expense_id":3,"item_name":"Doritos 167g","item_value":7.09,"item_amount":1},
                    {"id":5,"expense_id":3,"item_name":"Caixa de barra de cereal","item_value":21.38,"item_amount":1},
                    {"id":6,"expense_id":3,"item_name":"Caixa de cereal crunch","item_value":11.89,"item_amount":3}]


const headerProps = {
    icon: 'umbrella',
    title: 'Improved Umbrella'
}

export default class AddExpense extends Component {

    componentDidMount() {
        document.title = 'Improved Umbrella'
    }

    renderChartTest() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                cubicInterpolationMode: 'monotone',
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          };
        return (
			<div>
				<hr />
				<Line data={data} width={"50%"} height={"10%"} />
                <br/>
			</div>
		)
    }

    renderWelcomeMensage() {
        const name = localStorage.getItem('name')
        return (
            <React.Fragment>
                <div className="row">
                    <h4>Bem vindo, {name}!</h4>
                </div>
            </React.Fragment>
        )
    }

    renderExpenses() {
        let i = 0
        return expensesExemple.map(expense => {
            i += 1
            return (
                <React.Fragment key={expense.id}>
                    <hr/>
                    <div className="row">
                        <h3>Gasto {i}</h3>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <h5>Nome:</h5>
                        </div>
                        <div className="col-2">
                            <h5>Valor:</h5>
                        </div>
                        <div className="col-2">
                            <h5>Localização:</h5>
                        </div>
                        <div className="col-2">
                            <h5>Data:</h5>
                        </div>
                    </div>      
                    <div className="row">
                        <div className="col-6">
                            <h5>{expense.expense_name}</h5>
                        </div>
                        <div className="col-2">
                            <h5>{expense.expense_value}</h5>
                        </div>
                        <div className="col-2">
                            <h5>{expense.expense_localization}</h5>
                        </div>
                        <div className="col-2">
                            <h5>{expense.expense_date}</h5>
                        </div>
                    </div>
                    {this.renderSubexpenses(expense.id)}  
                    <br/>
                </React.Fragment>
            )
        })
    }

    renderSubexpenses(expense_id) {
        return itemsExemple.map(item => {
            if(item.expense_id === expense_id){
                return (
                    <React.Fragment>
                        <br/>
                        <div className="row">
                            
                            <div className="offset-1 col-4">
                                <h6>Nome:</h6>
                            </div>
                            <div className="col-2">
                                <h6>Valor:</h6>
                            </div>
                            <div className="col-2">
                                <h6>Quantidade:</h6>
                            </div>
                            <div className="col-2">
                                <h6>Valor total:</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-1 col-4">
                                <h6>{item.item_name}</h6>
                            </div>
                            <div className="col-2">
                                <h6>{item.item_value}</h6>
                            </div>
                            <div className="col-2">
                                <h6>{item.item_amount}</h6>
                            </div>
                            <div className="col-2">
                                <h6>{item.item_value * item.item_amount}</h6>
                            </div>
                        </div>
                        <br/>        
                    </React.Fragment>
                )
            }
        })
    }

    render() {
        if(!localStorage.getItem('token')) return <Redirect to="/" />

        return (
            <React.Fragment>
                <div className="app">
                    <Nav />
                    <Main { ...headerProps }>
                        <div className="container-fluid">
                            {this.renderWelcomeMensage()}
                        </div>
                        <div className="container-fluid">
                            {this.renderChartTest()}
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