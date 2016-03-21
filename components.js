import React from 'react'
import {Flex, Box} from 'reflexbox'

const Item = ({icon, name, url}, i) => {
  return (
    <div />
  )
}

const Group = ({name, items}, i) => {
  let groupItems = items[name] || []
  return (
    <Box col={3} p={2}>
      <div className="group border">
        <h2 className="m0 p2">{name}</h2>
        {groupItems.length > 0 ? (
        <div />
        ) : (
        <a
          className="inline-block p2"
          href="#"
        >
          <img className="icon-sm align-middle mr1" src="images/add.svg" />
          Add first item
        </a>
        )}
      </div>
    </Box>
  )
}

class AddGroup extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.ui.addGroup !== this.props.ui.addGroup &&
        this.props.ui.addGroup) {
      this.refs.groupName.focus()
    }
  }
  render() {
    let {ui, actions} = this.props
    return (
      <div className="absolute right-0 bottom-0 p3">
        {ui.addGroup ? (
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            className="input-md"
            name="name"
            type="text"
            placeholder="Group name"
            ref="groupName"
            onBlur={actions.toggleUI.bind(this, 'addGroup', false)}
          />
        </form>
        ) : (
        <a
          href="#"
          onClick={actions.toggleUI.bind(this, 'addGroup', true)}
        >
          <img className="icon-md align-middle mr2" src="images/add.svg" />
          Create new group
        </a>
        )}
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    let {groupName} = this.refs
    this.props.actions.addGroup(groupName.value)
    groupName.value = null
  }
}

export class App extends React.Component {
  render() {
    let {ui, groups, actions} = this.props
    let {toggleUI} = actions
    return (
      <Box p={2}>
        <Box px={2}>
          <h1>New Tab</h1>
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
