import React, { Component } from 'react';

import axios from 'axios'
import { Form, Modal, Button, Icon, Input, TextArea } from 'semantic-ui-react'

import { 
  backendUrl, 
} from './config'


class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        firstname: '',
        surname: '',
        address: '',
        description: '',
      },
      file: '',
    }
  }

  onSaveHandler = () => {

    const {formdata} = this.state
    const {handleDataLoad, handleClose} = this.props

    const data = new FormData()
    data.append('file', this.state.file)

    Object.keys(formdata).map((i) => data.append(i, formdata[i]) )


    axios.post( backendUrl, data )
    .then(res => {
      if (res.status !== 200) {
        //TODO.. doplnit validacne chyby
      }
      else {
        handleDataLoad()
        handleClose()
      }
   })
  }

  onChangeHandler = (event, input) => {
    if (event.target.files) {
      this.setState({file: event.target.files[0]})
    }
    if (input) {
      this.setState({formdata: {
          ...this.state.formdata,
          [input.name]: input.value
        }
      })
    }
  }

  render() {
    const { handleClose } = this.props
    return <React.Fragment>
      <Modal.Header>
        Pridať podnet
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Meno</label>
            <Input name='firstname' fluid placeholder='Meno' onChange={this.onChangeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Priezvisko</label>
            <Input name='surname' fluid placeholder='Priezvisko' onChange={this.onChangeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Adresa</label>
            <Input name='address' fluid placeholder='Adresa' onChange={this.onChangeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Text podnetu</label>
            <TextArea name='description' placeholder='Napíšte, čo Vás trápi...' onChange={this.onChangeHandler} />
          </Form.Field>
          <Form.Field>
            <label>Obrázok</label>
            <input type='file' name='file' onChange={this.onChangeHandler} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>
          <Icon name='close' />
          Zavrieť
        </Button>
        <Button positive onClick={this.onSaveHandler}>
          <Icon name='checkmark' />
          Uložiť podnet
        </Button>
      </Modal.Actions>
    </React.Fragment>
  }  
}

export default TaskForm;
