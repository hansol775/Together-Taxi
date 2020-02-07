import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInNavigator from './src/Navigator/SignInNavigator';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignInNav" component={SignInNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;