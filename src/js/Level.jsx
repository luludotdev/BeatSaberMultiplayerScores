import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { decode, opcodes } from './helpers/decode.js'
import '../css/level.css'

class Level extends Component {
  constructor (props) {
    super(props)

    this.state = { level: {} }

    // this.props.ws.onmessage = this.onMessage.bind(this)
    let [,, hostname, port] = this.props.location.pathname.split('/')

    this.ws = new WebSocket(`ws://${hostname}:${port}`)
    this.ws.onmessage = this.onMessage.bind(this)
  }

  static propTypes = {
    location: PropTypes.any,
  }

  onMessage (ev) {
    let { level, opcode } = decode(ev.data)
    if (opcode === opcodes.SetSelectedSong) this.setState({ level })
  }

  componentWillUnmount () {
    this.ws.close()
  }

  render () {
    let { name, subname, author, bpm } = this.state.level
    return (
      <div className='ui'>
        <div className='name'>{ name ? name : 'name' }</div>
        <div className='subname'>{ subname }</div>
        <div className='meta'>Beatmap by: { author ? author : 'author' }</div>
        <div className='meta'>BPM: { bpm ? bpm : 'something' }</div>
      </div>
    )
  }
}

export default Level
