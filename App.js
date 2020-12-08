import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'


import SignInScreen from './screens/SignInScreen'
import RegisterScreen from './screens/RegisterScreen'

const navigator = createSwitchNavigator({
  authScreens:createStackNavigator({
    SignInScreen,
    RegisterScreen
  }),

})

export default createAppContainer(navigator)