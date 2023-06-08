import React, {useEffect, useState, Fragment} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { DateTime } from 'luxon'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import AlarmIcon from '@material-ui/icons/Alarm'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  dateTime: {
    fontSize: '18px',
    marginRight: '3px',
    color: 'red'
  }
})

function GroupDetail() {
  const classes = useStyles()
  const {id} = useParams()
  const [datagroup, setDataGroup] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  

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

  if (error) return <h1>Error</h1>


  const {name, description, events} = datagroup
  return (
    <Fragment>
      <Link to={'/'}>Back</Link>
      
      <h1>{name}</h1>
      <h2>{description}</h2>
      <h3>Events</h3>
      
      {
          events?.map(dataevent => {
            
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
      
      
      
    </Fragment>
  )
  
  
}

export default GroupDetail