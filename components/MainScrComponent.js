import firebase from 'firebase'
import React, {useState,useEffect} from 'react'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import {Text, Button, Input} from 'react-native-elements'
import Dialog from 'react-native-dialog'
import {Stopwatch} from 'react-native-stopwatch-timer'
import {fbInsertHealthData} from '../firebase/fbCRUD'

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
    const [weight , setWeight] = useState(-1);

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
            setWeight(snapshot.val().weight)
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
        
        <View style={styles.container}>
            
            <View style={styles.bottomBorder}>
                <Text style={styles.title}>Daily calories intake: </Text>
                <View style={styles.horizontal}>
                    <Text style={styles.val}>{calories}/{props.expCal} calories</Text>
                    <TouchableHighlight
                        onPress = {()=> showDialogBox("cal")}
                        style={styles.btnLog}
                    >
                        <Text style={styles.buttonText}>Log</Text>
                    </TouchableHighlight>
                    {/* <Button color="#ff5c5c" title='Log' onPress = {()=> showDialogBox("cal")}/> */}
                </View>
            </View>
            <View style={styles.bottomBorder}>
                <Text style={styles.title}>Daily water consumption: </Text>
                <View style={styles.horizontal}>
                    <Text style={styles.val}>{waterGlass}/10 glass</Text>
                    <TouchableHighlight
                        onPress = {()=> showDialogBox("water")}
                        style={styles.btnLog}
                    >
                        <Text style={styles.buttonText}>Log</Text>
                    </TouchableHighlight>
                    {/* <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("water")}/> */}
                </View>
            </View>
            <View style={styles.bottomBorder}>
                <Text style={styles.title}>Daily sleep log: </Text>
                <View style={styles.horizontal}>
                    <Text style={styles.val}>{sleepHours}/8 hours</Text>
                    <TouchableHighlight
                        onPress = {()=> showDialogBox("sleep")}
                        style={styles.btnLog}
                    >
                        <Text style={styles.buttonText}>Log</Text>
                    </TouchableHighlight>
                    {/* <Button style={styles.btn} title='Log' onPress = {()=> showDialogBox("sleep")}/> */}
                </View>
            </View>
            <View style={[styles.horizontal, styles.start]}>
                <Text style={styles.title}>Daily walking/running: </Text>
                {/* <Text style={styles.val}>{props.walking}</Text> */}
                <Stopwatch style={styles.val} laps start={isWalkStart} reset={resetWalk} options={options} getTime={(time) => {
                    walk = addTimes(time, walkTime)
                }}/>
                
            </View>
            <View style={[styles.horizontal, styles.start]}>
                <Text style={styles.title}>Total walk time of the day: </Text>
                <Text style={styles.val}>{walkTime}</Text>
            </View>
            <View style={[styles.horizontal, styles.bottomBorder]}>
                <Button buttonStyle={styles.btnStart} titleStyle={{color:'#387ea6'}} title={!isWalkStart ? 'START' : 'STOP'} onPress={() => {
                    if(isWalkStart){
                        console.log("walk: ", walk);
                    }
                    setIsWalkStart(!isWalkStart);
                    setResetWalk(false);
                }}/>
                
                <Button buttonStyle={styles.btnStart} titleStyle={{color:'#387ea6'}} title="RESET" onPress={() => {
                    setIsWalkStart(false);
                    setResetWalk(true);
                }}/>
                
            </View>
            
            <View style={[styles.horizontal, styles.start]}>
                <Text style={styles.title}>Daily exercise: </Text>
                <Stopwatch style={styles.val} laps start={isExerciseStart} reset={resetExercise} options={options} getTime={(time) => {
                    exercise = addTimes(time, exerciseTime)
                }}/>
                
            </View>
            <View style={[styles.horizontal, styles.start]}>
                <Text style={styles.title}>Total workout of the day: </Text>
                <Text style={styles.val}>{exerciseTime}</Text>
            </View>
            <View style={[styles.horizontal, styles.bottomBorder]}>
                <Button buttonStyle={styles.btnStart} titleStyle={{color:'#387ea6'}} title={!isExerciseStart ? 'START' : 'STOP'} onPress={() => {
                    if(isExerciseStart){
                        console.log("exercise: ", exercise);
                    }
                    setIsExerciseStart(!isExerciseStart);
                    setResetExercise(false);
                }}/>
                
                <Button buttonStyle={styles.btnStart} titleStyle={{color:'#387ea6'}} title="RESET" onPress={() => {
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

            <Button buttonStyle={styles.buttonStyle} title="Save" value="btn1" onPress = {() => {
                (weight>0) ? weight : -1;
                console.log("weighing here..", weight);
                fbInsertHealthData({calories, waterGlass, walk, sleepHours, exercise, weight})
            }}/>

            <Button buttonStyle={styles.buttonStyle} title="Chart Screen" onPress={props.nav}/>

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
    container:{
        padding: 10,
    },
    horizontal:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        flex: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    val:{
        flex: 2,
        fontSize: 18,
        color: '#4d9456',
        fontWeight: 'bold'
    },
    btnLog:{
        flex: 0,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#387ea6',
        borderColor: '#387ea6',
        borderWidth: 2,
        padding: 7,
        borderRadius: 10
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
    buttonStyle:{
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor:'#387ea6',
        borderRadius: 20,
    },
    btnStart:{
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor:'#387ea6',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    bottomBorder:{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10

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
      color: '#4d9456',
      fontWeight: 'bold',
    },
  };

 export default MainScrComp