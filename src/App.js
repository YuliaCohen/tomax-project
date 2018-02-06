import React, { Component } from 'react';
import './App.css';
import User from './User/User';
import Board from './Board/Board';
import { Draggable, Droppable } from 'react-drag-and-drop'
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import html2canvas from 'html2canvas';

import axios from 'axios';

class App extends Component {

  state = {
    users : [],
    droppedUsers :[] 
  }
  
  componentDidMount (){
    axios.get('http://www.mocky.io/v2/59bd9a773c00001303529fe0')
      .then(response => {
        this.setState({users: response.data.users });        
      });
  }

  takeBoardPicture = () =>{
    html2canvas(document.getElementById('board'), {
            logging: true,
            profile: true,
            useCORS: true}).then(function(canvas) {
        var data = canvas.toDataURL('image/jpeg', 0.9);
        var src = encodeURI(data);
        var a = document.createElement("a");
        a.download = "board.png";
        a.href =  data;
        a.click();
    });
  }

  render() {
    const users = this.state.users.map(user => {
      return <User 
      key = {user.user} 
      name = {user.name}
      code = {user.user}
      img = {user.picture}/>;
    });

    
    const board = <Board droppedUsers = {this.state.droppedUsers.map(user => {return user; } ) || ''} />
 
    return (
      <div className="App">
            <div className="userGround">
              <section className="usersBox">
                  {users}                
              </section>
              <Droppable
                  types={['user']} 
                  onDrop={this.onDrop.bind(this)} id="boarDroppable">
                  {board}
              </Droppable>
              <div className="btnHold">
                <a className="picDownload"  onClick={this.takeBoardPicture}> Download </a>
              </div>
            </div>   
      </div>
    );
  }
  onDrop(dataUser) {      
      var usersArr = this.state.users;
      var userDroppedArr = this.state.droppedUsers;
      var userDrugged = parseInt(dataUser.user);

      for (let u in usersArr){
        if (usersArr[u].user === userDrugged ){
           var param = u;
           var userMoved = usersArr[u]
        }
      }

      userDroppedArr.push(userMoved);
      usersArr.splice(param, 1);

      this.setState({ users: usersArr});
      this.setState({ droppedUsers: userDroppedArr});

  }
}

export default App;
