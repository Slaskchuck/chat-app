import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Provider } from 'react-redux'

import { Container, AuthChecker, PageLoader } from './components'

import { routes } from './routes'

import createStore from './Redux/Store'

const globalStyle = makeStyles({
  '@global': {
    'body': {
      margin: 0,
      fontFamily: 'Arial',
    },
  },
})

const useStyle = makeStyles({
  rootContainer: {
    background: 'grey',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
  mainContainer: {
    width: '640px',
    height: '100%',
    background: 'white'
  },
})

const store = createStore()

function App() {
  globalStyle()
  const classes = useStyle()

  return (
    <Provider store={store}>
      <div className={classes.rootContainer}>
        <div className={classes.mainContainer}>
          <BrowserRouter>
            <Switch>
              <AuthChecker>
                <PageLoader>
                  <Container>
                    {
                      routes.map(route => <Route {...route} />)
                    }
                  </Container>
                </PageLoader>
              </AuthChecker>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  )
}

export default App
