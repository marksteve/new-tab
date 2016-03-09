import React from 'react'
import ReactDOM from 'react-dom'
import {Flex, Box} from 'reflexbox'
import {
  Panel,
  PanelHeader,
  Text
} from 'rebass'

const Project = ({name}, i) => {
  return (
    <Box key={i} col={3} p={2}>
      <Panel>
        <PanelHeader>{name}</PanelHeader>
      </Panel>
    </Box>
  )
}

class App extends React.Component {
  render() {
    let {projects} = this.props
    return (
      <Box p={2}>
        <Box px={2}>
          <h1>New Tab</h1>
        </Box>
        <Flex align='flex-start'>
          {projects.map(Project)}
        </Flex>
      </Box>
    )
  }
}

var testProps = {
  projects: [
    {name: "Personal"},
    {name: "Blank"},
    {name: "PythonPH"},
    {name: "Incorgito"},
  ],
}

ReactDOM.render(<App {...testProps} />, document.getElementById('app'))
