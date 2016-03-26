export function ui(state={}, action) {
  switch (action.type) {
  case 'TOGGLE_UI':
    return {
      ...state,
      [action.name]: action.isToggled,
    }
  default:
    return state
  }
}

export function groups(state=[], action) {
  switch (action.type) {
  case 'ADD_GROUP':
    if (~state.indexOf(action.group)) {
      return state
    }
    return state.concat(action.group)
  default:
    return state
  }
}

export function items(state={}, action) {
  switch (action.type) {
  case 'ADD_ITEM':
    let groupItems = state[action.group] || []
    return {
      ...state,
      [action.group]: groupItems.concat(action.item),
    }
  }
  return state
}
