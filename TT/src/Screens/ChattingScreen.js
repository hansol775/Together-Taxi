import React from 'react';
import { View, Text, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



//지금 여기 채팅방 id가 뭐지 알아와야됨 어케하지? =>리덕스 써서 state로 관리하면될듯
export default class Example extends React.Component {
  state = {
    CID:"E85N4Eb9l3jgabQbJGHd",
    messages: [],    
  }
  
  receiveChatData = ()=>{
    //여기줄에 CID를 가져오는걸 추가해야됨
    //일단 임시로 DB에있는거 가져와 state에 넣어둠

    //파이어스토어에서 내림차순으로 메세지 가져와 state.messages에 넣음
    firestore().collection("Messages")
    .doc("E85N4Eb9l3jgabQbJGHd")
    .collection('chats')
    .orderBy('createdAt','desc')
    .get()
    .then(snapshot => {
      let mes=[];
      const curUID=firebase.auth().currentUser.uid;
      snapshot.forEach(doc =>{
        //console.log(doc.id,'=>', doc.data());
        
        let uid=1;
        if(curUID != doc.data()._id){
          uid = curUID;
        }

        mes.push({
          _id: doc.data()._id,
            text: doc.data().text,
            createdAt: doc.data().createdAt,
            user: {
              _id: uid,
              name: doc.data().user.name,
              avatar: doc.data().user.avatar,
            },
        });
      });
      //모운 배열들을 state.messages에 저장함
      this.setState({
        messages : mes
      })
    });
  }

  componentDidMount() {
    
    this.receiveChatData();
  }

  //유저가 전송한 메세지를 파이어베이스에 저장하기 위해 정보를받아옴
  getChatInfo = ()=>{
    const curUID = firebase.auth().currentUser.uid;
    const curName = firebase.auth().currentUser.displayName;
    const curPhoto = firebase.auth().currentUser.photoURL;
    let timestamp = new Date().getTime();
    return {
      _id : curUID,
      text : this.state.messages[0].text,
      createdAt : timestamp,
      user:{
        _id : 1,
        name : curName,
        avatar : curPhoto,
      }
    };
  }

  //정보를 받아와 파이어스토어에 저장함
  sendMessage = (CID,message) => {
    return firestore()
    .collection('Messages')
    .doc(CID)
    .collection('chats')
    .add(message);
  }


  async onSend(messages = []) {
    
    console.log("메세지",messages);

    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    //DB에 추가
    this.sendMessage(this.state.CID,this.getChatInfo());
    
  }


  render() {
    //console.log(this.state.messages);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1, // sent messages should have same user._id
        }}
      />
    );
  }
}