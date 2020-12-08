import React, { useState } from 'react'
import {View , StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import SignInComp from '../components/SignInComponent'


const SignInScreen = ({navigation})=>{

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const signInButtonPressed = ()=>{
      console.log(email)
      console.log(password)
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