import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignInScreen from '../Screens/SignInScreen';
import MapScreen from '../Screens/MapScreen';
import ChatListScreen from '../Screens/ChatListScreen';
import ChattingScreen from '../Screens/ChattingScreen';

const ChatStack = createStackNavigator();

function ChattingStack() {
    return(
        <ChatStack.Navigator>
            <ChatStack.Screen name="ChatList" component={ChatListScreen}/>
            <ChatStack.Screen name="Chatting" component={ChattingScreen}/>
        </ChatStack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

//지도 화면의 좌측에서 등장하는 Drawer Navigation 입니다.
function MapDrawer() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Map" component={MapScreen} />
            <Drawer.Screen name="Chat" component={ChattingStack} />
        </Drawer.Navigator>
    );
}

const Stack = createStackNavigator();

//로그인 화면에서 로그인 버튼을 누를 시 지도 화면으로 이동하는 네비게이션입니다.
function SignInNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="MapDrawer" component={MapDrawer} />
        </Stack.Navigator>
    );
}

export default SignInNavigator;