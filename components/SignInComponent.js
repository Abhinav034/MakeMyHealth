import React , {useEffect} from 'react'
import { Input , Button} from 'react-native-elements'
import {StyleSheet} from 'react-native'
import firebase from 'firebase'
const SignInComp = (props)=>{


    return (<>
      <Input 
      placeholder="email@address.com"
      autoCapitalize='none'
      autoCorrect={false}
      value={props.emailValue}
      onChangeText={props.emailChanged}
      />
      <Input 
      placeholder="password"
      autoCapitalize='none' 
      autoCorrect={false} 
      secureTextEntry
      value={props.passwordValue}
      onChangeText={props.passwordChanged}
      />
      <Button buttonStyle={styles.buttonStyle} title={props.buttonTitle} onPress={props.signInButtonPressed}/>

      <Button buttonStyle={{marginTop:20}} titleStyle={{color:"#387ea6"}} title={props.lowerButtonTitle} type="clear" onPress={props.lowerButtonPressed}/>
    </>)
}

const styles= StyleSheet.create({
  buttonStyle:{
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor:'#387ea6',
    borderRadius: 20,
  },
})

export default SignInComp