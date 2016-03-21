import React from 'react'
import ReactDOM from 'react-dom'
import {combineReducers, createStore} from 'redux'
import {Provider, connect} from 'react-redux'

import * as actions from './actions'
import * as reducers from './reducers'
import {App} from './components'

const store = createStore(combineReducers(reducers))

const ConnectedApp = connect(
  (state) => state,
  (dispatch) => {
    return {
      actions: {
        toggleUI: (name, isToggled) => dispatch(actions.toggleUI(name, isToggled)),
        addGroup: (group) => dispatch(actions.addGroup(group)),
        addItem: (group, item) => dispatch(actions.addItem(group, item)),
      },
    }
  }
)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
)

