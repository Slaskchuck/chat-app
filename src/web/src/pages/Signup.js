import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { BaseInput } from '../components/input'
import { BaseButton } from '../components/button'
import { useDidMount } from '../components/hook'

import { createLoadingSelector, createErrorMessageSelector } from '../Redux/Selector'
import { UserAction } from '../Redux/Action'

const useStyle = makeStyles({
  userContainer: {
    margin: '47px 0 0 0',
  },
  passwordContainer: {
    margin: '27px 0 0 0',
  },
  buttonContainer: {
    margin: '27px 0 0 0'
  },
  policyContainer: {
    color: '#647787',
    margin: '41px 0 0 0',
    '& > span': {
      letterSpacing: '3px',
      lineHeight: '36px',
    },
  },
  errorContainer: {
    background: '#c81b1bc9',
    padding: '24px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '24px 0 0 0',
  },
})

const Signup = (props) => {
  const {
    isLoginLoading,
    userLoginError,
    dispatch,
  } = props

  const [form, setForm] = useState({
    username: '',
    password: '',
    valid: false,
    error: {
      username: false,
      password: false,
    }
  })
  const classes = useStyle()
  const history = useHistory()

  const handleOnKeyUp = (event) => {
    if (event.keyCode === 13) {
      if (form.error.username && form.error.password)
        return

      dispatch(UserAction.userLogin(form))

      return setForm({
        ...form,
        valid: true,
      })
    }

    setForm({
      ...form,
      valid: !!form.password && !!form.username,
    })
  }

  const handleOnChangeForm = (name) => (event) => {
    setForm({
      ...form,
      [name]: event.target.value,
      error: {
        ...form.error,
        [name]: !event.target.value,
      }
    })
  }

  const handleOnBlurForm = (name) => () => {
    let error = {
      ...form.error,
      [name]: false
    }

    if (!form[name]) error = {
      ...error,
      [name]: true,
    }

    setForm({
      ...form,
      valid: !error.username && !error.password,
      error,
    })
  }

  const handleOnClickSignin = () => {
    dispatch(UserAction.userLogin(form))
  }

  useDidMount(() => {
    if (!isLoginLoading && userLoginError === '' && form.valid) {
      dispatch(UserAction.userToken({ isPageRequest: true }))
      history.replace('/chat')
    }
  }, [isLoginLoading, userLoginError])

  return (
    <>
      {
        userLoginError !== '' &&
        <div className={classes.errorContainer}>
          <span>{userLoginError}</span>
        </div>
      }
      <div className={classes.userContainer}>
        <BaseInput
          label={form.error.username ? 'Please enter a valid value' : "User name"}
          fullWidth
          error={form.error.username}
          value={form.username}
          onChange={handleOnChangeForm('username')}
          onBlur={handleOnBlurForm('username')}
          onKeyUp={handleOnKeyUp}
        />
      </div>
      <div className={classes.passwordContainer}>
        <BaseInput
          label={form.error.password ? 'Please enter a valid value' : "password"}
          fullWidth
          value={form.password}
          onChange={handleOnChangeForm('password')}
          type="password"
          error={form.error.password}
          onBlur={handleOnBlurForm('password')}
          onKeyUp={handleOnKeyUp}
        />
      </div>
      <div className={classes.buttonContainer}>
        <BaseButton
          onClick={handleOnClickSignin}
          disabled={!form.valid}
        >
          Sign up / Log in
        </BaseButton>
      </div>
      <div className={classes.policyContainer}>
        <span>
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use. Others will be able to find you by searching your email
          address or phone number when provided
        </span>
      </div>
    </>
  )
}

const userLoginLoadingSelector = createLoadingSelector(['USER_LOGIN'])
const userLoginErrorSelector = createErrorMessageSelector(['USER_LOGIN'])

const mapStateToProps = (state) => ({
  isLoginLoading: userLoginLoadingSelector(state),
  userLoginError: userLoginErrorSelector(state)
})

Signup.propTypes = {
  isLoginLoading: PropTypes.bool.isRequired,
  userLoginError: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
)(Signup)