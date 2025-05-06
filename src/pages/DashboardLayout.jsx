import React from 'react'
import Sidebar from '../components/Sidebar';
import { NavLink, Outlet } from 'react-router';
import { getAuthToken } from '../util/auth';

const DashboardLayout = () => {

  const isAuthenticated = getAuthToken();

  if (!isAuthenticated) {
    return (
      <div className="h-full bg-indigo-900 text-white flex flex-col justify-center items-center text-center max-md:w-[calc(100vw-8rem)]">
        <h1 className="text-8xl max-md:text-5xl max-sm:text-4xl font-bold">Unauthorized!</h1>
        <p className="text-3xl max-md:text-xl">Please login or signup if you don't have an account to access the dashboard.</p>

        <NavLink to="/" className="bg-indigo-500 px-5 py-2 rounded-md uppercase my-5 hover:cursor-pointer hover:bg-indigo-400">
          Login/Signup
        </NavLink>
      </div>
    );
  }

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