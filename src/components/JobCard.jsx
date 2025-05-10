import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import useFetch from '@/hooks/use.fetch'
import { deleteJob, saveJob } from '@/api/apijobs'
import { BarLoader } from 'react-spinners'

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onjobSaved = ()=> {},
    
}) => {

    const [saved, setSaved] = useState(savedInit)

    const{
        fn:fnSavedJob,
        data: savedJob,
        loading:loadingSavedJob,
      } = useFetch(saveJob,{
        alreadySaved: saved,
      });

// const {user} = useState()
const user = JSON.parse(localStorage.getItem("user")) || {};



const handleSavedJob = async() =>{

    const newSavedState = !saved;
    setSaved(newSavedState);

    await fnSavedJob({
        user_id:user.id,
        job_id:job.id,
    })
    // setSaved(true);
    onjobSaved();
};

const {
  loading: loadingDeleteJob,
  fn: fnDeleteJob
} = useFetch(deleteJob,{
  job_id: job.id,
})

const handleDeleteJob = async()=>{
  await fnDeleteJob()
  onjobSaved()
}

useEffect(()=>{
    if (savedJob !== undefined) setSaved(savedJob?.length>0) 
        
    
}, [savedJob])


  return <Card className="bg-white/5 backdrop-blur-md flex flex-col">
    {loadingDeleteJob && (
      <BarLoader className='mb-4' width={"100%"} color='#708090' />
    )}
    <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {job.title}
            {isMyJob && (
            <Trash2Icon fill="red" size={18} className='text-red-300 cursor-pointer' onClick={handleDeleteJob}/>
        )}
        </CardTitle>
        
    </CardHeader>
    
    <CardContent className=" flex flex-col gap-4 flex-1">
        <div className='flex justify-between'>
            {job.company && <img src={job.company.logo_url} className="h-6" />}
        </div>
        <div className='flex gap-2 items-center'>
            <MapPinIcon size={15} /> {job.location}
        </div>
        <hr />
        {job.description}
        
    </CardContent>
 
    <CardFooter className="flex gap-2"> 
      <Link to={`/job/${job.id}`} className='flex-1'>
      <Button variant="secondary" className="w-full">More Details</Button>
      </Link>
      {!isMyJob && (
        <Button variant="outline" className="w-15" 
        onClick={handleSavedJob}
        disabled={loadingSavedJob} >
          {saved? (
          <Heart size={20} stroke='red' fill='red'/>
          ) : (
            <Heart size={20} />
          )
          }
         
        </Button>
      )}
       
       </CardFooter>

  </Card>
}

export default JobCard

