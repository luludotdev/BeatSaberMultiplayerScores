import React from 'react'
import PropTypes from 'prop-types'

const ToolTip = props => {
  let isBlank = props.text === ''
  let style = props.success ? 'is-success' : props.error ? 'is-danger' : ''

  return <p className={ `help ${isBlank ? 'is-invis' : ''} ${style}` }>{ isBlank ? '-' : props.text }</p>
}

ToolTip.propTypes = {
  text: PropTypes.any,
  success: PropTypes.bool,
  error: PropTypes.bool,
}

export default ToolTip
