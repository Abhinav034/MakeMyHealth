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
import NutritionScreen from './screens/NutritionInfo'
import WebScreen from './screens/WebView'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Header } from 'react-native/Libraries/NewAppScreen'
import BuyProductsScreen from './screens/BuyProducts'
const AuthStack = createStackNavigator();
 
const HomeStack = createStackNavigator();
function HomeStackScreen(){
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Screen" component={HomeScreen} options={{
        headerShown:false,
      }}/>
      <HomeStack.Screen name="AnalysisScreen" component={AnalysisScreen} />
      <HomeStack.Screen name="MainScreen" component={MainScreen}/>
      <HomeStack.Screen name="ChartScreen" component={ChartScreen}/>
    </HomeStack.Navigator>
  )
}

function NutritionInfo() {
  return (
      <HomeStack.Navigator>
          <HomeStack.Screen name="NutritionScreen" component={NutritionScreen} options={{
        headerShown:false,
      }}/>
        </HomeStack.Navigator>
  )
}

function DietPlan() {
  return (
    <HomeStack.Navigator>
    <HomeStack.Screen name="BuyProductScreen" component={BuyProductsScreen} options={{
        headerLeft:null,
        title:'Buy Products'
        
}}/>
   <HomeStack.Screen name="WebView" component={WebScreen}/>
  </HomeStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

function tabScreens() {
    return  <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen}/>
        <Tab.Screen name="Nutrition info" component={NutritionInfo}/>
        <Tab.Screen name="Buy items" component={DietPlan}/>
      </Tab.Navigator>
}

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

    <AuthStack.Navigator>
    <AuthStack.Screen name="SignInScreen" component={SignInScreen}/>
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen}/>
    <AuthStack.Screen name="Home" component={tabScreens} options={{
        headerShown:false,
      }}/>
    

    </AuthStack.Navigator>
      
      
    </NavigationContainer>
  )
}