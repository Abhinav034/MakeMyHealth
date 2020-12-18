import React, { useState ,useEffect} from 'react'
import {View , Dimensions, StyleSheet,ScrollView} from 'react-native'
import {Text} from 'react-native-elements'
import {LineChart} from 'react-native-chart-kit'
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';
import firebase from 'firebase'


const ChartScreen = ({route})=>{



    const [ healthData, setData ] = useState()
    

    

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

  var avgCal = 1;
  var avgGlasses = 1;
  var avgSleep = 1;
  var avgExe = 0;
  var avgwalk = 0;

  var dates = ['1-12', '2-12']
  var weights = [80, 70]
  if(healthData){

    

    var allData = Object.values(healthData)

    var healthDataArr = [healthData]

    console.log('healthdata',healthDataArr)

    dates = []
    weights = []
    Object.entries(healthData).forEach( ([key, value]) => {
     if (value.weight !== -1){
      dates.push(key)
      weights.push(value.weight)
     }
      
    })

    // dates = healthDataArr.filter((item => Object.values(item)[0].weight !== -1 )).map((i) => Object.keys(i)[0])
    // weights = healthDataArr.filter((item => Object.values(item)[0].weight !== -1 )).map((i) => Object.values(i)[0].weight)

    // item : === {12-1 : {weight :-1. abs : 2} }

     const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length // definition

     avgCal = arrAvg(allData.map((item)=> item.calories))
     avgGlasses = arrAvg(allData.map((item)=> item.waterGlass))
     avgwalk = arrAvg(allData.map((item)=> {
       var a = item.walk.split(':')
       
        var time = parseInt(a[0])*60*60 + parseInt(a[1])*60 + parseInt(a[2])
       return time

      }))

      avgExe = arrAvg(allData.map((item)=> {
        var a = item.exercise.split(':')
        var time = parseInt(a[0])*60*60 + parseInt(a[1])*60 + parseInt(a[2])
        return time
 
       }))
     
     avgSleep = arrAvg(allData.map((item)=> item.sleepHours))
     
     



   }



    const linedata = {
        labels: dates,
        datasets: [
          {
            data: weights,
            strokeWidth: 2
          }
        ]
    } 
    return <ScrollView>
    
    <View style={styles.container}>

  <Text h3 style={{color:'#387ea6', fontWeight: 'bold'}}> Your daily food intake:</Text>
  {console.log('avgcal - ', avgCal, 'sleep- ', avgSleep, 'water-', avgGlasses, avgwalk, avgExe)}
  {console.log('weight- ', weights, 'dates- ', dates)}

  {console.log([avgCal*100/2000, avgSleep*100/8, avgGlasses*10, (avgwalk/60).toFixed(2)*100/30, (avgExe/60).toFixed(2)*100/30 ])}

  <View style={{height:300}}>
  <HorizontalBarGraph
  
  //data={[avgCal.toFixed(2)*100/2000 , avgSleep.toFixed(2)*100/8, 20]}
  data={[avgCal*100/route.params.cal, avgSleep*100/8, avgGlasses*10, (avgwalk/60).toFixed(2)*100/30, (avgExe/60).toFixed(2)*100/30 ]}
  
  labels={['Calories' , 'Sleep', 'Water', 'walking', 'exercise']}
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
      height: 100,
    }
  }}
  style={styles.chart}
/>
  </View>



<View style={{flexDirection:'column', marginVertical:50 }}>
  <Text style={{margin:10, fontSize:20}}>Avg calories intake: <Text style={{color:"#1758a3"}}>{Math.floor(avgCal*100/route.params.cal)} %</Text></Text>

  <Text style={{margin:10, fontSize:20}}>Avg sleep: <Text style={{color:"#1758a3"}}>{Math.floor(avgSleep*100/8)} %</Text></Text>

  <Text style={{margin:10 , fontSize:20}}>Avg water intake: <Text style={{color:"#1758a3"}}>{Math.floor(avgGlasses*10)} %</Text></Text>

  <Text style={{margin:10, fontSize:20}}>Avg exercise time: <Text style={{color:"#1758a3"}}>{Math.floor((avgExe/60).toFixed(2)*100/30)} %</Text></Text>

  <Text style={{margin:10, fontSize:20}}>Avg walk time: <Text style={{color:"#1758a3"}}>{Math.floor((avgwalk/60).toFixed(2)*100/30)} %</Text></Text>
</View>




     <Text h3 style={{color:'#387ea6', fontWeight: 'bold'}} > Your weight chart:</Text>
     
  <LineChart
    data={linedata}
    width={Dimensions.get('window').width} 
    height={250}
    yAxisLabel={"Kg."}
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
      borderRadius: 10,
    }}
  />
  

      </View>
    </ScrollView>
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
   
  }
})

export default ChartScreen






