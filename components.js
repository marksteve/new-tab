import React from 'react'
import {Flex, Box} from 'reflexbox'
import marked from 'marked'

const ButtonIcon = ({image, size}) => {
  return (
    <img
      className={`icon-${size} align-middle mr1`}
      src={`images/${image}.svg`}
    />
  )
}

class List extends React.Component {
  render() {
    let {ui, actions, index, name, content} = this.props
    let editKey = `editList:${index}`
    let html = emojione.toImage(marked(content || ''))
    let editToggled = ui[editKey]
    return (
      <Box col={3} p={2}>
        <div className="list relative">
          {editToggled ? (
          <div>
            <input
              className="input-md col-12 mb1"
              type="text"
              onChange={this.onChange.bind(this, 'name')}
              value={name}
            />
            <textarea
              className="col-12"
              rows="10"
              onChange={this.onChange.bind(this, 'content')}
              value={content}
            />
          </div>
          ) : (
          <div className="list-content">
            <h2 className="h3 mt0">{name}</h2>
            <div
              className="markdown"
              dangerouslySetInnerHTML={{__html: html}}
            />
          </div>
          )}
          <button
            className="mt2"
            onClick={actions.toggleUI.bind(this, editKey, !editToggled)}
          >
            <ButtonIcon
              image={editToggled ? "done" : "edit"}
              size="sm"
            />
            {editToggled ? 'Done editing' : 'Edit list'}
          </button>
        </div>
      </Box>
    )
  }
  onChange(attr, e) {
    let {actions, index} = this.props
    actions.editList(index, {[attr]: e.target.value})
  }
}

class AddList extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.ui.addList !== this.props.ui.addList &&
        this.props.ui.addList) {
      this.refs.form.name.focus()
    }
  }
  render() {
    let {ui, actions} = this.props
    return (
      <div className="absolute right-0 bottom-0 p3">
        {ui.addList ? (
        <form ref="form" onSubmit={this.onSubmit.bind(this)}>
          <input
            className="input-md"
            name="name"
            type="text"
            placeholder="List name"
            onBlur={actions.toggleUI.bind(this, 'addList', false)}
          />
        </form>
        ) : (
        <button
          className="input-md"
          onClick={actions.toggleUI.bind(this, 'addList', true)}
        >
          <ButtonIcon image="add" size="md" />
          Create new list
        </button>
        )}
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    let {actions} = this.props
    let {form} = this.refs
    actions.addList({name: form.name.value})
    form.name.value = null
  }
}

export class App extends React.Component {
  render() {
    let {ui, lists, actions} = this.props
    let {toggleUI} = actions
    return (
      <Box p={2}>
        <Box px={2}>
          <h1 className="caps m0">New Tab</h1>
        </Box>
        <Flex align='flex-start'>
          {lists.map((props, i) => (
            <List key={i} index={i} {...this.props} {...props} />
          ))}
        </Flex>
        <AddList {...this.props} />
      </Box>
    )
  }
}
