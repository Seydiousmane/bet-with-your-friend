import React from 'react'
import GroupList from './Group_list'
import { Route, Routes } from 'react-router-dom'
import GroupDetail from './GroupDetail'
import PrivateRoutes from '../utils/PrivateRoutes'


const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GroupList />} />

        <Route element={<PrivateRoutes/>}>
            <Route path='/details/:id' element={<GroupDetail />} />
        </Route>
        
      </Routes>
        
    </div>
  )
}

export default Main