import React, { useState, useEffect } from 'react'
import {View, StyleSheet , ScrollView, ImageBackground} from 'react-native'
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
    return (
    <ScrollView alwaysBounceVertical={true}>
        <View style={styles.container}>
        <ImageBackground source={require('../assets/ig-background.png')} style={styles.backgroundImage}>
            <MainScrComp
                expCal = {expectedCalories}
                nav = {navPressed}        
            />
            </ImageBackground>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
        flex: 1, 
        width: '100%', 
        height: '100%'
    },


});

export default MainScreen