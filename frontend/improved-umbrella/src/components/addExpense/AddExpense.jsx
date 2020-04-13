import React, { Component } from 'react'
import Main from '../template/Main'
import Nav from '../template/Nav'
import axios from 'axios'

import './AddExpense.css'

const headerProps = {
    icon: 'umbrella',
    title: 'Improved Umbrella'
}

const initialState = {
    subexpensesCounter: []
}

export default class AddExpense extends Component {

    state = { ...initialState }

    componentDidMount() {
        document.title = 'Improved Umbrella'
    }

    renderAddExpenseRow() {
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
                    </div>
                    
                    <div className="row">
                        <div className="col-6">
                            <input type="text"
                                id="input-expense"
                                className="form-control"
                                placeholder="Digite o nome do gasto principal" />
                        </div>
                        <div className="col-2">
                            <input type="text"
                                id="input-expense"
                                className="form-control"
                                placeholder="Valor" />
                        </div>
                    </div>    
                </form>
            </React.Fragment>
        )
    }

    renderAddNewSubexpensesButton() {
        const subexpensesCounter = [ ...this.state.subexpensesCounter ]
        subexpensesCounter.push(subexpensesCounter.length + 1)
        return (
            <React.Fragment>
                <button type="button" className="btn btn-warning" 
                    style={{"marginLeft": "2%"}}
                    onClick={() => this.setState({ subexpensesCounter })} >
                        <i className="fa fa-plus"></i>
                </button>
            </React.Fragment>
        )
    }

    renderAddExpenseButton() {
        return (
            <React.Fragment>
                <br/>
                <button type="button" className="btn btn-success">
                    Adicionar gasto
                </button>
            </React.Fragment>
        )
    }

    renderSubexpensesRows() {
        const numberOfRows = [ ...this.state.subexpensesCounter ]
        let i = 0
        console.log(numberOfRows)
        return numberOfRows.map(row => {
            i += 1
            return (
                <React.Fragment key={i}>
                    <form className="form-group" style={{"marginLeft": "2%"}}>
                        <div className="row">
                            <div className="col-6">
                                <label>Nome do Subgasto: </label>
                            </div>
                            <div className="col-2">
                                <label>Valor do subgasto: </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="text"
                                    id="input-expense"
                                    className="form-control"
                                    placeholder="Digite o nome do subgasto" />
                            </div>
                            <div className="col-2">
                                <input type="text"
                                        id="input-expense"
                                        className="form-control"
                                        placeholder="Valor" />
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