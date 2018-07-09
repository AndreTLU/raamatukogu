import React from 'react'
import { render } from 'react-dom'
import { Route, Switch, BrowserRouter, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'

import HomeContainer from './containers/HomeContainer'

import store from './store'

render (
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path='/' restrict component={HomeContainer} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#main')
)