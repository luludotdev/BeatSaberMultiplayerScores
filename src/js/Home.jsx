import React, { Component } from 'react'
import 'bulma/css/bulma.css'

import Tooltip from './Tooltip.jsx'
import checkWS from './helpers/checkWS.js'
import noise from '../images/noise.png'

const { parse } = require('url')

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      input: '',
      error: false,
      success: false,
      url: '',
    }
  }

  async checkURL () {
    let { input } = this.state
    try {
      let { hostname, port } = parse(await checkWS(input))
      let url = { hostname, port }
      this.setState({ error: false, url, success: true })
    } catch (err) {
      console.error(err)
      this.setState({ error: true, url: '', success: false })
    }
  }

  render () {
    return (
      <section className='hero is-dark is-fullheight' style={{
        backgroundImage: `url(${noise})`,
        backgroundColor: 'hsl(0, 0%, 11%)',
        overflow: 'hidden',
      }}>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <h1 className='title'>Beat Saber Multiplayer Scores</h1>
            <h2 className='subtitle'><a href='https://github.com/lolPants/BeatSaberMultiplayerScores/blob/master/README.md' target='_blank' rel='noopener noreferrer'>HOW TO USE</a></h2>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className='field has-addons is-fullwidth'>
                <div className='control' style={{ maxWidth: '550px', width: '56vw' }}>
                  <input
                    className='input'
                    type='text'
                    placeholder='ws://localhost:3702'
                    value={ this.state.input }
                    onChange={ e => { this.setState({ input: e.target.value, error: false, success: false }) }}
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
              text={
                this.state.error ?
                  'WebSocket Server Not Found...' :
                  this.state.url ?
                    <span>
                      <a href={ `#/scores/${this.state.url.hostname}/${this.state.url.port}` }>SCORES</a> - <a href={ `#/level/${this.state.url.hostname}/${this.state.url.port}` }>LEVEL NAME</a>
                    </span> :
                    ''
              }
              success={ this.state.success }
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
  }
}

export default Home
