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

export function lists(state=[], action) {
  switch (action.type) {
  case 'ADD_LIST':
    return state.concat(action.list)
  case 'EDIT_LIST':
    return state.map(function(list, i) {
      if (i !== action.index) {
        return list
      } else {
        return {
          ...list,
          ...action.list,
        }
      }
    })
  default:
    return state
  }
}
