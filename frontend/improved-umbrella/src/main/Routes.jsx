import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'



export default props =>
    <React.Fragment>
        <Switch>
            <Route exact path="/"
                render={(props) => <Home { ...props } isAuthed={true} />} />
            
            <Redirect from="*" to="/" />
        </Switch>
    </React.Fragment>