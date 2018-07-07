import React, { Component } from 'react'
import '../css/App.css'

import UI from './UI.jsx'
import checkWS from './helpers/checkWS.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: '',
      error: false,
      ws: null,
    }
  }

  async checkURL () {
    let { input } = this.state
    try {
      let ws = await checkWS(input)
      this.setState({ error: false, ws })
    } catch (err) {
      this.setState({ error: true, ws: null })
    }
  }

  // Load server automatically on development environment
  componentDidMount () {
    if (process.env.NODE_ENV === 'development') {
      this.setState({ input: 'ws://localhost:3702' }, () => {
        this.checkURL()
      })
    }
  }

  render () {
    if (!this.state.ws) {
      return (
        <div>
          <input
            type='text'
            placeholder='ws://localhost:3702'
            value={ this.state.input }
            onChange={ e => { this.setState({ input: e.target.value }) }}
            onKeyDown={ e => { if (e.key === 'Enter') { this.checkURL() } } }
          />
          <button onClick={ () => this.checkURL() }>Connect to Server</button>
          <div>{ this.state.error ? 'WebSocket Server Not Found' : '' }</div>
        </div>
      )
    } else {
      return <UI ws={ this.state.ws } />
    }
  }
}

export default App
