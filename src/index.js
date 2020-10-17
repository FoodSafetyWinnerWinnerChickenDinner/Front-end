import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { EntryRoute } from './routes'

ReactDOM.render(
    <React.StrictMode>
        <EntryRoute />
    </React.StrictMode>,
    document.getElementById('root')
)
