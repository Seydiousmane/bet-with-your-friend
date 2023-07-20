import React, {useEffect, useState, Fragment, useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { DateTime } from 'luxon'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import AlarmIcon from '@material-ui/icons/Alarm'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../context/AuthContext'
import { Button } from 'bootstrap'

const useStyles = makeStyles({
  dateTime: {
    fontSize: '18px',
    marginRight: '3px',
    color: 'red'
  }
})

/* const GroupDetail = () => {
  return (
    <div>
      <p>A la molette</p>
    </div>
  )
}
 */
function GroupDetail() {
  const classes = useStyles()
  const {id} = useParams()
  const [datagroup, setDataGroup] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {user} = useContext(AuthContext)
  

  useEffect(()=> {
    setLoading(true)
    
    const getData = async() => {
      try{
        const response = await axios(`http://127.0.0.1:8000/api/groups/${id}`)
        console.log(response.data)
        setDataGroup(response.data)
        
      } catch (e){
        console.log(e)
        setError(true)
        
      }
    }

    getData()
  }, [id])

  const joinGroup = (data) => {
    return fetch('http://127.0.0.1:8000/api/members/join/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
  const joinHere = () => {
    joinGroup({user:user.id, group:datagroup.id}).then(
      res => {console.log(res)}
    )
  }

  if (error) return <h1>Error</h1>


  
  return (
    <Fragment>
      <Link to={'/'}>Back</Link>
      
      <h1>{datagroup.name}</h1>
      <h2>{datagroup.description}</h2>
      <button onClick={() => joinHere()}>Join Group</button>

      <h3>Events</h3>
      
      {
          user && datagroup.events?.map(dataevent => {
            
            const {id, team1, team2, time} = dataevent
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"  
            const evtTime = DateTime.fromFormat(time, format)
            
            return <div key={id}>
                <p>{team1} VS {team2}</p>
                <p>{time}</p>
                <p>
                  <CalendarTodayIcon className={classes.dateTime}/>{evtTime.toSQLDate()}
                  <AlarmIcon className={classes.dateTime}/>{evtTime.toFormat('HH:mm')}
                </p>
              </div>
          })
        }

        <h3>Members</h3>
        {
          datagroup.members?.map(member => {
            return (<div key={member.user.id}>
              <p>{member.user.username} {member.points} pts</p>
            </div>)
          })
        }
      
      
    </Fragment>
  )
  
  
}

export default GroupDetail