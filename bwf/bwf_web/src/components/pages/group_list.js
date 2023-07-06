import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function GroupList() {
  const [datagroups, setDataGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=> {
    setLoading(true)
    const getData = async() => {
      try{
        const response = await axios('http://127.0.0.1:8000/api/groups/')
        console.log(response.data)
        setDataGroups(response.data)
        setLoading(false)
      } catch (e){
        console.log(e)
        setError(true)
        setLoading(false)
      }
    }
    
    getData()
  }, [])
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error</h1>

  return (
    <div className='App'>
      <header className='App-header'>
      {
        datagroups.results?.map(data => {
          const {id, name, location, description} = data
          console.log(data)
          return <Link key={id} to={`/details/${id}`}>
            <div>
              <p>{name}: {location}</p>
            </div>
          </Link>
        })
      }

     

      </header>
    
    </div>
  )
}

export default GroupList