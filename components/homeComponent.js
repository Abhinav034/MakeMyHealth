import React , {useState} from 'react'
import {View , Dimensions , StyleSheet} from 'react-native'
import {Text, Button , ButtonGroup} from 'react-native-elements'
import InputSpinner from "react-native-input-spinner"
import DropDownPicker from 'react-native-dropdown-picker'

const HomeComp = (props)=>{
    const [index , setIndex] = useState(0)

    return <View>      
      <View style={{marginVertical: 10 , justifyContent:'center'}}> 
      <Text h4 style={{marginBottom: 15 , color:"white" }}>Gender</Text>
      <ButtonGroup selectedButtonStyle={{backgroundColor:'#991c1c'}}
          onPress={index => {
            setIndex(index)
            switch(index){
              case 0:
                  props.genderChanged('M')
              break;
              case 1:
                  props.genderChanged('F')
              break;
              
          }
          }}
          selectedIndex={index}
          buttons={['Male' , 'Female']}
          containerStyle={{height: 40 , backgroundColor:'transparent'}}
        />
      </View>

      <Text h4 style={{marginVertical: 15 , color:"white"}}>Height</Text>
      <View style={{flexDirection:'row' , width:Dimensions.get('window').width , marginBottom: 20}}>
        <Text h4 style={{marginTop:4 , marginRight:3 , marginLeft: 0, color:'white'}}>Ft:</Text>
      <InputSpinner
          rounded={false}
          showBorder
          fontSize={18}
          inputStyle={{color:'white'}}
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
      <Text h4 style={{marginTop:4 , marginHorizontal:3, color:'white'}}>In:</Text>
       <InputSpinner
          rounded={false}
          showBorder
          fontSize={18}
          inputStyle={{color:'white'}}
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
      <Text h4 style={{marginVertical: 15 , color:"white"}}>Weight</Text>
      <View style={{flexDirection:'row'}}>
      <Text h4 style={{marginTop:4 , marginHorizontal:20 , color:'white'}}>Kg:</Text>
      <InputSpinner
          rounded={false}
          showBorder
          fontSize={20}
          inputStyle={{color:'white'}}
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

      <Text h4 style={{marginVertical: 15 , color:"white"}}>Age</Text>
      <View style={{marginHorizontal: 70}}>
      <InputSpinner
          rounded={false}
          showBorder
          fontSize={20}
          inputStyle={{color:'white'}}
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

     <View style={{marginTop:40,height:190, zIndex:1}}>
      <DropDownPicker
            items={[
                {label: 'sedentary (little or no exercise)', value: 1.2 , color:'white'},
                {label: 'lightly active (light exercise/sports 1-3 days/week)', value: 1.375},
                {label: 'moderately active(moderate exercise/sports 3-5 days/week)', value: 1.55},
                {label: 'very active(hard exercise/sports 6-7 days a week)', value: 1.725},
                {label: 'extra active(very hard exercise/sports & physical job or 2x training) ', value: 1.9}

            ]}
            
            placeholder='lightly active (light exercise/sports 1-3 days/week)'
            labelStyle={{color:'white'}}
            defaultValue={props.lifestyle}
            containerStyle={{height: 40}}
            style={{backgroundColor: 'transparent'}}

            itemStyle={{
                justifyContent: 'flex-start',
            }}
            
            dropDownStyle={{backgroundColor: 'transparent'}}
            onChangeItem={item => props.lifestyleChanged(item.value)}
      />

     </View>
      


 
   <Button type="outline" titleStyle={{color:'white'}} buttonStyle={{ borderColor:'red',borderWidth:0.5, width:Dimensions.get('window').width-40}} title="Analyse" onPress={props.analyseButtonPressed} />
   
  
    </View>
}

const styles = StyleSheet.create({
  textStyles:{
    marginBottom: 10,
  }
})

export default HomeComp