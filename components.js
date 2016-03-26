import React from 'react'
import {Flex, Box} from 'reflexbox'

const ButtonIcon = ({image, size}) => {
  return (
    <img
      className={`icon-${size} align-middle mr1`}
      src={`images/${image}.svg`}
    />
  )
}

const Item = ({name, url}, i) => {
  return (
    <div className="px2 pt2">
      <a href={url} target="_blank">
        {name}
      </a>
    </div>
  )
}

class AddItem extends React.Component {
  componentDidUpdate(prevProps) {
    let {name, ui} = this.props
    let uiKey = `addItem.${name}`
    if (prevProps.ui[uiKey] !== ui[uiKey] && ui[uiKey]) {
      this.refs.form.name.focus()
    }
  }
  render() {
    let {name, ui, actions} = this.props
    let uiKey = `addItem.${name}`
    return (
      <div className="p2">
      {ui[uiKey] ? (
        <form ref="form" onSubmit={this.onSubmit.bind(this)}>
          <input
            className="input-md border-box col-12 mb2"
            name="name"
            type="text"
            placeholder="Item name"
          />
          <input
            className="input-md border-box col-12 mb2"
            name="url"
            type="text"
            placeholder="Item url"
          />
          <div className="flex">
            <button
              className="input-sm border-box col-6"
              type="submit"
            >
              <ButtonIcon image="add" size="sm" />
              Add item
            </button>
            <button
              className="input-sm border-box col-6"
              type="button"
              onClick={actions.toggleUI.bind(this, uiKey, false)}
            >
              <ButtonIcon image="done" size="sm" />
              Done
            </button>
          </div>
        </form>
      ) : (
        <button
          className="input-sm border-box col-12"
          onClick={actions.toggleUI.bind(this, uiKey, true)}
        >
          <ButtonIcon image="add" size="sm" />
          Add an item
        </button>
      )}
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    let {name, actions} = this.props
    let {form} = this.refs
    actions.addItem(name, {
      name: form.name.value,
      url: form.url.value,
    })
    form.name.value = null
    form.name.focus()
    form.url.value = null
  }
}

const Group = (props, i) => {
  let {name, items} = props
  let groupItems = items[name] || []
  return (
    <Box col={3} p={2}>
      <div className="group">
        <h2 className="h4 m0 p2">{name}</h2>
        {groupItems.map((item, i) => (
          <Item key={i} {...item} />
        ))}
        <AddItem {...props} />
      </div>
    </Box>
  )
}

class AddGroup extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.ui.addGroup !== this.props.ui.addGroup &&
        this.props.ui.addGroup) {
      this.refs.form.name.focus()
    }
  }
  render() {
    let {ui, actions} = this.props
    return (
      <div className="absolute right-0 bottom-0 p3">
        {ui.addGroup ? (
        <form ref="form" onSubmit={this.onSubmit.bind(this)}>
          <input
            className="input-md"
            name="name"
            type="text"
            placeholder="Group name"
            onBlur={actions.toggleUI.bind(this, 'addGroup', false)}
          />
        </form>
        ) : (
        <button
          className="input-md"
          onClick={actions.toggleUI.bind(this, 'addGroup', true)}
        >
          <ButtonIcon image="add" size="md" />
          Create new group
        </button>
        )}
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    let {actions} = this.props
    let {form} = this.refs
    actions.addGroup(form.name.value)
    form.name.value = null
  }
}

export class App extends React.Component {
  render() {
    let {ui, groups, actions} = this.props
    let {toggleUI} = actions
    return (
      <Box p={2}>
        <Box px={2}>
          <h1 className="m0">New Tab</h1>
        </Box>
        <Flex align='flex-start'>
          {groups.map((name, i) => (
            <Group key={i} name={name} {...this.props} />
          ))}
        </Flex>
        <AddGroup {...this.props} />
      </Box>
    )
  }
}
