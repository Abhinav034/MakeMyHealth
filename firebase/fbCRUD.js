import firebase from 'firebase'

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
    await firebase.database().ref(`/users/${user.uid}/healthData`)
    .set(data)
}

const fbfetchHealthData = () => {
    var obj = null;
    const user = firebase.auth().currentUser;
    firebase.database().ref(`/users/${user.uid}/healthData`)
    .on('value', async snapshot => {
        obj = await snapshot.val()
        
    })
    console.log(obj)
    return obj

}

export  {
    fbInsertUserName,
    fbInsertUserData,
    fbFetchUserName,
    fbFetch,
    fbInsertHealthData,
    fbfetchHealthData,

}