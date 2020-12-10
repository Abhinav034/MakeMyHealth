import React , {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {fbFetch} from '../firebase/fbCRUD'

const AnalysisScreen = ({navigation}) => {


    useEffect(()=>{
        console.log(`new ${fbFetch()}`)
    })
   
    return <View style = {styles.container}>
        <Text>Your BMI:  </Text>
        <Text>Ideal weight to be fit: </Text>
        <Text>Time to reach ideal weight: </Text>
        <Button title="Analyse" onPress={() => 
            { 
            navigation.navigate('MainScreen')
        }
        }/>
        <Button title="Re-analyse" onPress={() => 
            { 
            navigation.goBack()
        }
        }/>
        
    </View>
}
AnalysisScreen.navigationOptions = ()=>{
    return{
        title:'New Screen'
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 0.9,
      margin:20
    },
    textStyles:{
        marginBottom: 50,
        color:'grey'
    }
});

export default AnalysisScreen
