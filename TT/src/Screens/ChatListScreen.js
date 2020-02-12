import React from 'react';
import { View, Text, Button } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

        //.orderBy("lastMessageTime","desc") 

//일단 채팅방 정보 가져오는거까지 했음
const getChatList = () => {
    let chatList=[];
    try {
        const curUID = firebase.auth().currentUser.uid;
        console.log("UID",curUID);
        firestore().collection("ChatList")
        .doc(curUID).collection("ChatRoom")
        .orderBy("lastMessageTime","desc") 
        .get().then(
            (snapshot) => {
                snapshot.forEach( (doc) => {                    
                    if (doc.exists) {
                        console.log("Document Data:", doc.data().CID);
                        chatList.push(doc.data().CID);
                    } else {
                        console.log("No such document!");
                    }
                })                
            })
    } catch (error) {
        console.log("Error ", error);
    }
    return chatList;
}





const ChatListScreen = ({ navigation }) => {
    var chatList=getChatList();
    //일단은 버튼 클릭시 제일 위에있는방 들어가게 해놓음 

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>채팅 리스트 화면입니다~</Text>
            <Button
                title="채팅방으로 (나중에 수정)"
                onPress={() => navigation.navigate('Chatting',{'CID':chatList[0]})}
            />
            <Button
                title="채팅방만들기(나중에 수정)"
                onPress={() => navigation.navigate('ChatCre')}
            />
            <Button title="getval(테스트용 나중에지울게요)"
                onPress={getChatList} />
        </View>
    )
}
export default ChatListScreen;