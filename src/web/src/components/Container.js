import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { BaseButton } from './button'
import { useDidMount } from './hook'

import { UserAction } from '../Redux/Action'
import { createLoadingSelector } from '../Redux/Selector'

const useStyle = makeStyles({
  rootContainer: {
    margin: '39px 17px 0 20px',
  },
  titleContainer: {
    marginBottom: '33px',
    textAlign: 'center',
    fontSize: '30px',
    color: "#333",
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    left: '81%',
  },
  divider: {
    border: '1px solid #ccd6dd',
  },
})

const Container = (props) => {
  const {
    children,
    dispatch,
    isLogoutLoading,
    history
  } = props

  const classes = useStyle()

  const handleOnClickLogout = () => dispatch(UserAction.userLogout())

  useDidMount(() => {
    if (!isLogoutLoading) {
      history.replace('/')
      window.location.reload()
    }
  }, [isLogoutLoading])

  return (
    <div className={classes.rootContainer}>
      <div className={classes.titleContainer}>
        <span>Chat app</span>
        {
          history.location.pathname === '/chat' ?
            <div className={classes.buttonContainer}>
              <BaseButton
                onClick={handleOnClickLogout}
                size='small'
                variant='secondary'
              >Log out</BaseButton>
            </div> :
            null
        }
      </div>
      <div>
        <hr className={classes.divider} />
      </div>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  dispatch: PropTypes.func.isRequired,
  isLogoutLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
}

const userLogoutLoadingSelector = createLoadingSelector(['USER_LOGOUT'])

const mapStateToProps = (state) => ({
  isLogoutLoading: userLogoutLoadingSelector(state),
})

export default withRouter(
  connect(
    mapStateToProps,
  )(Container)
)