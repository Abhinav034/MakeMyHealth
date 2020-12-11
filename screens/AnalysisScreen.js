import React , {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'

import {fbFetch} from '../firebase/fbCRUD'

const AnalysisScreen = ({navigation}) => {


    // useEffect(()=>{
    //     console.log(`new ${fbFetch()}`)
    // })

    var gender = 'male'
    var height = 160 // cm
    var height_m = height/100
    console.log(`height in meters: ${height_m}`)

    var weight = 30 // kg
    
    var target_bmi = null
    var age = 28 //years

    var bmi = weight/Math.pow(height_m,2)
    var category = null;

    //18.5 to 24.9
    if (bmi >= 30){
        category = 'obese'
        target_bmi = 24.9
    }
    else if (bmi > 24.9){
        category = 'over weight'
        target_bmi = 24.9
    }
    else if(bmi < 18.5){
        category = 'under weight'
        target_bmi = 18.5
    }
    else{
        category = 'Normal-Fit'
        target_bmi = bmi
    }

    var target_weight = target_bmi*Math.pow(height_m,2)
    var timeRequired = Math.abs(target_weight - weight)/0.5

    var bmr = null
    

    if (gender == 'male'){

        bmr =  66 + (6.3*weight*2.205) + (12.9*height/2.54) - (6.8*age)

    }else if(gender == 'female'){

        bmr =  655 + (4.3*weight*2.205) + (4.7*height/2.54) - (4.7*age)

    }
    
    


    var maintanence_calory = bmr*1.375 // for light exercise people
    var Recommendation_calory = (target_weight < weight) ? maintanence_calory - 500 : maintanence_calory + 500
   
    return <View style = {styles.container}>
        <Text>Your BMI: {bmi} </Text>
        
        <Text>Your Category: {category} </Text>
        <Text>Ideal weight to be fit: {target_weight} </Text>
        <Text>Time to reach ideal weight: {timeRequired} weeks </Text>
        <Text> with the rate of 0.5 kg / week</Text>
        <Text> Daily calory for maintaining weight : {maintanence_calory}</Text>
        <Text> Daily Calory Intake Recommendation to reach your goal : {Recommendation_calory}</Text>

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
