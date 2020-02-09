import React from 'react';
import { View, Text, Button } from 'react-native';

const ChatListScreen = ({navigation}) => {
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Text>채팅 리스트 화면입니다~</Text>
            <Button
                title="채팅방으로 (나중에 수정)"
                onPress={() => navigation.navigate('Chatting')}
            />
        </View>
    )
}
export default ChatListScreen;