import React from 'react';
import { View, Text, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';


  /*
    constructor(props) {
        super(props);
        this.state = {
            pushData: [],
            loggedIn: false//로그인 되잇으면 true 안되잇으면 false
        }
    }*/
    
    var isSigned=false;
    
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '1021270350335-r0lag7h4f24s3nt8j5nens5jnrtcqg1k.apps.googleusercontent.com',
    });
    

    //구글 로그인
    const _signIn = async function(navigation){//funtion이랑 =>이랑 같음
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //this.setState({ userInfo: userInfo, loggedIn: true });
            isSigned=true;

            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

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
    const signOut = async () => {
        try {
            if(isSigned === false){
                console.log("로그인을 먼저 해주세요");
                return;
            }
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            //this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
            isSigned=false;
            console.log(isSigned);
            console.log("로그아웃되었습니다");
        } catch (error) {
            console.error(error);
        }
    };

function SignInScreen({navigation}) {

    return (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Button 
                title="로그인상태"
                onPress={()=>{console.log(isSigned)}}/>
            <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={() => _signIn(navigation)}
                            />
            <Button
                title="로그아웃"
                onPress={()=> signOut()}
                />
            <Button
                title="Map"
                onPress={() => navigation.navigate('MapDrawer')}
            />
        </View>
    );
}
export default SignInScreen;