import React from 'react'
import {Input , Button} from 'react-native-elements'


const HomeComp = (props)=>{
    return <>
        <Input 
      placeholder="Enter gender "
      autoCorrect={false}
      value={props.gender}
      onChangeText={props.genderChanged}
      />
       <Input 
      placeholder="Enter Height "
      autoCorrect={false}
      value={props.height}
      onChangeText={props.heightChanged}
      />
       <Input 
      placeholder="Enter weight "
      autoCorrect={false}
      value={props.weight}
      onChangeText={props.weightChanged}
      />
       <Input 
      placeholder="Enter age"
      autoCorrect={false}
      value={props.age}
      onChangeText={props.ageChanged}
      />

    <Button title="Analyse" onPress={props.analyseButtonPressed} />
    </>
}

export default HomeComp