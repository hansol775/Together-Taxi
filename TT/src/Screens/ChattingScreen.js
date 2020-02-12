import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



//상대가 메세지 보내면 render업데이트 되는지 확인해야됨
export default class Chatting extends Component {
  

  state = {
    CID: '',
    messages: [],
    UID : firebase.auth().currentUser.uid,
  }

  receiveChatData = ()=>{
    //여기줄에 CID를 가져오는걸 추가해야됨
    //일단 임시로 DB에있는거 가져와 state에 넣어둠

    //파이어스토어에서 내림차순으로 메세지 가져와 state.messages에 넣음
    firestore().collection("Messages")
    .doc(this.state.CID)
    .collection('chats')
    .orderBy('timestamp','desc')
    .get()
    .then(snapshot => {
      let mes=[];
      snapshot.forEach(doc =>{
        //console.log(doc.id,'=>', doc.data());
        
        let uid=1;
        if(this.state.UID != doc.data().UID){
          uid = this.state.UID;
        }

        mes.push({
          _id: doc.data().UID,
            text: doc.data().message,
            createdAt: doc.data().timestamp,
            user: {
              _id: uid,
              name: doc.data().name,
              avatar: doc.data().photoUrl,
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
    const {route, navigation} = this.props;
    this.state.CID=route.params.CID;
    this.receiveChatData();
  }

 
  //유저가 전송한 메세지를 파이어베이스에 저장하기 위해 정보를받아옴
  getChatInfo = ()=>{
    const curUID = firebase.auth().currentUser.uid;
    const curName = firebase.auth().currentUser.displayName;
    const curPhoto = firebase.auth().currentUser.photoURL;
    let timestamp = new Date().getTime();
    return {
      UID : curUID,
      name : curName,
      photoUrl : curPhoto,
      message : this.state.messages[0].text,
      timestamp : timestamp,
    };
  }

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


  async onSend(messages = []) {
    
    console.log("메세지",messages);

    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    const message=this.getChatInfo();

    //Messages DB에 추가
    this.sendMessage(message);

    //ChatList DB의 LastMessage업데이트
    this.updateLastMessage(message);

    
  }


  render() {
    console.log("state CID",this.state.CID);
    
    

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