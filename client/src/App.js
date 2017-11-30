import React, { Component } from 'react';
import logo from './logo.svg';
import openSocket from 'socket.io-client';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import './App.css';
var axios = require('axios')


class App extends Component {
  constructor(){
    super()
    this.thanksChange = this.thanksChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this._handleKeyPress = this._handleKeyPress.bind(this)
    this.state = {
      thanks: '',
    }
  }


  thanksChange(event){
    this.setState({
      thanks: event.target.value
    })
  }

  _handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleClick(this.state.name, this.state.thanks);
    }
  }

  handleClick(){
    this.socket.emit('/messageSend', {
      thanks: this.state.thanks
  })
    this.setState({
      thanks: ''
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
         <Input className='lol' placeholder="secret message goes here..." value={this.state.thanks} onKeyPress={this._handleKeyPress} onChange={this.thanksChange}/>
         <Button className='thisbutton' color="warning" onClick={this.handleClick}>SEND TOP SECRET MESSAGEZ</Button>
      </div>
    );
  }
}

export default App;
