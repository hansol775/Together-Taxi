import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../Screens/SignInScreen';
import MapScreen from '../Screens/MapScreen';

const Stack = createStackNavigator();

function SignInNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
    );
}
export default SignInNavigator;