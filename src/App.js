import React, { Component, Suspense } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import './App.scss'

const Home = React.lazy(() => import('./views/Home.js'))
const NotFound = React.lazy(() => import('./views/404.js'))

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <Suspense fallback={<div className="bg-fallback">Loading....</div>}>
          <Switch>
            <Route
              exact
              path="/"
              name="Home"
              render={(props) => <Home {...props} />}
            />
            <Route
              render={(props) => <NotFound {...props} />}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
