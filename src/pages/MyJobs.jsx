// import React from 'react'

import CreatedApplication from "@/components/CreatedApplication";
import CreatedJobs from "@/components/CreatedJobs";
import { useUser } from "@clerk/clerk-react"
import { BarLoader } from "react-spinners";


const MyJobs = () => {
  const {user, isLoaded} = useUser(); 

  if(!isLoaded){
    return<BarLoader className="mb-4" width={"100%"} color="#708090"/>
  }
  return (
    <div>
      <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text
       font-extrabold  text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
        ? "My Applications"
        : "My Jobs"}
       </h1>


       {user?.unsafeMetadata?.role === "candidate" ?(
        <CreatedApplication />)
        :(<CreatedJobs />)
       }
    </div>
  )
}

export default MyJobs
