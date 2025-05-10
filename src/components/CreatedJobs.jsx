import { getMyJobs } from '@/api/apijobs';
import useFetch from '@/hooks/use.fetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/JobCard';

const CreatedJobs = () => {
    const {user} = useUser();

    const{
        loading: loadingCreatedJobs,
        data: CreatedJobs ,
        fn: fnCreatedjobs,
    } = useFetch(getMyJobs,{
        recruiter_id: user.id,
    });

    useEffect(()=>{
        fnCreatedjobs();
    },[]);

    if (loadingCreatedJobs) {
        return <BarLoader className='mb-4' width={"100%"} color='#708090' />
        
    }

  return (
    <div>
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {CreatedJobs?.length? (
            CreatedJobs.map((job)=>{
                return (
                    <JobCard 
                    key={job.id}
                    job={job}
                    onjobSaved={fnCreatedjobs}
                    isMyJob
                    />
                )
            })

        ) : (
            <div> No Jobs Found 😢 </div>
        )}

      </div>
    </div>
  )
}

export default CreatedJobs
