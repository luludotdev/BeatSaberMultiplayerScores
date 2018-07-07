import React, { Component } from 'react'

class UI extends Component {
  render () {
    return (
      <div>
        Connected to { this.props.ws.url }
      </div>
    )
  }
}

export default UI
