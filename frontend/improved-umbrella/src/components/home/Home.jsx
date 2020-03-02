import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: '',
    title: 'Home',
    subtitle: 'None'
}

export default class UserCrud extends Component {
    
    render() {
        return (
            <Main { ...headerProps }>

            </Main>
        )
    }
}