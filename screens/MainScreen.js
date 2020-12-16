import React, { useState, useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'
import MainScrComp from '../components/MainScrComponent'
import {fbfetchHealthData} from '../firebase/fbCRUD'

const MainScreen = ({navigation}) => {
    

    return <View style={styles.container}>
        <MainScrComp
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