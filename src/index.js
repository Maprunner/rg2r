import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from "react-redux"
import * as serviceWorker from './serviceWorker'

import configureStore from './configureStore'

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}
const store = configureStore()

const rootElement = document.getElementById("root")
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
