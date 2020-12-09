import React , {useEffect} from 'react'
import firebase from 'firebase'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from './screens/SignInScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ChartScreen from './screens/ChartScreen'

const navigator = createSwitchNavigator({
  authScreens:createStackNavigator({
    SignInScreen,
    RegisterScreen
  }),
  mainScreens:createStackNavigator({
    HomeScreen,
    ChartScreen
  })

})

const App =  createAppContainer(navigator)

export default ()=>{

  useEffect(()=>{
    firebase.initializeApp( {
     apiKey: "AIzaSyAWFKmI4BDj54x5YLjgvAvR8FoHlaDfo7o",
     authDomain: "makemyhealth-83252.firebaseapp.com",
     projectId: "makemyhealth-83252",
     storageBucket: "makemyhealth-83252.appspot.com",
     messagingSenderId: "191370601428",
     appId: "1:191370601428:web:a8f6c2ef3308bee6c4ec41",
     measurementId: "G-G7471FN2HM"
   }) 
 })

  return(
    <App/>
  )
}