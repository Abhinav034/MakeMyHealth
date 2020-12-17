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
            const res = await fetch('https://api.rainforestapi.com/request?api_key=3079E64C29314CADA1DDB2FD78D1D222&type=search&amazon_domain=amazon.ca&search_term=healthy+foods&sort_by=featured')
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

    return <View style={{flex:1 , backgroundColor:'#333333'}}>
        {console.log('rendering___')}
            <ActivityIndicator animating={indicatorState} size={'large'|| 50} color={'white'} style={{  position: 'absolute',
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
                     <View style={{borderWidth:1 , borderColor:'#858585', padding:10 , marginVertical:8 , backgroundColor:'#d6d6d6'}}>
                <View style={{flexDirection:'row', paddingRight:10}}>
                 <Image style={{width: 130,height: 130}} source={{uri:item.image}}></Image>
                <View>
                <Text style={{width:Dimensions.get('window').width-10 , color:'#242424'}} h4>{item.title.length<50?item.title:item.title.substring(0, 50)}</Text>
                <Text h4 style={{marginRight: 20 , color:'#242424',marginTop:5}}>CAD$ {item.price}</Text>
                 <Text h4 style={{color:'#242424',marginTop:8}}>Rating {item.rating}</Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
            }}
            
            
            
            ></FlatList>
    </View>
}

export default BuyProductsScreen