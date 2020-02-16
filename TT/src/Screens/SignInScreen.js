import React, {useState} from 'react';
import { View, Text, Button, RefreshControl } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '1021270350335-r0lag7h4f24s3nt8j5nens5jnrtcqg1k.apps.googleusercontent.com',
    });
    

    //구글 로그인
    const _signIn = async function(navigation,setIsSigned,setUserName){//funtion이랑 =>이랑 같음
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //this.setState({ userInfo: userInfo, loggedIn: true });
        
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
           
            firestore().collection('Users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                name : userInfo.user.name,
                photoUrl : userInfo.user.photo,
                email : userInfo.user.email,
                acocunt : '',
            });

            setIsSigned(true);
            setUserName(userInfo.user.name);
            console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
            navigation.navigate('MapDrawer');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("ERR1 cancelled login flow");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                console.log("ERR2 already signined");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("ERR4 play service not available");
            } else {
                // some other error happened
                console.log(error);
                console.log(error.code);

            }
        }
    };
    //구글 로그아웃
    const signOut = async (isSigned,setIsSigned,setUserName) => {
        try {
            if(isSigned === false){
                console.log("로그인을 먼저 해주세요");
                return;
            }
            //await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await firebase.auth().signOut();
            //this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
            
            setIsSigned(false);
            setUserName('');
            console.log("로그아웃되었습니다");
        } catch (error) {
            console.error(error);
        }
    };

const sample = async () =>{
    await firestore().collection('Users').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change)=>{
            //console.log(change.doc.data().email);
        });
    });
    await firestore().collection('Users').doc("3ZbZYtLdDYQMtI2xHOBgYvPCwDk2").get().then(
        (doc)=>{//console.log("a",doc.data());
    });
    console.log("currentUser.uid ",firebase.auth().currentUser.uid);
    console.log("isSigned ",isSigned)


};
function SignInScreen({navigation}) {
    let tmp=firebase.auth().currentUser;//로그인안되있으면 null반환함
    let disname=null;
    
    if(tmp ===null){
        disname=null;
    }else{
        disname=tmp.displayName;
    }

    let [userName,setUserName]=useState(disname);
    let [isSigned,setIsSigned]=useState(userName!=null);
    
    tmp=null;
    console.log("curUserName: ",userName);
    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            {isSigned && <Text> {userName}님 환영합니다 </Text>}
            <Button 
                title="테스트용버튼(나중에 없애겠습니다)"
                onPress={sample}/>
            <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => _signIn(navigation,setIsSigned,setUserName)}
                            />
            {isSigned && <Button
                title="로그아웃"
                onPress={()=> signOut(isSigned,setIsSigned,setUserName)}
                />}
            <Button
                title="Map"
                onPress={() => navigation.navigate('MapDrawer')}
            />
        </View>
    );
}
export default SignInScreen;