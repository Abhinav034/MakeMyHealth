import React from 'react'
import {Card , Input , Button} from 'react-native-elements'

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
      <Button  title={props.buttonTitle} onPress={props.signInButtonPressed}/>

      <Button buttonStyle={{marginTop:20}} title={props.lowerButtonTitle} type="clear" onPress={props.lowerButtonPressed}/>
    </>)
}

export default SignInComp