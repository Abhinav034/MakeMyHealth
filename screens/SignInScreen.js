import React, {useState , useEffect} from 'react'
import firebase from 'firebase'
import {View , StyleSheet, Alert} from 'react-native'
import {Text} from 'react-native-elements'
import SignInComp from '../components/SignInComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fbInsertUserName} from '../firebase/fbCRUD'

const SignInScreen = ({navigation})=>{

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const signInButtonPressed = async()=>{
   try {
    await firebase.auth().signInWithEmailAndPassword(email , password)

    const jsonValue = JSON.stringify({email , password})
    await AsyncStorage.setItem('@storage_Key', jsonValue)

    navigation.navigate('Home')
   } catch (error) {
    Alert.alert(
        "Error",
        `${error}`
        ,
        [
          {
            text: "OK",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
   }
  } 

  useEffect(()=>{
    

     getDataFromDevice()

  },[])

  async function getDataFromDevice(){
    const data = await AsyncStorage.getItem('@storage_Key')
    const jsonValue = JSON.parse(data)
    if (jsonValue !== null){
    
      setEmail(jsonValue.email)
      setPassword(jsonValue.password)

      return
    }
   
  }

    return  <View style={styles.container}>
    <Text h3 style={styles.textStyles} >Sign in to your account</Text>
    <SignInComp

    emailValue = {email}
    passwordValue = {password}

    emailChanged = {setEmail}
    passwordChanged = {setPassword}


    buttonTitle = 'Sign In'
    signInButtonPressed = {signInButtonPressed}
    lowerButtonTitle = 'Do not have accout? Click here !'
    lowerButtonPressed={()=>navigation.navigate('RegisterScreen')}
    />
   </View>
 
}



const styles = StyleSheet.create({
    container: {
      flex: 0.9,
      justifyContent: 'center',
      margin:20
    },
    textStyles:{
      marginBottom:60,
      justifyContent:'center',
      color:"grey"

    }
  });


  SignInScreen.navigationOptions = ()=>{
      return{
        headerShown: false,
      }
  }

  export default SignInScreen