import React, { useState, useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'
import MainScrComp from '../components/MainScrComponent'

const MainScreen = ({navigation}) => {

    return <View style={styles.container}>
        <MainScrComp
            calorie = "0/2000 cal"
            glasses = "0/10 glasses"
            walking = "0/30 min"
            sleep = "0/8 hours"
            exercise = "0/30 min"
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