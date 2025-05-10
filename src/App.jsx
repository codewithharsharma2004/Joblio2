import React from 'react'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/landing'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/JobListing'
import Jobpage from './pages/Job'
import PostJob from './pages/PostJob'
import SaveJob from './pages/SaveJob'
import MyJobs from './pages/MyJobs'
import { ThemeProvider } from './components/ui/theme-provider'
import ProtectedRoute from './components/protected-route'
// import { ClerkProvider } from '@clerk/clerk-react';


const router = createBrowserRouter([{


  element:<AppLayout />,
  children:[
    {
    path:"/",
    element:<Landing/>,
  },
  {
    path:"/onboarding",
    element:(
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path:"/jobs",
    element:(
      <ProtectedRoute>
        <JobListing/>
      </ProtectedRoute>
    ),
  },
  {
    path:"/job/:id",
    element:(
      <ProtectedRoute>
        <Jobpage/>
      </ProtectedRoute>
    ),
  },
  {
    path:"/post-job",
    element:(
      <ProtectedRoute>
         <PostJob/>
      </ProtectedRoute>
    ),
  },
  {
    path:"/saved-jobs",
    element:(
      <ProtectedRoute>
        <SaveJob/>
      </ProtectedRoute>
    ),
  },
  {
    path:"/my-jobs",
    element:(
      <ProtectedRoute>
        <MyJobs/>
      </ProtectedRoute>
    ),
  },
  ]
}])

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
