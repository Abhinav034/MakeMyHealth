import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-elements'
import Dialog from 'react-native-dialog'


const MainScrComp = (props) =>{
    const [visible, setVisibility] = useState(false);
    const [dbVal, dbChangedVal] = useState('');
    const [dbMessage, dbChangedMsg] = useState('');
    const [category, changedCat] = useState('');
    const [calories, changedCalories] = useState(0);
    const [waterGlass, changedGlasses] = useState(0);
    const [sleepHours, changedSleepHours] = useState(0);

    // let calories = 0, waterGlass = 0, sleepHours = 0;
    let dialogBoxName = '';

    const showDialogBox = (value) =>{
        setVisibility(true);
        
        switch(value){
            case "cal":
                dbChangedMsg('Enter number of calories you have consumed:')
            break;
            case "water":
                dbChangedMsg('Enter glasses of water you took:')
            break;
            case "sleep":
                dbChangedMsg('Enter the hours of sleep you had:')
            break;
        }
        changedCat(value);
    }

    const cancelDialogBox = () => {
        setVisibility(false);
    }
    const okDialogBox = () => {
        switch(category){
            case "cal":
                changedCalories(dbVal);
            break;
            case "water":
                changedGlasses(dbVal);
            break;
            case "sleep":
                changedSleepHours(dbVal);
            break;
        }
        setVisibility(false);
    }

    return(
        <View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily calorie intake: </Text>
                <Text style={styles.val}>{calories}/2000</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("cal")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily water intake: </Text>
                <Text style={styles.val}>{waterGlass}/10</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("water")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily walking/running: </Text>
                <Text style={styles.val}>{props.walking}</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("walk")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily sleep log: </Text>
                <Text style={styles.val}>{sleepHours}/8</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("sleep")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily exercise: </Text>
                <Text style={styles.val}>{props.exercise}</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("exercise")}/>
            </View>

            <Button title="Button" value="btn1" onPress = {props.btnDialog}/>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Enter value</Dialog.Title>
                <Dialog.Description>{dbMessage}</Dialog.Description>
                <Dialog.Input keyboardType='number-pad' onChangeText = {dbChangedVal}/>
                <Dialog.Button label = "Cancel" onPress = {cancelDialogBox}/>
                <Dialog.Button label = "OK" onPress = {okDialogBox}/>
            </Dialog.Container>

        </View>
    )
}

const styles = StyleSheet.create({
    horizontal:{
        // justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        flex: 2,
        fontSize: 18,
        fontWeight: 'bold'
    },
    val:{
        flex: 1,
    },
    btn:{
        flex: 0,
    }
    
});

 export default MainScrComp