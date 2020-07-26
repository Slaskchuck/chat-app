import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useStyle = makeStyles({
  button: {
    color: 'white',
    borderRadius: '10px',
    padding: '24px',
    width: '100%',
    border: 'none',
    fontSize: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
    '&:active': {
      background: 'lightgreen'
    },
    '&.primary': {
      background: '#88e306',
    },
    '&.disabled': {
      background: '#d7d7d7',
    },
    '&.small': {
      padding: '10px',
      fontSize: '24px',
      fontWeight: '500',
    },
    '&.secondary': {
      background: '#666',
    },
  },
})

const BaseButton = (props) => {
  const {
    children,
    onClick,
    variant = 'primary',
    disabled,
    size = 'large',
  } = props

  const classes = useStyle()

  return <button
    className={clsx(
      classes.button,
      variant,
      disabled && 'disabled',
      size,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
}

BaseButton.propsTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['large', 'small'])
}

export default BaseButton