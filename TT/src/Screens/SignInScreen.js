import React from 'react';
import { View, Text, Button } from 'react-native';

function SignInScreen({navigation}) {
    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Text>로그인 화면입니다.</Text>
            <Button
                title="로그인"
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    );
}
export default SignInScreen;