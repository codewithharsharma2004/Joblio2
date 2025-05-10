import { getSingleJob, updateHiringStatus } from '@/api/apijobs';
import ApplicationCard from '@/components/ApplicationCard';
import AppliedJobDrawer from '@/components/applied-job';
// import { Select } from '@/components/ui/select';
import useFetch from '@/hooks/use.fetch';
import { useUser } from '@clerk/clerk-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, CheckCircle, CircleCheckBig, CircleSlash2, DoorClosed, DoorOpen, MapPin, MapPinIcon, XCircle } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Jobpage  = () => {

const{isLoaded, user} = useUser();
const {id} = useParams();

 const{
  loading:loadingJob,
  data:job,
  fn:fnJob,
 } = useFetch(getSingleJob, {
  job_id: id,
 });


 const {
  loading:loadingHiringStatus,
  fn:fnHiringStatus
 } =useFetch(
  updateHiringStatus,{
    job_id:id
  }
 );

 const handleStatusChange =(value)=>{
  const isOpen = value === "open";
  
  fnHiringStatus(isOpen).then(()=> fnJob());

 }

 useEffect(()=>{
  if (isLoaded) fnJob();
  fnJob()
 },[isLoaded]);




 if (!isLoaded || loadingJob) {
  return <BarLoader className='mb-4' width={"100%"} color='#708090' />
 }


  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text font-extrabold 
        pb-3 text-4xl sm:text-6xl' >
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className='h-12' alt={job?.title} />
      </div>

      <div className='flex justify-between '>
        <div className='flex gap-2'>
          <MapPinIcon />
          {job?.location}
        </div>

        <div className='flex gap-2'>
          <Briefcase/> {job?.applications?.length} Applicants
        </div>
        <div className='flex gap-2'>
          {
            job?.isOpen?(
              <>
              {/* <DoorOpen /> Open */}
              {/* <CheckCircle /> Open */}
              <CircleCheckBig className='text-green-700' /> Open
              </>
            ) : (
              <>
              {/* <DoorClosed /> Closed */}
              {/* <XCircle /> Closed */}
              <CircleSlash2 className="text-red-600" /> Closed
              </>
            )
          }
        </div>
      </div>

   {/* hiring Status */}
   {loadingHiringStatus && <BarLoader width={"100%"} color='#708090' /> }
   {job?.recruiter_id===user?.id && (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger className={`w-full ${job?.isOpen ?  "!bg-green-950" : "!bg-red-950" }`}>
        <SelectValue placeholder={
          "Hiring Status" + (job?.isOpen ? "(Open)" :"(Closed)")
        } />
      </SelectTrigger>
        <SelectContent>
           <SelectGroup>
             <SelectItem value='open'>Open</SelectItem>
             <SelectItem value='closed'>Closed</SelectItem>
           </SelectGroup>
         </SelectContent>
    </Select>
   )}

  <hr />
   <h2 className='text-2xl sm:text-3xl font-bold hover:underline'>About the job</h2>
   <p className='sm:text-lg'>{job?.description}</p>


   <h2 className='text-2xl sm:text-3xl font-bold hover:underline'>
    What we are looking for
   </h2>
   <MDEditor.Markdown source={job?.requirements} className='bg-black' />

{/* render applications */}
   

   {/* {job?.recruiter_id !== user?.id && (
   <AppliedJobDrawer 
    job ={job}
    user ={user}
    fetchJob ={fnJob}
    applied = {job?.applications?.find((ap) => ap.candidate_id === user.id)}
    // applied = {true}
    
  />)}  */}
{ job?.recruiter_id !== user?.id &&(
    <AppliedJobDrawer
      job={job}
      user={user}
      fetchJob={fnJob}
      applied= {job?.applications?.some((ap)=>ap.candidate_id === user.id)}
    />
)}


{
  job?.applications?.length >0 && job?.recruiter_id === user?.id && (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl sm:text-3xl font-bold hover:underline'>Applications</h2>
      {job?.applications.map((application)=>{
        return<ApplicationCard key={application.id} application={application}/>
      })}
    </div>
  )
}
      
    </div>
  )
}

export default Jobpage;
 