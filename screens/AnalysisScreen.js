import React , {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'
import { set } from 'react-native-reanimated';

import {fbFetch} from '../firebase/fbCRUD'


const AnalysisScreen = ({navigation}) => {

    const [userData , setData] = useState({})

    useEffect(() => {
        var userData = fbFetch('data');
        setData(userData)
    },[])

    // console.log("we are using following data")
    // console.log(userData)

    var height = ((12*userData.feet) + (userData.inch))*2.54 //cm
    var height_m = height/100
    var weight = userData.weight // kg
    var target_bmi = null
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

    // console.log(weight)
    // console.log(target_weight)
    // console.log(timeRequired)

    var bmr = null
    

    if (userData.gender == 'M'){

        bmr =  66 + (6.3*weight*2.205) + (12.9*height/2.54) - (6.8*userData.age)

    }else if(userData.gender == 'F'){

        bmr =  655 + (4.3*weight*2.205) + (4.7*height/2.54) - (4.7*userData.age)

    }
    var maintanence_calory = bmr*userData.lifestyle // for light exercise people
    var Recommendation_calory = (target_weight < weight) ? maintanence_calory - 500 :
             (target_weight == weight ? maintanence_calory : maintanence_calory + 500)
   
    return <View style = {styles.container}>

        <Text style={styles.texts}>Your BMI: <Text style={styles.data}> {bmi.toFixed(1)} </Text></Text>
        
        <Text style={styles.texts}>You are: <Text style={styles.data}>{category}</Text> </Text>
        <Text style={styles.texts}>Ideal weight to be fit: <Text style={styles.data}>{Math.round(target_weight)}</Text> kg</Text>
        <Text style={styles.texts}>Time to reach Ideal weight: <Text style={styles.data}>{Math.round(timeRequired)}</Text> weeks </Text>
        <Text style={styles.texts}> with the rate of <Text style={styles.data}>0.5 kg / week</Text></Text>
        <Text style={styles.texts}> Yout Maintanance calories : <Text style={styles.data}>{parseInt(maintanence_calory)}</Text></Text>
        <Text style={styles.texts}> Daily Calory Recommendation: <Text style={styles.data}>{parseInt(Recommendation_calory)}</Text></Text>

        <Button style={styles.texts} title="Show Action Items" onPress={() => 
            { 
            navigation.navigate('MainScreen')
         } }/>
          <Button style={styles.texts} title="Chart Screen" onPress={() => 
            { 
            navigation.navigate('ChartScreen')
         } }/>
        
        
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
