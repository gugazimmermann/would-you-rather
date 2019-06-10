import React, { Component } from 'react';
import './App.css';

import * as API from '../utils/api'

class App extends Component {

  componentDidMount() {
    API.getInitialData().then(teste => {
      console.log(teste)
    })
  }

  render() {
    return (
      <div className="App">

      </div>
    )
  }
}

export default App
