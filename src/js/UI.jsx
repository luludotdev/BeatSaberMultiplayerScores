import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UI extends Component {
  static propTypes = {
    ws: PropTypes.any.isRequired,
  }

  render () {
    return (
      <div>
        Connected to { this.props.ws.url }
      </div>
    )
  }
}

export default UI
