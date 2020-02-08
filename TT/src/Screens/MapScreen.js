import React, {useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';

const client_id = "eDiVdTnGWLaOJWuEnE45";
const client_secret = "RSG1rNXCw0";

//검색결과 
var search_List;

//검색 키워드
const NaverSearch = () => {
    axios.get('https://openapi.naver.com/v1/search/local.json?display=10&start=1',{
        headers: {
            'X-Naver-Client-Id': 'eDiVdTnGWLaOJWuEnE45',
            'X-Naver-Client-Secret': 'RSG1rNXCw0'
        },
        params: {
            query: '사상',
        }
    }).then(res => {
        const nameList = res.data;
        var stringjson = JSON.stringify(nameList);
        search_List = JSON.parse(stringjson);
        for(var i=0;i<10;i++){
            // console.log(search_List.items[i]['name']);
            console.log(search_List.items[i]['title']);
        }
        //console.log(search_List);
    }).catch(error => {
        console.log(error);
    })
}

function MapScreen({navigation}) {
    const [keyWord, inputKeyWord] = useState('목적지 검색');
    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1, flexDirection: 'row'}}>
            <MapView style={{flex: 1, width:'100%', height:'100%', justifyContent:'space-around', flexDirection: 'row'}} provider={PROVIDER_GOOGLE}>
                <TextInput 
                    style={{borderWidth:1, width:200, height: 40, alignSelf: 'auto'}}
                    onChangeText={text => inputKeyWord(text)}
                    value = {keyWord}
                />
                <Button
                    style={{alignSelf: 'auto'}}
                    title="검색"
                    onPress={NaverSearch}
                />
            </MapView>
        </View>
    );
}
export default MapScreen;