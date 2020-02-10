
import React from 'react';
import { View, Text, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//지금 여기 채팅방 id가 뭐지 알아와야됨 어케하지?
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: [],
        CID:""
    };
    this.onSend = this.onSend.bind(this);
  }


//처음 방에 들어가면 이전 채팅기록 불러올때 사용
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    const curUID = firebase.auth().currentUser.uid;
    const curName = firebase.auth().currentUser.name;
    const curPhoto = firebase.auth().currentUser.photoURL;
    
    //메세지를 데이터베이스에 저장
      //create Message
      firestore().collection("Messges").add().add({
        UID : curUID,
        name : curName,
        photoUrl : curPhoto,
        message :'',
        timestamp : ''
    })

    this.setState((previousState) => {
        console.log(previousState);
        console.log("메세지",messages);
        
        return {
         messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}