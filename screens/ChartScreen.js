import React from 'react'
import {View , Dimensions, StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import {LineChart , BarChart} from 'react-native-chart-kit'
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';


const ChartScreen = ()=>{

    const linedata = {
        labels: ['Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: [0, 30, 20 , 80, 100],
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
      data={[20,30,40,100]}
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