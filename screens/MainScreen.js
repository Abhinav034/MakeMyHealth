import React from 'react'
import {View, StyleSheet, Button} from 'react-native'
import {Text, Buttons} from 'react-native-elements'

const MainScreen = ({navigation}) => {
    return <View style={styles.container}>
        <Text>Today's log</Text>
        <Button title="Button" onPress = {() =>
            navigation.navigate("ChartScreen")
        }/>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 0.9,
      margin:20
    }
});

export default MainScreen