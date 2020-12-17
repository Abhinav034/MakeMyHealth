import React, { useState, useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'
import MainScrComp from '../components/MainScrComponent'
import {fbfetchHealthData} from '../firebase/fbCRUD'

const MainScreen = ({navigation, route}) => {
    const expectedCalories = route.params.expectedCal;
    // console.log(cal);
    const navPressed = ()=>{
        navigation.navigate('ChartScreen' , {
            cal:expectedCalories
        })
    }
    return <View style={styles.container}>

        <MainScrComp
            expCal = {expectedCalories}
            nav = {navPressed}
                
                   
        
        />
        
    </View>
}



MainScreen.navigationOptions = () => {
    return{
        title: 'Your log'
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 0.9,
      margin:20
    },

});

export default MainScreen