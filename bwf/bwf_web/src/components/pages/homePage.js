import React, {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import Sidebar from './Sidebar'
import Main from './Main'
import {AuthContext} from '../context/AuthContext'

const HomePage = () => {
    let [listEvents, setListEvents] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    

    let getEvents = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/groups/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        
        let data = await response.json()
        if(response.data === 200){
            setListEvents(data)
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }
    
    useEffect(() => {
        getEvents()
    }, [])
    
    return (
        <div>
            <p>You're in main page</p>
            <div className='main-content'>
                <Sidebar />
                <Main />
            </div>
            
            <ul>
                {
                    listEvents.map(event => (
                        <li key={event.id}>{event.name}</li>
                    ))
                }
            </ul>

            
        </div>
    )
}

export default HomePage

