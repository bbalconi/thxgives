import React, { Component } from 'react';
import logo from './logo.svg';
import openSocket from 'socket.io-client';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import './App.css';
var axios = require('axios')


class App extends Component {
  constructor(){
    super()
    this.nameChange = this.nameChange.bind(this)
    this.thanksChange = this.thanksChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      name: '',
      thanks: '',
    }
  }

  nameChange(event){
    this.setState({
      name: event.target.value
    })
  }

  thanksChange(event){
    this.setState({
      thanks: event.target.value
    })
  }

  handleClick(){
    this.socket.emit('/messageSend', {
      name: this.state.name,
      thanks: this.state.thanks
  })
}

  componentDidMount(){
    axios.post('/socketUrl').then((res) => {
      var socketUrl = res.data;
      this.socket = openSocket(socketUrl)
      console.log(this.socket)
      this.socket.emit('thanksConnect')
  })
}

  render() {
    console.log(this.state)
    return (
      <div className='bg'>
         <Input placeholder='Enter your name...' className='lol' onChange={this.nameChange}/>
         <Input placeholder="Enter what you're thankful for..." onChange={this.thanksChange}/>
         <Button className='thisbutton' color="warning" onClick={this.handleClick}>Give Thanks!</Button>
      </div>
    );
  }
}

export default App;
