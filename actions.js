export function toggleUI(name, isToggled) {
  return {
    type: 'TOGGLE_UI',
    name,
    isToggled,
  }
}

export function addGroup(group) {
  return {
    type: 'ADD_GROUP',
    group,
  }
}

export function addItem(group, item) {
  return {
    type: 'ADD_ITEM',
    group,
    item,
  }
}

