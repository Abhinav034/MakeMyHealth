import React from 'react';
import {StyleSheet , View} from 'react-native'
import {Input, Button, Text } from 'react-native-elements';

const App = ()=> {
  return  <View style={styles.container}>
    <Text h3 style={styles.textStyles}>Sign in to your account</Text>
    
      <Input label="Email" />
      <Input label="Password"/>
      <Button  title="Sign in"/>
     

      </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    justifyContent: 'center',
    margin:20
  },
  textStyles:{
    marginBottom: 10
  }
});

export default App