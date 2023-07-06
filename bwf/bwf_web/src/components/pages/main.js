import React from 'react'
import GroupList from './group_list'
import { Route, Routes } from 'react-router-dom'
import GroupDetail from './group_detail'

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GroupList />} />
        <Route path='/details/:id' element={<GroupDetail />} />
      </Routes>
        
    </div>
  )
}

export default Main