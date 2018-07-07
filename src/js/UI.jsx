import React, { Component } from 'react'
import PropTypes from 'prop-types'

import decode from './helpers/decode.js'

class UI extends Component {
  constructor (props) {
    super(props)

    this.state = { players: [] }

    this.props.ws.onmessage = this.onMessage.bind(this)
  }

  static propTypes = {
    ws: PropTypes.any.isRequired,
  }

  onMessage (ev) {
    let players = decode(ev.data)
    this.setState({ players })
  }

  render () {
    return (
      <div>
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

export default UI
