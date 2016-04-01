export function toggleUI(name, isToggled) {
  return {
    type: 'TOGGLE_UI',
    name,
    isToggled,
  }
}

export function addList(list) {
  return {
    type: 'ADD_LIST',
    list,
  }
}

export function editList(index, list) {
  return {
    type: 'EDIT_LIST',
    index,
    list,
  }
}

