import React, { Component } from 'react'
import PropTypes from 'prop-types'

import decode from './helpers/decode.js'
import '../css/ui.css'

class Scores extends Component {
  constructor (props) {
    super(props)

    this.state = { players: [] }

    // this.props.ws.onmessage = this.onMessage.bind(this)
    let [,, hostname, port] = this.props.location.pathname.split('/')

    this.ws = new WebSocket(`ws://${hostname}:${port}`)
    this.ws.onmessage = this.onMessage.bind(this)
  }

  static propTypes = {
    location: PropTypes.any,
  }

  onMessage (ev) {
    let players = decode(ev.data)
    this.setState({ players })
  }

  componentWillUnmount () {
    this.ws.close()
  }

  render () {
    return (
      <div className='ui'>
        {
          this.state.players.map(player =>
            <div className='player' key={ player.id } >
              <div className='name'>{ player.name }</div>
              <div className='score'>{ player.score }</div>
            </div>
          )
        }
      </div>
    )
  }
}

export default Scores
