import React , {useState} from 'react'
import {View , Dimensions , StyleSheet, ImageBackground} from 'react-native'
import {Text, Button , ButtonGroup} from 'react-native-elements'
import InputSpinner from "react-native-input-spinner"
import DropDownPicker from 'react-native-dropdown-picker'

const HomeComp = (props)=>{
    const [index , setIndex] = useState(0)
    
    return (
    <View style={styles.container}>
     
      <ImageBackground source={require('../assets/ig-background.png')} style={styles.backgroundImage}>
        <View style={{justifyContent:'center'}}> 
          <Text h4 style={{marginBottom: 15 , color:"grey",marginLeft:Dimensions.get('window').width/2-55 }}>Gender</Text>
          <ButtonGroup selectedButtonStyle={{backgroundColor:'#8bcc25'}}
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

        <Text h3 style={{marginVertical: 15,marginLeft:Dimensions.get('window').width/2-55, color:"grey"}}>Height</Text>
        <View style={{flexDirection:'row' , width:Dimensions.get('window').width , marginBottom: 20 , marginTop:18}}>
          <Text h4 style={{marginTop:4 , marginRight:3 , marginLeft: 0, color:'grey'}}>Ft:</Text>
          <InputSpinner
            rounded={false}
            showBorder
            color={'#ff844f'}
            fontSize={18}
            inputStyle={{color:'#ff844f'}}
            height={35}
            width={Dimensions.get('window').width/2-50}
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
          <Text h4 style={{marginTop:4 , marginHorizontal:3, color:'grey'}}>In:</Text>
          <InputSpinner
            rounded={false}
            showBorder
            color={'#ff844f'}
            fontSize={18}
            inputStyle={{color:'#ff844f'}}
            height={35}
            width={Dimensions.get('window').width/2-50}
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
        <View style={{alignItems:'center'}}>
          <Text h3 style={{marginVertical: 30 , color:"grey"}}>Weight</Text>
          <View style={{flexDirection:'row' , paddingRight:65}}>
            <Text h4 style={{marginTop:4 , marginHorizontal:20 , color:'grey'}}>Kg:</Text>
            <InputSpinner
              rounded={false}
              showBorder
              color={'#ff844f'}
              fontSize={20}
              inputStyle={{color:'#ff844f'}}
              height={35}
              width={Dimensions.get('window').width/2}
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
          <Text h3 style={{marginVertical: 30 , color:"grey"}}>Age</Text>
          <View style={{marginHorizontal: 70}}>
            <InputSpinner
              rounded={false}
              showBorder
              color={'#ff844f'}
              fontSize={20}
              inputStyle={{color:'#ff844f'}}
              height={35}
              width={Dimensions.get('window').width/2}
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

        <View style={{marginTop: 30,height:100}}>
          <DropDownPicker
            items={[
                {label: 'sedentary (little or no exercise)', value: 1.2 , color:'white'},
                {label: 'lightly active (light exercise/sports 1-3 days/week)', value: 1.375},
                {label: 'moderately active(moderate exercise/sports 3-5 days/week)', value: 1.55},
                {label: 'very active(hard exercise/sports 6-7 days a week)', value: 1.725},
                {label: 'extra active(very hard exercise/sports & physical job or 2x training) ', value: 1.9}

            ]}
        
            placeholder='lightly active (light exercise/sports 1-3 days/week)'
            labelStyle={{color:'#ff844f'}}
            dropDownMaxHeight={200}
            defaultValue={props.lifestyle}
            containerStyle={{height: 40}}
            style={{backgroundColor: 'transparent'}}

            itemStyle={{
                justifyContent: 'flex-start',
            }}
            
            dropDownStyle={{backgroundColor: 'white'}}
            onChangeItem={item => props.lifestyleChanged(item.value)}
          />
        </View>
        <Button buttonStyle={styles.buttonStyle} title="Analyse" onPress={props.analyseButtonPressed} />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: 0,
  },
  textStyles:{
    marginBottom: 10,
  },
  buttonStyle:{
    marginTop: 40,
    backgroundColor:'#ff844f'
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