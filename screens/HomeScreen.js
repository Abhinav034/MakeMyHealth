import React, {useState , useEffect} from 'react'
import {View , StyleSheet, Alert , ImageBackground} from 'react-native'
import HomeComp from '../components/homeComponent'
import {fbInsertUserData} from '../firebase/fbCRUD'

const HomeScreen = ({navigation})=>{

  const [name   , setName]   = useState('')
  const [gender , setGender] = useState('M')
  const [feet , setFeet] = useState(5)
  const [inch , setInch] = useState(7)
  const [weight , setWeight] = useState(70)
  const [age    , setAge]    = useState(25)
  const [lifestyle , setLifestyle] = useState(1.375)

  const analyseButtonPressed = async()=>{

    if (lifestyle!== ''){
      fbInsertUserData({gender , feet , inch , weight , age , lifestyle})
      navigation.navigate('AnalysisScreen')
    }else{
      Alert.alert(
        "Error",
        `Please select your lifestyle`
        ,
        [
          {
            text: "OK",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    }
  }



  useEffect(()=>{
    //console.log(fbFetchUserName())
  })

    return <ImageBackground source={require('../images/test.jpg')} style={{
      width: '100%',
      height: '100%',
      flex: 1 
}}>
      <View style={{flex:1}}>
      <View style={styles.container}>
      
        <HomeComp
        genderChanged = {setGender}
        
        feet={feet}
        feetChanged={setFeet}

        inch={inch}
        inchChanged={setInch}

        weight={weight}
        weightChanged={setWeight}

        age={age}
        ageChanged={setAge}

        lifestyle={lifestyle}
        lifestyleChanged = {setLifestyle}

        analyseButtonPressed={analyseButtonPressed}
        />
        
        {console.log(gender),
        console.log(feet),
        console.log(inch),
        console.log(weight),
        console.log(age),
        console.log(lifestyle)

        }
   </View>
    </View>
    </ImageBackground>
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:40,
      marginHorizontal:20,
    }
  });

  HomeScreen.navigationOptions = ()=>{
      return{
        headerShown:false,
      }
  }




  export default HomeScreen