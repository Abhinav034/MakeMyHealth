import React , {useState} from 'react'
import {View , Dimensions , StyleSheet} from 'react-native'
import {Text, Button , ButtonGroup} from 'react-native-elements'
import InputSpinner from "react-native-input-spinner"
import DropDownPicker from 'react-native-dropdown-picker'

const HomeComp = (props)=>{
    const [index , setIndex] = useState(0)

    return <>      
      <View style={{marginVertical: 10 , justifyContent:'center'}}> 
      <Text h3 style={{marginBottom: 15 }}>Gender</Text>
      <ButtonGroup
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
          containerStyle={{height: 40}}
        />
      </View>

      <Text h3 style={{marginVertical: 15}}>Height</Text>
      <View style={{flexDirection:'row' , width:Dimensions.get('window').width , marginBottom: 20}}>
        <Text h4 style={{marginTop:4 , marginRight:3 , marginLeft: 0, color:'grey'}}>Ft:</Text>
      <InputSpinner
          rounded={false}
          showBorder
          fontSize={18}
          height={35}
          width={Dimensions.get('window').width/2-50}
          max={8}
          min={4}
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
          fontSize={18}
          height={35}
          width={Dimensions.get('window').width/2-50}
          max={12}
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
      <Text h3 style={{marginVertical: 15}}>Weight</Text>
      <View style={{flexDirection:'row'}}>
      <Text h4 style={{marginTop:4 , marginHorizontal:20 , color:'grey'}}>Kg:</Text>
      <InputSpinner
          rounded={false}
          showBorder
          fontSize={20}
          height={35}
          width={Dimensions.get('window').width/2}
          max={200}
          min={30}
          step={1}
          colorMax={"#f04048"}
          colorMin={"#40c5f4"}
          value={props.weight}
          onChange={(num) => {
            props.weightChanged(num);
          }}
      />
      </View>

      <Text h3 style={{marginVertical: 15}}>Age</Text>
      <View style={{marginHorizontal: 70}}>
      <InputSpinner
          rounded={false}
          showBorder
          fontSize={20}
          height={35}
          width={Dimensions.get('window').width/2}
          max={100}
          min={15}
          step={1}
          colorMax={"#f04048"}
          colorMin={"#40c5f4"}
          value={props.age}
          onChange={(num) => {
              props.ageChanged(num);
          }}
      />
      </View>

     <View style={{marginTop:40 , zIndex:10}}>
      <DropDownPicker
            items={[
                {label: 'sedentary (little or no exercise)', value: 1.2},
                {label: 'lightly active (light exercise/sports 1-3 days/week)', value: 1.375},
                {label: 'moderately active(moderate exercise/sports 3-5 days/week)', value: 1.55},
                {label: 'very active(hard exercise/sports 6-7 days a week)', value: 1.725},
                {label: 'extra active(very hard exercise/sports & physical job or 2x training) ', value: 1.9}

            ]}
            
            placeholder='Your Lifestyle'
            defaultValue={null}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start',
         
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => props.lifestyleChanged(item.value)}
      />

     </View>
      


    <Button style={{marginTop: 50}} title="Analyse" onPress={props.analyseButtonPressed} />
  
    </>
}

const styles = StyleSheet.create({
  textStyles:{
    marginBottom: 10,
  }
})

export default HomeComp