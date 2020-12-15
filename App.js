import React , {useEffect} from 'react'
import firebase from 'firebase'
import {View} from 'react-native'
import {Text} from 'react-native-elements'
import SignInScreen from './screens/SignInScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ChartScreen from './screens/ChartScreen'
import AnalysisScreen from './screens/AnalysisScreen'
import MainScreen from './screens/MainScreen'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const HomeStack = createStackNavigator();
function HomeStackScreen(){
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="SignInScreen" component={SignInScreen}/>
      <HomeStack.Screen name="RegisterScreen" component={RegisterScreen}/>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
      <HomeStack.Screen name="AnalysisScreen" component={AnalysisScreen}/>
      <HomeStack.Screen name="MainScreen" component={MainScreen}/>

      <HomeStack.Screen name="ChartScreen" component={ChartScreen}/>
    </HomeStack.Navigator>
  )
}

function NutritionInfo() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nutrition info Tab!</Text>
    </View>
  );
}

function DietPlan() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Diet plan Tab!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

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
 },[])

  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen}/>
        <Tab.Screen name="Nutrition info" component={NutritionInfo}/>
        <Tab.Screen name="Diet Plan" component={DietPlan}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}