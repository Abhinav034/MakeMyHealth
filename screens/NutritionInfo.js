import React,{useEffect , useState} from 'react'
import {View, StyleSheet, Button} from 'react-native'
import {Input, Text} from 'react-native-elements'





const NutritionScreen = ()=>{
    
    const [data , setData] = useState('')
    var [search_kw, setFood] = useState('')
    





        useEffect(()=>{
            
            // fetch(url)
            // .then(response => response.json())
            // .then(data => setData(data))
           
            //fetchData(search_kw)

        },[]) 

         
        const fetchData = async (search_kw_p)=>{
            try {
                console.log(search_kw_p)
                var search = search_kw_p.split(' ').join('%20')
                console.log(search)
                var url = `https://api.edamam.com/api/nutrition-data?app_id=651febce&app_key=f04e2edaad63025bfce70088ca6b792c&ingr=${search}`
                console.log('url -' ,url)
                const res = await fetch(url)
                const data_from_api = await res.json()

                var final_data = ""
                
                var k = Object.keys(data_from_api.totalNutrients)
                var v = Object.values(data_from_api.totalNutrients)

                for (var i = 0 ; i < k.length; i++){

                    
                    final_data += `${v[i].label} : ${parseFloat(v[i].quantity).toFixed(2)} ${v[i].unit}\n`

                }

                setData(final_data)

            } catch (error) {
                console.log(error)
            }
        }



    return <View>
        
        


        <Input  style={styles.data} onChangeText={value=>setFood(value)} placeholder='Enter Food' value={search_kw}></Input>
        
        <Button style={styles.data} title='Get Information' onPress={()=>fetchData(search_kw)}></Button> 
        <Text style={styles.data}>{data}</Text>
    </View>
}


const styles = StyleSheet.create({
    
    data: {
        
        margin: 100
        
    }
});

export default NutritionScreen