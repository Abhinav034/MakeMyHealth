import React, {useState} from 'react'
import {View , StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import HomeComp from '../components/homeComponent'

const HomeScreen = ({navigation})=>{

  const [gender , setGender] = useState('')
  const [height , setHeight] = useState('')
  const [weight , setWeight] = useState('')
  const [age    , setAge]    = useState('')

  const analyseButtonPressed = async()=>{
    navigation.navigate('ChartScreen')
  }

    return  <View style={styles.container}>
        <Text h2 style={styles.textStyles}>Enter Your Details</Text>
   <HomeComp
   gender = {gender}
   genderChanged = {setGender}

   height={height}
   heightChanged={setHeight}

   weight={weight}
   weightChanged={setWeight}

   age={age}
   ageChanged={setAge}

   analyseButtonPressed={analyseButtonPressed}
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
        marginBottom: 50,
        color:'grey'
    }
  });

  HomeScreen.navigationOptions = ()=>{
      return{
        headerShown: false,
      }
  }




  export default HomeScreen