import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  loaderContainer: {
    width: '640px',
    height: '100vh',
    position: 'absolute',
    zIndex: '1000',
    background: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
})

const PageLoader = (props) => {
  const {
    pageLoading,
    children,
  } = props
  const classes = useStyles()
  return (
    <>
      {
        pageLoading.length ?
          <div className={classes.loaderContainer}>
            <span>Loading...</span>
          </div> :
          null
      }
      {children}
    </>
  )
}

PageLoader.propTypes = {
  pageLoading: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

const mapStateToProps = state => ({
  pageLoading: state.pageLoading
})

export default connect(
  mapStateToProps,
)(PageLoader)