import React, { useState } from 'react'
import {View , StyleSheet} from 'react-native'
import {Text , Input} from 'react-native-elements'
import SignInComp from '../components/SignInComponent'


const RegisterScreen = ({navigation})=>{

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  

  const registerButtonPressed = ()=>{
      console.log(name)
      console.log(email)
      console.log(password)
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