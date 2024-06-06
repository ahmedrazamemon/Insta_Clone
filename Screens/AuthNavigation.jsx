import react, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { signInStack,signOutStack } from './AppNavigator';
import { useGestureHandlerRef } from '@react-navigation/stack';
import {auth} from 'react-native-firebase/auth'

const AuthNavigation=()=>{

const [currentUser,setCurrentUser] = useState(null)

const userHandler= user =>
    user?setCurrentUser(user):setCurrentUser(null)

useEffect(()=>{

    auth().onAuthStateChanged(user=>userHandler(user))

},[])

return<>{currentUser?<signInStack/>:<signOutStack/>}
</>


}

export default AuthNavigation;