import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Main from '../template/Main'
import Nav from '../template/Nav'
import { backendLink } from '../../config'
import axios from 'axios'

import { Line } from 'react-chartjs-2';

//import './Expense.css'


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
        this.getExpenses()
    }

    async getExpenses() {
        await axios.post(backendLink + '/allexpenses', {
            username: localStorage.getItem('username')
        }).then(result => {
            result.data.map(res => {
                if(res.expense_date) {
                    res.expense_date = res.expense_date.substring(0, 10)
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

    dateToBrazilianDate(string_date) {
        let year = string_date.substring(0, 4)
        let month = string_date.substring(5, 7)
        let day = string_date.substring(8, 10)
        let brazilian_date = day + "-" + month + "-" + year
        return brazilian_date
    }

    // This chart is about all expenses per day
    renderChartTest() {
        const expenses = [ ...this.state.expenses ]
        let dates = []
        let values = []
        
        let pos

        expenses.map(expense => {
            if(expense.expense_date)
                pos = dates.indexOf(expense.expense_date)
                if(pos !== -1){
                    values[pos] = values[pos] + expense.expense_value
                } else {
                    dates.push(expense.expense_date)
                    values.push(expense.expense_value)
                }
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

    // This chart is about all expenses per month
    renderChartMonthly() {
        const expenses = [ ...this.state.expenses ]
        const dateToMonth = { '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun',
                                '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez'}
        let dates = []
        let values = []
        
        let pos

        expenses.map(expense => {
            if(expense.expense_date) {
                let date = expense.expense_date.split('-')
                pos = dates.indexOf((dateToMonth[date[1]].concat(" ")).concat(date[0]))
                if(pos !== -1) {
                    values[pos] = (Number(values[pos]) + expense.expense_value).toFixed(2).toString()
                } else {
                    dates.push((dateToMonth[date[1]].concat(" ")).concat(date[0]))
                    values.push(expense.expense_value)
                }
            }
        })

        const data = {
            labels: dates,
            datasets: [
              {
                label: 'Todas as despesas por mês',
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

        expenses.sort( function(a, b) { 
            const aDate = new Date(a.expense_date)
            const bDate = new Date(b.expense_date)
            if(aDate > bDate) return -1
            if(aDate < bDate) return 1
            return 0
        } )

        return expenses.map(expense => {
            i += 1
            return (
                <React.Fragment key={expense.id}>
                    <hr/>
                    <br/>
                    <div className="row">
                        <div className="col-4">
                            <h5><strong>Nome:</strong></h5>
                        </div>
                        <div className="col-2">
                            <h5><strong>Total:</strong></h5>
                        </div>
                        <div className="col-2">
                            <h5><strong>Localização:</strong></h5>
                        </div>
                        <div className="col-2">
                            <h5><strong>Data:</strong></h5>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-primary" >Subgastos</button>
                        </div>
                    </div>      
                    <div className="row">
                        <div className="col-4">
                            <h5>{expense.expense_name}</h5>
                        </div>
                        <div className="col-2">
                            <h5>{expense.expense_value.toFixed(2)}</h5>
                        </div>
                        <div className="col-2">
                            <h5>{expense.expense_localization}</h5>
                        </div>
                        <div className="col-2">
                            <h5>{this.dateToBrazilianDate(expense.expense_date)}</h5>
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
                        <div>
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
                                    <h6>{item.item_value.toFixed(2)}</h6>
                                </div>
                                <div className="col-2">
                                    <h6>{item.item_amount}</h6>
                                </div>
                                <div className="col-2">
                                    <h6>{(item.item_value * item.item_amount).toFixed(2)}</h6>
                                </div>
                            </div>
                            <div className="offset-1 col-10">
                                <hr/>
                             </div>
                             
                        </div>          
                    </React.Fragment>
                )
            }
        })
    }

    render() {
        if(!localStorage.getItem('token')) return <Redirect to="/login" />

        return (
            <React.Fragment>
                <div className="app">
                    <Nav />
                    <Main { ...headerProps }>
                        <div className="container-fluid">
                            {this.renderWelcomeMensage()}
                        </div>
                        <div className="container-fluid">
                            {this.renderChartMonthly()}
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