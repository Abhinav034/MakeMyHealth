import React,{useEffect , useState} from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import {Input, Text} from 'react-native-elements'





const NutritionScreen = ()=>{
    
    const [data , setData] = useState('')

    var [search_kw, setSearch] = useState('')
    const [spinner , setSpinner] = useState(false)



         
        const fetchData = async (search_kw_p)=>{

            console.log('aaaaaa ---', search_kw_p)
            try {

                search_kw_p = search_kw_p.split(' ').join('%20')
                var url = `https://api.edamam.com/api/nutrition-data?app_id=651febce&app_key=f04e2edaad63025bfce70088ca6b792c&ingr=${search_kw_p}`

              
                console.log('url -' ,url)
                setSpinner(true)
                const res = await fetch(url)
                const data_from_api = await res.json()
                
                var final_data = ""
                
                var k = Object.keys(data_from_api.totalNutrients)
                var v = Object.values(data_from_api.totalNutrients)

                for (var i = 0 ; i < 10; i++){

                    
                    final_data += `${v[i].label} : ${parseFloat(v[i].quantity).toFixed(2)} ${v[i].unit}\n\n`

                }



                setData(final_data)
                setSpinner(false)

            } catch (error) {
                console.log(error)
            }
        }



    return <View>
        {console.log('render')}
        
        <ActivityIndicator animating={spinner} size={'large'|| 50} color={'black'} style={{  position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'}}>

        </ActivityIndicator>


    
       <View >
       <Input  style={styles.data} placeholder='Enter Food' 
       value={search_kw}
       onChangeText = {changeText=>setSearch(changeText) }
       onEndEditing={()=> fetchData(search_kw) }></Input>
       </View>
        
        
       
        <View >
        <Text h4 style={{textAlign:'center'}}>{data}</Text>
        </View>
    </View>
}


const styles = StyleSheet.create({
    
    data: {
        
        width: 50 ,
        borderColor:'grey',
        borderWidth: 1,
        padding:2

        
    },
    
});

export default NutritionScreen