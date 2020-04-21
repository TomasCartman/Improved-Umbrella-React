import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import AddExpense from '../components/addExpense/AddExpense'
import Expense from '../components/expenses/Expense'
import SignUp from '../components/signIn/SignUp'
import Login from '../components/signIn/Login'


export default props =>
    <React.Fragment>
        <Switch>
            <Route exact path="/"
                render={(props) => <AddExpense { ...props } isAuthed={true} />} />
            
            <Route exact path="/allExpenses"
                render={(props) => <Expense { ...props } isAuthed={true} />} />

            <Route exact path="/signup"
                render={(props) => <SignUp { ...props } isAuthed={true} />} />

            <Route exact path="/login"
                render={(props) => <Login { ...props } isAuthed={true} />} />

            <Redirect from="*" to="/login" />
        </Switch>
    </React.Fragment>