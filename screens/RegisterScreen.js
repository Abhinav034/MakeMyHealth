import React, { useState } from 'react'
import firebase from 'firebase'
import {View , StyleSheet , Alert} from 'react-native'
import {Text , Input} from 'react-native-elements'
import SignInComp from '../components/SignInComponent'
import {fbInsertUserName} from '../firebase/fbCRUD'

const RegisterScreen = ({navigation})=>{

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  

  const registerButtonPressed = async ()=>{
    try {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        fbInsertUserName({name})

        Alert.alert(
            "Account created",
            `Please login to your account`
            ,
            [
              {
                text: "OK",
                onPress: () => navigation.navigate('SignInScreen'),
              },
            ],
            { cancelable: false }
        )
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
        )
    }
  }

    return  <View style={styles.container}>
    <Text h3 style={styles.textStyles} >Register for an account</Text>
    <Input placeholder='Your Name' value = {name} onChangeText={setName}/>
    <SignInComp
    emailValue = {email}
    passwordValue = {password}

    emailChanged = {setEmail}
    passwordChanged = {setPassword}


    buttonTitle = 'Register'
    signInButtonPressed = {registerButtonPressed}
    lowerButtonTitle = 'Already have an account? Click here !'
    lowerButtonPressed={()=>navigation.navigate('SignInScreen')}
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


  RegisterScreen.navigationOptions = ()=>{
      return{
        headerShown: false,
      }
  }

  export default RegisterScreen