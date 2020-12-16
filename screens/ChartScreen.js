import React, { useState ,useEffect} from 'react'
import {View , Dimensions, StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import {LineChart , BarChart} from 'react-native-chart-kit'
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';
import firebase from 'firebase'


const ChartScreen = ()=>{

    const [ healtData, setData ] = useState()

    

    // var s = '01:05:00'
    
    // var a = s.split(':')
    // var time = parseInt(a[0])*60 + parseInt(a[1])

    // console.log('min - ', time)

    useEffect(() => {

    
      
    const user = firebase.auth().currentUser
    firebase.database().ref(`/users/${user.uid}/healthData`)
    .on('value' , snapshot =>{
        console.log(snapshot.val())
        setData(snapshot.val())



    })
    
     
      
  },[])

  var avgCal = 0;
  var avgGlasses = 0;
  var avgSleep = 0;
  var avgExe = 0;
  var avgwalk = 0;

  if(healtData){

    var allData = Object.values(healtData)

     

     const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length // definition

     avgCal = arrAvg(allData.map((item)=> item.calories))
     avgGlasses = arrAvg(allData.map((item)=> item.waterGlass))
     //avgwalk = arrAvg(allData.map((item)=> item.walkTime))
     //avgExe = arrAvg(allData.map((item)=> item.exerciseTime))
     avgSleep = arrAvg(allData.map((item)=> item.sleepHours))
     
     



   }



    const linedata = {
        labels: ['15 dec', '16 dec', 'Wed','Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: [75, 70, 20 , 80, 100],
            strokeWidth: 2
          }
        ]
    } 
    return <View style={styles.container}>
  <Text h3 > Your overall health chart:</Text>
  <LineChart
    data={linedata}
    width={Dimensions.get('window').width} 
    height={250}
    yAxisLabel={'%'}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#ffc654',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 7, 112, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    style={{
      marginVertical: 8,
      borderRadius: 10
    }}
  />

  <Text h3 > Your daily food intake:</Text>
    
  <HorizontalBarGraph
      data={[20,30,40,avgCal*100/2000]}
      labels={['Protein(g)', 'Fat(g)', 'Carbs.(g)','Cal.(Kcal)']}
      width={Dimensions.get('window').width-10}
      height={350}
      barRadius={10}
      barColor={'#1758a3'}
      baseConfig={{
        hasYAxisBackgroundLines:false,
        xAxisLabelStyle: {
          rotation: 0,
          fontSize: 13,
          width: 70,
          yOffset: 5,
          xOffset: -20
        },
        yAxisLabelStyle: {
          rotation: 0,
          fontSize: 13,
          position: 'bottom',
          xOffset: 20,
          decimals: 0,
          height: 100
        }
      }}
      style={styles.chart}
    />

    </View>

}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff"
  },
  chart: {
    marginTop:10,
    marginLeft:0,
    paddingTop: 10,
    borderRadius: 20,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
   
  }
})

export default ChartScreen



// healthData: 

// dec10 : {cal : , water : 91200, water : 9, weight : 75}
// dec16 : {cal : 1200, water : 9, weight : -1}
// dec17 : {cal : 1500, weight : 70}


// cal = 1200 + 1500 /2


// 75



// 70
// ----------date





