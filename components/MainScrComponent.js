import firebase from 'firebase'
import React, {useState,useEffect} from 'react'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import {Text, Button, Input} from 'react-native-elements'
import Dialog from 'react-native-dialog'
import {Stopwatch} from 'react-native-stopwatch-timer'
import {fbInsertHealthData, fbFetch} from '../firebase/fbCRUD'

function addTimes (startTime, endTime) {
    var times = [ 0, 0, 0 ]
    var max = times.length
  
    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')
  
    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }
  
    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }
  
    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]
  
    if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }
  
    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }
  
    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
}
  
const MainScrComp = (props) =>{

    const [weight , setWeight] = useState(-1);

    const date = (new Date().getDate()) + "-" + (new Date().getMonth() + 1)
   
    const [visible, setVisibility] = useState(false);
    const [dbVal, dbChangedVal] = useState('');
    const [dbMessage, dbChangedMsg] = useState('');
    const [category, changedCat] = useState('');
    const [calories, changedCalories] = useState(0);
    const [waterGlass, changedGlasses] = useState(0);
    const [sleepHours, changedSleepHours] = useState(0);
    const [walkTime, changedWalkTime] = useState('----');
    const [exerciseTime, changedExerciseTime] = useState('----');

    const [isWalkStart, setIsWalkStart] = useState(false);
    const [resetWalk, setResetWalk] = useState(false);
    const [isExerciseStart, setIsExerciseStart] = useState(false);
    const [resetExercise, setResetExercise] = useState(false);

    // let calories = 0, waterGlass = 0, sleepHours = 0;
    let dialogBoxName = '';
    let walk, exercise;

    useEffect(() => {
        // fbfetchHealthData()
        
        var obj = null;
        const user = firebase.auth().currentUser;
        firebase.database().ref(`/users/${user.uid}/healthData/${date}`)
        .on('value', async snapshot => {   
            console.log(snapshot.val());
            changedCalories(snapshot.val().calories)
            changedGlasses(snapshot.val().waterGlass)
            changedSleepHours(snapshot.val().sleepHours)
            changedWalkTime(snapshot.val().walk)
            changedExerciseTime(snapshot.val().exercise)
        })
       
    },[])

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
            case "walk":
                changedWalkTime(walk);
            break;
            case "exercise":
                changedExerciseTime(exercise);
            break;
        }
        setVisibility(false);
    }
   
    return(
        
        <View>

            {/* {console.log("qqq2222: ", date)} */}
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily calorie intake: </Text>
                <Text style={styles.val}>{calories}/{props.expCal}</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("cal")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily water intake: </Text>
                <Text style={styles.val}>{waterGlass}/10</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("water")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily sleep log: </Text>
                <Text style={styles.val}>{sleepHours}/8</Text>
                <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("sleep")}/>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Daily walking/running: </Text>
                {/* <Text style={styles.val}>{props.walking}</Text> */}
                <Stopwatch style={styles.val} laps start={isWalkStart} reset={resetWalk} options={options} getTime={(time) => {
                    walk = addTimes(time, walkTime)
                }}/>
                <Text style={styles.val}>{walkTime}</Text>
                
            </View>
            <View style={styles.horizontal}>
                <Button style={styles.start} title={!isWalkStart ? 'START' : 'STOP'} onPress={() => {
                    if(isWalkStart){
                        console.log("walk: ", walk);
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
                <Text style={styles.title}>Daily exercise: </Text>
                <Stopwatch style={styles.val} laps start={isExerciseStart} reset={resetExercise} options={options} getTime={(time) => {
                    exercise = addTimes(time, exerciseTime)
                }}/>
                <Text style={styles.val}>{exerciseTime}</Text>
            </View>
            <View style={styles.horizontal}>
                <Button style={styles.start} title={!isExerciseStart ? 'START' : 'STOP'} onPress={() => {
                    if(isExerciseStart){
                        console.log("exercise: ", exercise);
                    }
                    setIsExerciseStart(!isExerciseStart);
                    setResetExercise(false);
                }}/>
                
                <Button style={styles.start} title="RESET" onPress={() => {
                    setIsExerciseStart(false);
                    setResetExercise(true);
                }}/>
                
            </View>

            <View style={styles.horizontal}>
                <Input 
                    placeholder="Enter your current weight (optional)"
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText = {setWeight}
                    />
            </View>

            <Button style={styles.btnSave} title="Save" value="btn1" onPress = {() => {
                console.log("weighing here..", weight);
                fbInsertHealthData({calories, waterGlass, walk, sleepHours, exercise, weight})
            }}/>

            <Button style={styles.btnSave} title="Chart Screen" onPress={props.nav}/>

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
        flex: 1.5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    val:{
        flex: 1,
        fontSize: 16,
        color: 'black'
    },
    btn:{
        flex: 0,
        color: 'black',
    },
    buttonText: {
        flex:0,
        fontSize: 18,
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
    },
    btnSave: {
        margin: 20
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