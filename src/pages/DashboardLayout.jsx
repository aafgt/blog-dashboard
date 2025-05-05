import React from 'react'
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="flex-auto flex">
        <Sidebar />
        <div className="w-full m-5">
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout;