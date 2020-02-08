import React from 'react';
import { View, Text } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


function MapScreen({navigation}) {
    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <MapView style={{flex: 1, width:'100%', height:'100%'}} provider={PROVIDER_GOOGLE}/>
        </View>
    );
}
export default MapScreen;