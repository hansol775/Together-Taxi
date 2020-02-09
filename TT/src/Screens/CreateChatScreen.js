import React, {useState} from 'react';
import { View, Text, Button,TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//계속해서 정보가 쌓여야되는데 그게안됨 배열로 바꿔야하나...
//여기서 만들기 누르면 해당 채팅방으로 넘어가야되는데 안넘어감 ㅠ

//여기에서 채팅관련된 DB들 틀 만들어놓음
const createRoom = async (keyWord,{navigation}) => {
    const curUID=firebase.auth().currentUser.uid;
    const curName=firebase.auth().currentUser.name;
    const curPhoto=firebase.auth().currentUser.photoURL;
  


    //create Messages
    firestore().collection("Messages").add({
    }).then( (ref) => {    
        //create ChatList      
        firestore().collection("ChatList").doc(curUID).set({
            info:{
                lastMessage : '',
                photoUrl : curPhoto,
                CID : ref.id,
                departure : [0,0],
                destination : [0,0],
                time : [0,0]
            }
        });
         //create ChatUsers
        return firestore().collection("ChatUsers").doc(ref.id).set({
            user:curUID
        },{merge : true });
    });
    console.log("완료");
    navigation.navigate('Chatting')
};


function CreateChatScreen({navigation}){
    const [keyWord, inputKeyWord] = useState('방제목');
    return(
        <View>
            <TextInput
                    style={{borderWidth:1, width: 100, height: 40}}
                    onChangeText={text => inputKeyWord(text)}
                    value={keyWord}
            />
            <Button
                onPress={()=>{createRoom(keyWord,navigation)}}
                title="만들기"
            />




        </View>
    )
};
export default CreateChatScreen;