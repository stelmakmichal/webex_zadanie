import React, { Component } from 'react';

import { Image, Container, Table, Button, Icon, Modal } from 'semantic-ui-react'

import { 
  backendUrl, 
} from './config'

import TaskDetail from './TaskDetail'
import TaskForm from './TaskForm'

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      handleModalForm: false,
      handleViewModal: false,
      handleModalData: {},
    };
  }

  handleDataLoad = () => {
    fetch( backendUrl )
    .then(response => response.json())
    .then(data => {
      this.setState({tasks: data.response})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  componentDidMount() {
    this.handleDataLoad()
  }
 
  showFormInModal = () => {
    this.setState({handleViewModal: true, handleModalForm: true})
  }

  showDetailInModal = (item) => {
    this.setState({handleViewModal: true, handleModalData: item})
  }

  hideModal = () => {
    this.setState({handleViewModal: false, handleModalForm: false, handleModalData: {} })
  }


  writeTableRow = (item, key) => {
    return <Table.Row 
      key={key}
      onClick={this.showDetailInModal.bind(this, item)}
    >
      <Table.Cell>
        <Image src={item.image} size='tiny' rounded />
      </Table.Cell>
      <Table.Cell>
        {item.firstname}
      </Table.Cell>
      <Table.Cell>
        {item.surname}
      </Table.Cell>
      <Table.Cell>
        {item.address}
      </Table.Cell>
    </Table.Row>
  }

  render() {
    const { tasks, handleViewModal, handleModalForm, handleModalData } = this.state

    console.log(this.state)

    /**
     * Button pre pridanie zaznamu
     */
    const button = <Button icon labelPosition='left' onClick={this.showFormInModal}>
      <Icon name='plus' />
      Pridať podnet
    </Button>

    /**
     * Zoznam taskov
     */
    return <Container fluid>
      <Modal
        onClose={() => this.hideModal()}
        open={handleViewModal}
        trigger={button}
      >
        {(handleModalForm === true) 
          ? <TaskForm handleClose={this.hideModal} handleDataLoad={this.handleDataLoad} /> 
          : <TaskDetail task={handleModalData} handleClose={this.hideModal} /> 
        }
      </Modal>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Obrázok</Table.HeaderCell>
            <Table.HeaderCell>Meno</Table.HeaderCell>
            <Table.HeaderCell>Priezvisko</Table.HeaderCell>
            <Table.HeaderCell>Adresa</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.length > 0 && Object.keys(tasks).map(i => this.writeTableRow(tasks[i], i))}
        </Table.Body>
      </Table>
    </Container>
  }
  
}

export default TaskList;
