import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Main from '../template/Main'
import Nav from '../template/Nav'
import axios from 'axios'

import './AddExpense.css'

// const backendLink = 'https://improved-umbrella.herokuapp.com'
const backendLink = 'http://localhost:3001'

const headerProps = {
    icon: 'umbrella',
    title: 'Improved Umbrella'
}

const initialState = {
    expense: {
        username: "",
        expense_type: 0,
        expense_name: "",
        expense_value: 0,
        expense_localization: "",
        expense_date: null
    },
    subexpenses: []
}

export default class AddExpense extends Component {

    state = { ...initialState }

    componentDidMount() {
        document.title = 'Improved Umbrella'
    }

    addExpenseToDB() {
        let expense = { ...this.state.expense }
        let subexpenses = [ ...this.state.subexpenses ]
        expense.expense_value = Number(expense.expense_value)
        expense.username = localStorage.getItem('username')

        if(!expense.expense_name || !expense.expense_value) {
            // Mensagem de erro
            return
        }
        let subespensesProvisory = [ ...subexpenses ]
        subexpenses.map(subexpense => {
            if(!subexpense.item_name || !subexpense.item_value || !subexpense.item_amount) {
                subespensesProvisory.splice(subexpense.item_id, 1)
            }
        })
        subexpenses = [ ...subespensesProvisory ]
        
        
        axios.post(backendLink + '/expenses', expense) // Axios request to add expense
            .then(res => {
                if(subexpenses.length > 0) {
                    subexpenses.map(subexpense => {
                        subexpense.item_value = Number(subexpense.item_value).toFixed(2)
                        subexpense.item_amount = Number(subexpense.item_amount)
                        delete subexpense.item_id
                        subexpense.expense_id = Number(res.data[0].id)
                    })
                    
                    axios.post(backendLink + '/items', subexpenses) // Axios request to add subexpenses
                    .then(res => {
                        // MENSAGEM DE SUCESSO
                        this.setState({ initialState })
                    })
                    .catch(err => {
                        console.log('Subexpense post request error -> ' + err)
                    })
               } else {
                   // MSG DE SUCESSO DE EXPENSE
                   this.setState({ initialState })
               }     
            })
            .catch(err => {
                console.log('Expense post request error -> ' + err)
            })
    }

    updateField(event) {
        const expense = { ...this.state.expense }
        expense[event.target.name] = event.target.value
        this.setState({ expense })
    }

    updateSubexpenseName(event, position) {
        let subexpenses = [ ...this.state.subexpenses ]
        let expense = { ...this.state.expense }
        subexpenses[position].item_name = event.target.value
        this.setState({ subexpenses })
    }

    updateSubexpenseValue(event, position) {
        let subexpenses = [ ...this.state.subexpenses ]
        let expense = { ...this.state.expense }
        let subexpense_value = event.target.value.trim().toString()
        let subexpenseValueStateString = subexpenses[position].item_value.toString()

        if(subexpense_value.charAt(subexpense_value.length -1) === ','){
            subexpense_value = subexpense_value.replace(',', '.')
        }
        if(subexpenseValueStateString.includes('.') && subexpense_value.charAt(subexpense_value.length -1) === '.') {
            subexpense_value = subexpense_value.substring(0, subexpense_value.length - 1)
        }
        
        let subexpense_valueNumber = Number(subexpense_value)

        if(!isNaN(subexpense_valueNumber) || subexpense_value === "" || subexpense_value.charAt(subexpense_value.length -1) === ".") {
            if(subexpense_value === "") {
                subexpense_value = 0
                subexpenses[position].item_value = subexpense_value
            } else if(subexpense_value.charAt(subexpense_value.length -1) === ".") {
                subexpenses[position].item_value = subexpense_value
            } else {
                subexpenses[position].item_value = Number(subexpense_value)
            }
            
            let total_value = 0
            subexpenses.map(row => {
                let value = Number(row.item_value) * Number(row.item_amount)
                total_value += value
            })
            expense.expense_value = total_value.toFixed(2)
        }
        
        this.setState({ subexpenses })
        this.setState({ expense })
    }

    updateSubexpenseAmount(event, position) {
        let subexpenses = [ ...this.state.subexpenses ]
        let expense = { ...this.state.expense }
        let subexpense_amount = event.target.value.trim()
        let subexpense_amountNumber = parseInt(subexpense_amount)
        if(!isNaN(subexpense_amountNumber) || subexpense_amount === "") {
            if(subexpense_amount === ""){
                subexpense_amount = 0
                subexpenses[position].item_amount = subexpense_amount
            } else {
                subexpenses[position].item_amount = parseInt(subexpense_amount)
            }
            let total_value = 0
            subexpenses.map(row => {
                let value = Number(row.item_value) * Number(row.item_amount)
                total_value += value
            })
            expense.expense_value = total_value.toFixed(2)
        }

        this.setState({ subexpenses })
        this.setState({ expense })
    }

    renderAddExpenseRow() {
        if(!localStorage.getItem('token')) return <Redirect to="/" />

        return (
            <React.Fragment>
                <form className="form-group">
                    <div className="row">
                        <div className="col-6">
                            <label><strong>Nome do Gasto Principal: </strong></label>
                        </div>
                        <div className="col-2">
                            <label>Valor total:</label>
                        </div>
                        <div className="col-2">
                            <label>Localização:</label>
                        </div>
                        <div className="col-2">
                            <label>Data:</label>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-6">
                            <input type="text"
                                name="expense_name"
                                className="form-control"
                                placeholder="Digite o nome do gasto principal"
                                value={this.state.expense.expense_name}
                                onChange={e => this.updateField(e)} />
                        </div>
                        <div className="col-2">
                            <input type="text"
                                name="expense_value"
                                className="form-control"
                                placeholder="Valor"
                                value={this.state.expense.expense_value}
                                onChange={e => this.updateField(e)} />
                        </div>
                        <div className="col-2">
                            <input type="text"
                                name="expense_localization"
                                className="form-control"
                                placeholder="Localização"
                                value={this.state.expense.expense_localization}
                                onChange={e => this.updateField(e)} />
                        </div>
                        <div className="col-2">
                            <input type="date"
                                name="expense_date"
                                className="form-control"
                                placeholder="Data"
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>    
                </form>
            </React.Fragment>
        )
    }

    renderAddNewSubexpensesButton() {
        const subexpenses = [ ...this.state.subexpenses ]
        const subexpense = {
            "item_name": "",
            "item_value": 0,
            "item_amount": 1,
            "item_id": subexpenses.length
        }
        return (
            <React.Fragment>
                <button type="button" className="btn btn-warning" 
                    style={{"marginLeft": "2%"}}
                    onClick={() => {
                        subexpenses.push(subexpense)
                        this.setState({ subexpenses })
                    }} >
                        <i className="fa fa-plus"></i>
                </button>
            </React.Fragment>
        )
    }

    renderRemoveSubexpenseButton() {
        const subexpenses = [ ...this.state.subexpenses ]
        // PENSAR NUMA FORMA DE REMOVER DE MODO QUE QUANDO ELE REMOVER DO ARRAY
        // O TAMANHO DO ARRAY FIQUE SUFICIENTE PRA ELE NÃO TER PROBLEMA COM EXEMPLO:
        // array[item_id] ALTERANDO O ITEM ERRADO OU 'ArrayOutOfRange'.
        //
        // COLOCAR UM OBJETO VAZIO TAMBÉM PODE GERAR O PROBLEMA DO SITE RENDERIZAR A ROW
        // COMO SE ELA AINDA EXISTISSE.
        //
        // COLOCAR NULL NO LUGAR DO OBJETO TAMBÉM PODE GERAR O PROBLEMA DE EM ALGUM LUGAR
        // O SITE TENTAR ACESSAR item.item_name (null.item_name), OQUE IRIA GERAR UM ERRO. 
    }

    renderAddExpenseButton() {
        return (
            <React.Fragment>
                <br/>
                <button type="button" className="btn btn-success"
                    onClick={() => this.addExpenseToDB()}>
                    Adicionar gasto
                </button>
            </React.Fragment>
        )
    }

    renderSubexpensesRows() {
        const subexpenses = [ ...this.state.subexpenses ]
        return subexpenses.map(row => {
            console.log(row)
            return (
                <React.Fragment key={row.item_id}>
                    <form className="form-group" style={{"marginLeft": "2%"}}>
                        <div className="row">
                            <div className="col-6">
                                <label>Nome do Subgasto: </label>
                            </div>
                            <div className="col-2">
                                <label>Valor do subgasto: </label>
                            </div>
                            <div className="col-2">
                                <label>Quantidade: </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text"
                                    name="item_name"
                                    className="form-control"
                                    placeholder="Digite o nome do subgasto"
                                    value={this.state.subexpenses[row.item_id].item_name}
                                    onChange={e => this.updateSubexpenseName(e, row.item_id)} />
                            </div>
                            <div className="col-2">
                                <input type="text"
                                        name="item_value"
                                        className="form-control"
                                        placeholder="Valor" 
                                        value={this.state.subexpenses[row.item_id].item_value}
                                        onChange={e => this.updateSubexpenseValue(e, row.item_id)} />
                            </div>
                            <div className="col-2">
                                <input type="text"
                                        name="item_amount"
                                        className="form-control"
                                        placeholder="Quantidade"
                                        value={this.state.subexpenses[row.item_id].item_amount}
                                        onChange={e => this.updateSubexpenseAmount(e, row.item_id)} />
                            </div>
                        </div>    
                    </form>
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
                            {this.renderAddExpenseRow()}
                        </div>
                        <div className="container-fluid">
                            {this.renderSubexpensesRows()}
                        </div>
                        <div className="container-fluid">
                            {this.renderAddNewSubexpensesButton()}
                        </div>
                        <div className="container-fluid">
                            {this.renderAddExpenseButton()}
                        </div>
                    </Main>
                </div>    
            </React.Fragment>
           
        )
    }
}