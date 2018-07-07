import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import Tooltip from './Tooltip.jsx'
import UI from './UI.jsx'
import checkWS from './helpers/checkWS.js'
import noise from '../images/noise.png'

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
        <section className='hero is-dark is-fullheight' style={{
          backgroundImage: `url(${noise})`,
          backgroundColor: 'hsl(0, 0%, 11%)',
          overflow: 'hidden',
        }}>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <h1 className='title'>Beat Saber Multiplayer Scores</h1>
              <h2 className='subtitle'><a href='' target='_blank' rel='noopener noreferrer'>HOW TO USE</a></h2>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='field has-addons is-fullwidth'>
                  <div className='control' style={{ maxWidth: '550px', width: '56vw' }}>
                    <input
                      className='input'
                      type='text'
                      placeholder='ws://localhost:3702'
                      value={ this.state.input }
                      onChange={ e => { this.setState({ input: e.target.value, error: false }) }}
                      onKeyDown={ e => { if (e.key === 'Enter') { this.checkURL() } } }
                    />
                  </div>
                  <div className='control'>
                    <a className={ `button ${this.state.error ? 'is-danger' : 'is-info'}` } onClick={() => { this.checkURL() }}>
                      CONNECT
                    </a>
                  </div>
                </div>
              </div>

              <Tooltip
                text={ this.state.error ? 'WebSocket Server Not Found...' : '' }
                success={ false }
                error={ this.state.error }
              />
            </div>
          </div>

          <div className='hero-foot'>
            <div className='foot has-text-centered'>
              <p>
                Built by <strong>lolPants#0001</strong>
              </p>
            </div>
          </div>

        </section>
      )
    } else {
      return <UI ws={ this.state.ws } />
    }
  }
}

export default App
