import React from 'react'
import {View , Dimensions} from 'react-native'
import {Text} from 'react-native-elements'
import {LineChart} from 'react-native-chart-kit'


const ChartScreen = ()=>{

    const linedata = {
        labels: ['Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: [20, 40, 60 , 80, 100],
            strokeWidth: 2
          }
        ]
    }  

    return <View>

<LineChart
    data={linedata}
    width={Dimensions.get('window').width} 
    height={250}
    yAxisLabel={'%'}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 10
    }}
  />

  <Text h2 > Your daily health chart</Text>
    </View>

}

export default ChartScreen