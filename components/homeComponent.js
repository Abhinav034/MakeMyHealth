import React , {useState} from 'react'
import {View , Dimensions , StyleSheet, ImageBackground} from 'react-native'
import {Text, Button , ButtonGroup} from 'react-native-elements'
import InputSpinner from "react-native-input-spinner"
import DropDownPicker from 'react-native-dropdown-picker'

const HomeComp = (props)=>{
    const [index , setIndex] = useState(0)
    let controller;
    return (
    <ImageBackground source={require('../assets/ig-background.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text h4 style={{color: '#387ea6', marginBottom: 25, fontWeight: 'bold'}}>Please enter your details...</Text>
        <View style={{marginBottom: 20}}> 
          <Text h4 style={{fontWeight: 'bold', color: '#000000', marginBottom: 15}}>Gender</Text>
          <ButtonGroup selectedButtonStyle={{backgroundColor:'#387ea6'}}
            textStyle={{fontSize: 18}}
            onPress={index => {
              setIndex(index)
              switch(index){
                case 0:
                    props.genderChanged('M')
                break;
                case 1:
                    props.genderChanged('F')
                break;
                
            }}}
            selectedIndex={index}
            buttons={['Male' , 'Female']}
            containerStyle={{height: 40 , backgroundColor:'transparent'}}
          />
        </View>

        <Text h4 style={{marginTop: 20, color: '#000000',fontWeight: 'bold', zIndex: 1}}>Height</Text>
        <View style={{flexDirection:'row',alignItems:'center', marginTop:15, justifyContent: 'center'}}>
          <Text style={{marginHorizontal:5, fontSize: 18,}}>Ft:</Text>
          <InputSpinner
            rounded={false}
            showBorder
            color={'#387ea6'}
            fontSize={18}
            inputStyle={{color:'#000000'}}
            height={35}
            width={Dimensions.get('window').width/2-30}
            max={8}
            min={0}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            value={props.feet}
            onChange={(num) => {
                props.feetChanged(num);
            }}
          />
        </View>
        <View style={{flexDirection:'row',alignItems:'center', marginVertical: 20, justifyContent: 'center'}}>
          <Text h5 style={{marginHorizontal:5, fontSize: 18}}>In:</Text>
          <InputSpinner
            rounded={false}
            showBorder
            color={'#387ea6'}
            fontSize={18}
            inputStyle={{color:'#000000'}}
            height={35}
            width={Dimensions.get('window').width/2-30}
            max={11}
            min={0}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            value={props.inch}
            onChange={(num) => {
              props.inchChanged(num);
            }}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text h4 style={{fontWeight: 'bold'}}>Weight</Text>
          
          <View style={{flexDirection:'row', alignItems: 'center', marginTop: 15, marginBottom: 20, justifyContent: 'center'}}>
            <Text h5 style={{marginHorizontal: 5, fontSize: 18}}>Kg:</Text>
            <InputSpinner
              rounded={false}
              showBorder
              color={'#387ea6'}
              fontSize={18}
              inputStyle={{color:'#000000'}}
              height={35}
              width={Dimensions.get('window').width/2-30}
              max={200}
              min={0}
              step={1}
              colorMax={"#f04048"}
              colorMin={"#40c5f4"}
              value={props.weight}
              onChange={(num) => {
                props.weightChanged(num);
              }}
            />
          </View>
          <Text h4 style={{marginTop: 20, fontWeight: 'bold'}}>Age</Text>
          <View style={{flexDirection:'row', alignItems: 'center', marginTop: 15, marginBottom: 20, justifyContent: 'center'}}>
            <Text h5 style={{marginHorizontal: 5, fontSize: 18}}>Yrs:</Text>
            <InputSpinner
              rounded={false}
              showBorder
              color={'#387ea6'}
              fontSize={18}
              inputStyle={{color:'#000000'}}
              height={35}
              width={Dimensions.get('window').width/2-30}
              max={100}
              min={0}
              step={1}
              colorMax={"#f04048"}
              colorMin={"#40c5f4"}
              value={props.age}
              onChange={(num) => {
                  props.ageChanged(num);
              }}
            />
          </View>
        </View>

        <View style={{marginTop: 20, height: 200}}>
          <Text h4 style={{fontWeight: 'bold', marginBottom: 30}}>Lifestyle</Text>
          <DropDownPicker
            items={[
                {label: 'sedentary (little or no exercise)', value: 1.2 , color:'white'},
                {label: 'lightly active (light exercise/sports 1-3 days/week)', value: 1.375},
                {label: 'moderately active(moderate exercise/sports 3-5 days/week)', value: 1.55},
                {label: 'very active(hard exercise/sports 6-7 days a week)', value: 1.725},
                {label: 'extra active(very hard exercise/sports & physical job or 2x training) ', value: 1.9}

            ]}
            
            placeholder='lightly active (light exercise/sports 1-3 days/week)'
            labelStyle={{color: '#336339', fontSize: 16}}
            dropDownMaxHeight={100}
            defaultValue={props.lifestyle}
            containerStyle={{height: 40}}
            style={{backgroundColor: 'white', position: 'absolute'}}

            itemStyle={{
                justifyContent: 'flex-start',
            }}
            
            dropDownStyle={{backgroundColor: 'transparent', zIndex: 0}}
            onChangeItem={item => props.lifestyleChanged(item.value)}
          />
        </View>
        
        
        <Button buttonStyle={styles.buttonStyle} title="Analyse" onPress={props.analyseButtonPressed} />
      
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 15,
    top: 0,
  },
  textStyles:{
    marginBottom: 10,
  },
  buttonStyle:{
    marginVertical: 30,
    marginHorizontal: 20,
    backgroundColor:'#387ea6',
    borderRadius: 20,
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }, 
  backgroundImage: {
      flex: 1, 
      width: '100%', 
      height: '100%'
  },
})

export default HomeComp