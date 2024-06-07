import react, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { SignInStack, SignOutStack } from './AppNavigator';

const AuthNavigation=()=>{

const [currentUser,setCurrentUser] = useState(null)

const userHandler= user =>
    user?setCurrentUser(user):setCurrentUser(null)

useEffect(()=>{

    auth().onAuthStateChanged(user=>userHandler(user))

},[])

return<>{currentUser?<SignInStack/>:<SignOutStack/>}
</>


}

export default AuthNavigation;