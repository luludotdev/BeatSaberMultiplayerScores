import React from 'react'
import PropTypes from 'prop-types'

const ToolTip = props => {
  let isBlank = props.text === ''
  let style = props.success ? 'is-success' : props.error ? 'is-danger' : ''

  if (!props.success) return <p className={ `help ${isBlank ? 'is-invis' : ''} ${style}` }>{ isBlank ? '-' : props.text }</p>
  else return <p className={ `help ${isBlank ? 'is-invis' : ''} ${style}` }><a href={ props.href }>{ isBlank ? '-' : props.text }</a></p>
}

ToolTip.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  success: PropTypes.bool,
  error: PropTypes.bool,
}

export default ToolTip
