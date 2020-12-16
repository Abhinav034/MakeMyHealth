import React, {useState,useEffect} from 'react'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import {Text, Button} from 'react-native-elements'
import Dialog from 'react-native-dialog'
import {Stopwatch} from 'react-native-stopwatch-timer'
import {fbInsertHealthData} from '../firebase/fbCRUD'

const MainScrComp = (props) =>{

    const [visible, setVisibility] = useState(false);
    const [dbVal, dbChangedVal] = useState('');
    const [dbMessage, dbChangedMsg] = useState('');
    const [category, changedCat] = useState('');
    const [calories, changedCalories] = useState(0);
    const [waterGlass, changedGlasses] = useState(0);
    const [sleepHours, changedSleepHours] = useState(0);

    const [isWalkStart, setIsWalkStart] = useState(false);
    const [resetWalk, setResetWalk] = useState(false);
    const [isExerciseStart, setIsExerciseStart] = useState(false);
    const [resetExercise, setResetExercise] = useState(false);

    // let calories = 0, waterGlass = 0, sleepHours = 0;
    let dialogBoxName = '';
    let walkTime, exerciseTime;

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
        var newVal = null;
        switch(category){
            case "cal":
                newVal = parseInt(dbVal) + parseInt(calories) 
                changedCalories(newVal);
            break;
            case "water":
                newVal = parseInt(dbVal) + parseInt(waterGlass) 
                changedGlasses(newVal);
            break;
            case "sleep":
                newVal = parseInt(dbVal) + parseInt(sleepHours) 
                changedSleepHours(newVal);
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
                {/* <Text style={styles.val}>{props.walking}</Text> */}
                <Stopwatch style={styles.val} laps start={isWalkStart} reset={resetWalk} options={options} getTime={(time) => {
                    walkTime = time
                }}/>
                <Text>app. 30 min</Text>
                
            </View>
            <View style={styles.horizontal}>
                <Button style={styles.start} title={!isWalkStart ? 'START' : 'STOP'} onPress={() => {
                    if(isWalkStart){
                        console.log(walkTime);
                    }
                    setIsWalkStart(!isWalkStart);
                    setResetWalk(false);
                }}/>
                
                <Button style={styles.start} title="RESET" onPress={() => {
                    setIsWalkStart(false);
                    setResetWalk(true);
                }}/>
                
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily sleep log: </Text>
                <Text style={styles.val}>{sleepHours}/8</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("sleep")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily exercise: </Text>
                <Stopwatch style={styles.val} laps start={isExerciseStart} reset={resetExercise} options={options} getTime={(time) => {
                    exerciseTime = time
                }}/>
                <Text>{props.exercise}</Text>
            </View>
            <View style={styles.horizontal}>
                <Button style={styles.start} title={!isExerciseStart ? 'START' : 'STOP'} onPress={() => {
                    if(isExerciseStart){
                        console.log(exerciseTime);
                    }
                    setIsExerciseStart(!isExerciseStart);
                    setResetExercise(false);
                }}/>
                
                <Button style={styles.start} title="RESET" onPress={() => {
                    setIsExerciseStart(false);
                    setResetExercise(true);
                }}/>
                
            </View>

            <Button title="Button" value="btn1" onPress = {() => {
                fbInsertHealthData({calories, waterGlass, walkTime, sleepHours, exerciseTime})
            }}/>

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
    },
    buttonText: {
        flex:0,
        fontSize: 20,
        marginTop: 10,
      },
    stopwatch: {
        flexDirection: 'row',
    },
    start: {
        paddingHorizontal: 10,
    },
    reset:{
        flex: 1,
    }
    
});

const options = {
    container: {
      
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: '#000',
      marginLeft: 7,
    },
  };

 export default MainScrComp