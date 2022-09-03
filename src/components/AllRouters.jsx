import React from 'react'
import{Routes,Route} from "react-router-dom"
import  {Admin}  from './Admin'
import { Login } from './Login'
import { Register } from './Register'

export const AllRouters = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
        </Routes>
    </div>
  )
}
