import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Anaylize from './anaylize'
import Landing from './landing'
import Main from './main'

export const EntryRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/anaylize" component={Anaylize} />
            <Route path="/landing" component={Landing} />
            <Route path="/" component={Main} />
        </Switch>
    </BrowserRouter>
)
