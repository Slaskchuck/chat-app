import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useDidMount } from './hook'

import { UserAction } from '../Redux/Action'
import { createErrorMessageSelector, createLoadingSelector } from '../Redux/Selector'

import { AuthStorage } from '../Utils'

const AuthChecker = (props) => {
  const {
    children,
    dispatch,
    tokenError,
    isTokenLoading,
    history
  } = props

  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const token = AuthStorage.token.get()

    if (token)
      dispatch(UserAction.userToken({ isPageRequest: true }))
    else {
      if (history.location.pathname !== '/')
        history.replace('/')

      setHasAccess(true)
    }

  // eslint-disable-next-line
  }, [])

  useDidMount(() => {
    if (!isTokenLoading && tokenError !== '') {
      AuthStorage.removeAll()
      history.replace('/')
    } else {
      if (history.location.pathname === '/')
        history.replace('/chat')
      setHasAccess(true)
    }
  }, [tokenError, isTokenLoading])

  return (
    <>
      {hasAccess ? children : <></>}
    </>
  )
}

AuthChecker.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  dispatch: PropTypes.func.isRequired,
  tokenError: PropTypes.string.isRequired,
  isTokenLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
}

const userTokenErrorSelector = createErrorMessageSelector(['USER_TOKEN'])
const userTokenLoadingSelector = createLoadingSelector(['USER_TOKEN'])

const mapStateToProps = (state) => ({
  tokenError: userTokenErrorSelector(state),
  isTokenLoading: userTokenLoadingSelector(state),
})

export default withRouter(
  connect(
    mapStateToProps,
  )(AuthChecker)
)