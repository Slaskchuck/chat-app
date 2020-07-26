import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useStyle = makeStyles({
  input: {
    border: 'none',
    background: '#f5f8fa',
    padding: '16px',
    width: ({ fullWidth }) => fullWidth ? '100%' : null,
    boxSizing: 'border-box',
    color: '#647787',
    fontSize: '30px',
    letterSpacing: '3px',
    borderRadius: '10px',
    '&.multiple': {
      margin: '0 20px 0 0',
      width: '3000px',
      overflow: 'hidden',
      resize: 'none',
      height: '50px',
      fontSize: '20px',
      '&::placeholder': {
        fontSize: '20px',
        color: '#647787',
      },
    },
    '&.error': {
      '&::placeholder': {
        color: '#cc3333',
      },
    },
    '&::placeholder': {
      fontSize: '30px',
      color: '#647787',
      letterSpacing: '3px',
    },
    '&:focus': {
      outline: 'none',
    },
  },
})

const BaseInput = (props) => {
  const {
    label,
    fullWidth,
    value,
    onChange,
    onBlur,
    type = 'text',
    error,
    onKeyUp,
    multiple = false,
  } = props

  const classes = useStyle({ fullWidth, error })

  const inputProps = {
    placeholder: label,
    className: clsx(classes.input, error && 'error', multiple && 'multiple'),
    value: value,
    onChange: onChange,
    type: type,
    onBlur: onBlur,
    onKeyUp: onKeyUp,
  }

  if (multiple)
    return <textarea {...inputProps}></textarea>

  return <input {...inputProps} />
}

BaseInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  fullWidth: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  onKeyUp: PropTypes.func,
  multiple: PropTypes.bool,
}

export default BaseInput