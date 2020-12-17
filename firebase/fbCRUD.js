import firebase from 'firebase'

const date = (new Date().getDate()) + "-" + (new Date().getMonth() + 1)

const fbInsertUserName = async (name)=>{
   try {
    const user = firebase.auth().currentUser

    await firebase.database().ref(`/users/${user.uid}/name`)
    .push(name)
   } catch (error) {
       console.log(error)
   }

}

const fbFetchUserName = async ()=>{
    var value = null
    const user = firebase.auth().currentUser
     firebase.database().ref(`/users/${user.uid}/name`)
    .on ('value' ,  snapshot=>{
          snapshot.forEach(async (item)=>{
            value = await item.val().name
        })
    })

    console.log(value)
    return value
}

const fbInsertUserData = async(data)=>{
    
    const user = firebase.auth().currentUser 
      await firebase.database().ref(`/users/${user.uid}/data`)
    .set(data)
}

const fbFetch = ()=>{
    var obj = null
    const user = firebase.auth().currentUser
    firebase.database().ref(`/users/${user.uid}/data`)
    .on('value' , snapshot =>{
        obj = snapshot.val()
    })
    
    // console.log('health data', obj)
    return obj
}



const fbInsertHealthData = async(data) =>{
    const user = firebase.auth().currentUser
    await firebase.database().ref(`/users/${user.uid}/healthData/`).child(date)
    .set(data)
} 

export  {
    fbInsertUserName,
    fbInsertUserData,
    fbFetchUserName,
    fbFetch,
    fbInsertHealthData,
}