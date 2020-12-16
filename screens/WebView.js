import React from 'react'
import { WebView } from 'react-native-webview';

const WebScreen = ({route})=>{

   const {link} = route.params
    return <WebView
    source={{ uri: link}}
    
    ></WebView>
}

export default WebScreen