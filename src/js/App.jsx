import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home.jsx'
import UI from './UI.jsx'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/ws' component={ UI } />
        </Switch>
      </Router>
    )
  }
}

export default App
