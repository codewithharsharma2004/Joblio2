import Header from '@/components/Header'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const  AppLayout= () => {
  return (
    <div>
       <div className="grid-background"></div> 
       <main className="min-h-screen container mx-auto px-0 py-0 mt-0">
       <Header />
      <Outlet />
      </main> 
      <div className="p-10 text-center bg-gray-800 mt-10"> Joblio
empowering your job search journey.
Discover job opportunities, track your applications, and connect with top employers — all in one place.

<h1>© 2025 Joblio. All rights reserved.</h1>

<p>Contact us:</p>
  <a href="mailto:h56736160@gmail.com" className="text-blue-400 hover:underline">
    📧 h56736160@gmail.com
  </a>


</div>
    </div>
  )
}

export default AppLayout
