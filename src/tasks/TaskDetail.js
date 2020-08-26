import React, { Component } from 'react';

import moment from 'moment';
import { Modal, Image, Button, Icon } from 'semantic-ui-react'

import styled from 'styled-components'

import { datetime_format } from './config'

const StyledAddress = styled.div`
  color: #aaa;
  margin-bottom: 1em;
`
const StyledDateTime = styled.div`
  color: #aaa;
  float: left;
  font-size: 0.8em;
`

const StyledImage = styled.div`
  min-width: 30%;
  margin-right: 1em; 
`

class TaskDetail extends Component {

  render() {
    const { task, handleClose } = this.props
    return <React.Fragment>
      <Modal.Header>
        {task.firstname} {task.surname}
      </Modal.Header>
      <Modal.Content image>
        <StyledImage>
          <Image src={task.image} size='medium' rounded wrapped />
        </StyledImage>
        <Modal.Description>
          <StyledAddress>Adresa: {task.address}</StyledAddress>
          <p>{task.description}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <StyledDateTime>
          Podnet vytvorený {moment(task.created_at).format(datetime_format)}
        </StyledDateTime>
        <Button onClick={handleClose}>
          <Icon name='close' />
          Zavrieť
        </Button>
      </Modal.Actions>
    </React.Fragment>
  }

}

export default TaskDetail;
