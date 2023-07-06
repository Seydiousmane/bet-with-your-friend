import React, {useContext, useState, useEffect, createContext} from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)
    const navigate = useNavigate()
    let loginUser = async(e) => {
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        if (response.data === 200){
            setAuthTokens(data)
        } else {
            alert('Something went wrong!')
        }
    }


    let updateTokens = async() => {
        let response = await fetch('http://127.0.0.1:8000api/token/refresh/?refresh', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'

            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            
        } else {
            loginUser()
        }
    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        navigate('/')
    }

    useEffect(()=> {
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=> {
            if(authTokens){
                updateTokens()
            }
        }, fourMinutes)
        return clearInterval(interval)
    }, [authTokens])

    
    let contextData = {
        'loginUser': loginUser,
        'authTokens': authTokens,
        'user': user,
        'logoutUser': logoutUser
    }

    return (<AuthContext.Provider value={contextData}>
        {children}

    </AuthContext.Provider>)
   
}