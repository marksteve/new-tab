import React from 'react'
import ReactDOM from 'react-dom'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'
import storage from 'localforage'

import * as actions from './actions'
import * as reducers from './reducers'
import {App} from './components'

const storageSyncer = store => next => action => {
  let result = next(action)
  storage.setItem('state', store.getState())
  return result
}

const ConnectedApp = connect(
  (state) => state,
  (dispatch) => {
    return {
      actions: {
        toggleUI: (name, isToggled) => dispatch(actions.toggleUI(name, isToggled)),
        addList: (list) => dispatch(actions.addList(list)),
        editList: (index, list) => dispatch(actions.editList(index, list)),
      },
    }
  }
)(App)

storage.getItem('state', (err, initialState) => {
  const store = createStore(
    combineReducers(reducers),
    initialState || {
      ui: {},
      lists: [],
    },
    applyMiddleware(storageSyncer)
  )

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('app')
  )

})
