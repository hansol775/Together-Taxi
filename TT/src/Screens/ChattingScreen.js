import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




const user = {
  _id: firebase.auth().currentUser.uid,
  name: firebase.auth().currentUser.displayName,
  avatar: firebase.auth().currentUser.photoURL,
}

//상대가 메세지 보내면 render업데이트 되는지 확인해야됨
export default class Chatting extends Component {
  constructor(props) {
    super(props);
    const { route } = props;
    //this.state.CID=route.params.CID;
    this.state = {
      CID: route.params.CID,
      messages: [],
      UID: firebase.auth().currentUser.uid,
    }
  }



  componentDidMount() {
    this.on(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    });
  }


  //--------------------------------------------------
  uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  ref() {
    return firestore()
      .collection('Messages')
      .doc(this.state.CID)
      .collection("chats");
  }

  parse = snapshot => {
    let mes = [];
    snapshot.docChanges().forEach((change)=>{
      console.log("uid:",change.doc.data().UID);
      mes.push({
        _id: change.doc.data().UID,
        text: change.doc.data().message,
        createdAt: change.doc.data().timestamp,
        user: {
          _id: change.doc.data().UID,
          name: change.doc.data().name,
          avatar: change.doc.data().photoUrl,
        },
      });
    });
    return mes;
  };

  on = callback =>{
    this.ref()
      .orderBy('timestamp', 'desc')
      .limit(20)
      .onSnapshot( snapshot => callback(this.parse(snapshot)));
  }


  // send the message to the Backend
  //정보를 받아와 파이어스토어에 저장함
  sendMessage = (message) => {
    return firestore()
    .collection('Messages')
    .doc(this.state.CID)
    .collection('chats')
    .add(message);
  }
  updateLastMessage = (message) =>{
    return firestore()
    .collection('ChatList')
    .doc(this.state.UID)
    .collection("ChatRoom")
    .doc(this.state.CID)
    .update({
      lastMessage : this.state.messages[0].text,
      lastMessageTime : message.timestamp,
    });
  }

  send = (messages = []) => {
    
    
    messages.forEach((doc) => {
      const message = {
        UID: this.state.UID,
        message: doc.text,
        name: doc.user.name,
        photoUrl: doc.user.avatar,
        timestamp: new Date().getTime(),
      };
      //Messages DB에 추가
      this.sendMessage(message);

      //ChatList DB의 LastMessage업데이트
      this.updateLastMessage(message);
    })
  };

  render() {
    console.log("state CID", this.state.CID);
    console.log("state UID", this.state.UID);
    



    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={user}
      />
    );
  }
}