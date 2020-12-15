import React , {useEffect} from 'react'
import firebase from 'firebase'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from './screens/SignInScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ChartScreen from './screens/ChartScreen'
import AnalysisScreen from './screens/AnalysisScreen'
import MainScreen from './screens/MainScreen'

const navigator = createSwitchNavigator({
  authScreens:createStackNavigator({
    SignInScreen,
    RegisterScreen
  }),
  mainScreens:createStackNavigator({
    HomeScreen,
    AnalysisScreen,
    MainScreen,
    ChartScreen
  })
})

const App =  createAppContainer(navigator)

export default ()=>{
  
  useEffect(()=>{
    firebase.initializeApp({
      apiKey: "AIzaSyCnR8MA4_RCRXy3PVTM_5pzZ9_3iA7L-yw",
      authDomain: "makemyhealth-e9e31.firebaseapp.com",
      databaseURL: "https://makemyhealth-e9e31-default-rtdb.firebaseio.com",
      projectId: "makemyhealth-e9e31",
      storageBucket: "makemyhealth-e9e31.appspot.com",
      messagingSenderId: "73699523915",
      appId: "1:73699523915:web:8e28857efddeea8f577cce",
      measurementId: "G-0LP46XZ6NQ"
    }) 
    console.log(firebase.auth().currentUser)
 },[])

  return(
    <App/>
  )
}