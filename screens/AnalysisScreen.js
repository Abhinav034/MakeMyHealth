import React , {useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'

import {fbFetch} from '../firebase/fbCRUD'

const AnalysisScreen = ({navigation}) => {


    useEffect(()=>{
        console.log(`new ${fbFetch()}`)
    })

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
        <Text style={styles.texts}>Your BMI: <Text style={styles.data}> {bmi.toFixed(1)} </Text></Text>
        
        <Text style={styles.texts}>You are: <Text style={styles.data}>{category}</Text> </Text>
        <Text style={styles.texts}>Ideal weight to be fit: <Text style={styles.data}>{parseInt(target_weight)}</Text> kg</Text>
        <Text style={styles.texts}>Time to reach Ideal weight: <Text style={styles.data}>{parseInt(timeRequired)}</Text> weeks </Text>
        <Text style={styles.texts}> with the rate of <Text style={styles.data}>0.5 kg / week</Text></Text>
        <Text style={styles.texts}> Yout Maintanance calories : <Text style={styles.data}>{parseInt(maintanence_calory)}</Text></Text>
        <Text style={styles.texts}> Daily Calory Recommendation: <Text style={styles.data}>{parseInt(Recommendation_calory)}</Text></Text>

        <Button style={styles.texts} title="Show Action Items" onPress={() => 
            { 
            navigation.navigate('MainScreen')
        }
        }/>
        <Button style={styles.texts} title="Re-analyse" onPress={() => 
            { 
            navigation.goBack()
        }
        }/>
        
    </View>
}
AnalysisScreen.navigationOptions = ()=>{
    return{
        title:'Analysis Report'
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 0.9,
      margin:15
    },
    textStyles:{
        marginBottom: 50,
        color:'grey'
    },
    texts: {
        margin: 20,
        fontWeight: 'bold',
        fontSize: 18,
        
    },
    data: {
        color: 'green'
        
    }
});

export default AnalysisScreen
