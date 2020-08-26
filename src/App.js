import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import TaskList from './tasks/TaskList'

import { Container } from 'semantic-ui-react'

class App extends Component {

  render() {
    return <Container>
      <TaskList />
    </Container>;
  }
  
}


export default App;
