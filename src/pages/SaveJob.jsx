import { getSavedJobs} from '@/api/apijobs'
import JobCard from '@/components/JobCard'
import useFetch from '@/hooks/use.fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

const SaveJob = () => {

  const {isLoaded} = useUser();


  const {
    loading: loadingSavedJob,
    data: savedjobs,
    fn: fnSavedJob,
  } = useFetch(getSavedJobs);

  useEffect(()=>{
    if(isLoaded) 
      fnSavedJob();
  }, [isLoaded]);
 
  if(!isLoaded || loadingSavedJob) {
    return <BarLoader className='mb-4' width={"100%"} color='#708090' />
  }

  return (
    <div>
      <h1 className='bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent 
      bg-clip-text font-extrabold text:6xl sm:text-7xl text-center pb-8'>
        Saved Jobs
      </h1>

      {loadingSavedJob === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
          savedjobs?.length ?(
             
             savedjobs?.map((saved)=>{
              return <JobCard key={saved.id} job={saved?.job}
              savedInit={true}
              onjobSaved={fnSavedJob}
            
              />
              // return <span>{job.title}</span>
              
             })
          ) :(
            <div>No Saved Jobs Found 👀</div>
          )}
          </div>
       )}
    </div>
  )
}

export default SaveJob
