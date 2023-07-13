import React, {useContext, useState, useEffect, createContext} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    
    let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
    const navigate = useNavigate()
    let loginUser = async(e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        } else {
            alert('Something went wrong!')
        }
    }


    let updateTokens = async() => {
        let response = await fetch('http://127.0.0.1:8000api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            
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