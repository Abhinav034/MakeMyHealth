import React, {useState , useEffect} from 'react'
import {View , FlatList , Image , TouchableOpacity , Dimensions , ActivityIndicator} from 'react-native'
import {Text} from 'react-native-elements'

const BuyProductsScreen = ({navigation})=>{

    const [data , setData] = useState({})
    const [indicatorState , setIndicatorState] = useState(true)

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async()=>{
        try {
            const res = await fetch('https://api.rainforestapi.com/request?api_key=2631CEE9EA48471E9677199F8C6D1F40&type=search&amazon_domain=amazon.ca&search_term=healthy+foods&sort_by=featured')
            const data = await res.json()
            
            const results = data.search_results

            var dataArr = results.splice(0, Math.floor(results.length/2)).map((item , index)=>{
               
                return {
                    title: item.title,
                    link: item.link,
                    image: item.image,
                    rating: item.rating,
                    price: item.price.value,
                    key: index
                }
            })
           
            
             setData(dataArr)
             setIndicatorState(false)

        } catch (error) {
            console.log(error)
        }

    
    }

    return <View style={{flex:1 , backgroundColor:'#fff'}}>
            <ActivityIndicator animating={indicatorState} size={'large'|| 50} color={'grey'} style={{  position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'}}/>
            <FlatList
            data = {data}
            keyExtractor={(item)=>`${item.key}`}
            renderItem = {({item})=>{
                return <TouchableOpacity onPress={()=> navigation.navigate('WebView' , {link:item.link})}>
                     <View style={{borderBottomWidth:1 , borderBottomColor:'lightgrey', marginVertical:15 ,paddingBottom:10, backgroundColor:'#fff'}}>
                <View style={{flexDirection:'row', paddingRight:10}}>
                 <Image style={{width: 130,height: 130}} source={{uri:item.image}}></Image>
                <View>
                <Text style={{color:'#242424'}} h4>{item.title.length<25?item.title:item.title.substring(0, 25)}...</Text>
                <Text h4 style={{marginRight: 20 , color:'#242424' ,marginTop:10}}>CAD$ {item.price}</Text>
                 <Text h4 style={{color:'grey' , marginTop:5}}>Rating {item.rating}</Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
                
            }}
            
            
            
            ></FlatList>
    </View>
}

export default BuyProductsScreen