import React from 'react'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { makeStyles} from '@material-ui/core';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/employees/Employees'
import Home from './pages/Home'
import ContextProvider from './context/ContextProvider';
import DashboardLayout from './pages/DashboardLayout';
import Godowns from './pages/dashboard/godowns/Godowns';
import CustomizedDialogs from './pages/dashboard/godowns/Godowns';

function App() {
  
  return (
     <ContextProvider>
      <div className='App'>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
          <Route path ="godowns" element={<Godowns/>}/>
            {/* <Route path="home" element={<Home/>}/> */}
          </Route>
        </Routes>
       </BrowserRouter>
     
        
      </div>
  
     </ContextProvider>
  )
}

export default App





