import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './mui-theme'

import App from './components/App'
import './index.css'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme = { theme }>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
