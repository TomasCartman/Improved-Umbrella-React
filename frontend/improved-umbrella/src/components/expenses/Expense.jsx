import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Main from '../template/Main'
import Nav from '../template/Nav'
import axios from 'axios'

import { Line } from 'react-chartjs-2';


// const backendLink = 'https://improved-umbrella.herokuapp.com'
const backendLink = 'http://localhost:3001'

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

const initialState = {
    expenses: [],
    items: []
}

export default class AddExpense extends Component {

    state = { ...initialState }

    componentDidMount() {
        document.title = 'Improved Umbrella'
        console.log(localStorage.getItem('username'))
        this.getExpenses()
    }

    async getExpenses() {
        await axios.post(backendLink + '/allexpenses', {
            username: localStorage.getItem('username')
        }).then(result => {
            result.data.map(res => {
                if(res.expense_date) {
                    res.expense_date = res.expense_date.substring(0, 10)
                    // SEPARAR A DATA CERTINHO PARA O PADRÃO BR
                }
            })
            this.setState({ expenses: result.data })
            const expenses = [ ...this.state.expenses ]
            expenses.map(expense => {
                this.getItems(expense.id)
            })
        }).catch(err => console.log(err))
    }

    async getItems(expense_id) {
        await axios.post(backendLink + '/allitems', {
            expense_id: expense_id
        }).then(result => {
            let items = [ ...this.state.items ]
            result.data.map(item => {
                items.push(item)
            })
            this.setState({ items })
        }).catch(err => console.log(err))
    }

    renderChartTest() {
        const expenses = [ ...this.state.expenses ]
        let dates = []
        let values = []
        expenses.map(expense => {
            if(expense.expense_date)
                dates.push(expense.expense_date)
                values.push(expense.expense_value)
        })
        const data = {
            labels: dates,
            datasets: [
              {
                label: 'Todas as despesas',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                cubicInterpolationMode: 'monotone',
                data: values
              }
            ]
          };
        return (
			<div >
				<hr />
				<Line data={data} width={"50%"} height={"15%"} />
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
        const expenses = [ ...this.state.expenses ]
        return expenses.map(expense => {
            i += 1
            return (
                <React.Fragment key={expense.id}>
                    <hr/>
                    <br/>
                    <div className="row">
                        <div className="col-6">
                            <h5><strong>Nome:</strong></h5>
                        </div>
                        <div className="col-2">
                            <h5><strong>Valor:</strong></h5>
                        </div>
                        <div className="col-2">
                            <h5><strong>Localização:</strong></h5>
                        </div>
                        <div className="col-2">
                            <h5><strong>Data:</strong></h5>
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
        const items = [ ...this.state.items ]
        return items.map(item => {
            if(item.expense_id === expense_id){
                return (
                    <React.Fragment key={item.id}>
                        <br/>
                        <div className="row">

                            <div className="offset-1 col-4">
                                <h6><strong>Nome:</strong></h6>
                            </div>
                            <div className="col-2">
                                <h6><strong>Valor:</strong></h6>
                            </div>
                            <div className="col-2">
                                <h6><strong>Quantidade:</strong></h6>
                            </div>
                            <div className="col-2">
                                <h6><strong>Valor total:</strong></h6>
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