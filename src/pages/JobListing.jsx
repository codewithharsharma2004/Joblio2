// import React from 'react'

import { getCompanies } from "@/api/apicompanies";
import { getJobs } from "@/api/apijobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetch from "@/hooks/use.fetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { Dice1 } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  
const{isLoaded} = useUser();

const[searchQuery, setSearchQuery] = useState("");
const[location, setSLocation] = useState("");
const[company_id,  setCompany_id] = useState("");

const{
  fn:fnJobs,
  data: Jobs,
  loading:loadingJobs,
} = useFetch(getJobs,{
  location,
  company_id,
  searchQuery,
});



const{
  fn:fnCompanies,
  data: companies =[],
} = useFetch(getCompanies);



useEffect(()=>{
  if(isLoaded) fnCompanies();
  fnJobs()
}, [isLoaded]);

// const {fn:fnJobs ,data:dataJobs, loading:loadingJobs} =  useFetch(getJobs, {});

// console.log(dataJobs)



useEffect(()=>{
  if(isLoaded) fnJobs();
  fnJobs()
}, [isLoaded,location,company_id,searchQuery ]);


const handleSearch=(e)=>{
  e.preventDefault();
  let formData = new FormData(e.target);

  const query = formData.get("search-query");
  if (query) setSearchQuery(query);
  
}


const clearFilters =()=>{
  setSearchQuery("");
  setSLocation("");
  setCompany_id("");
}

if(!isLoaded){
  return <BarLoader  className='mb-4' width={"100%"} color=' #708090'/>
}


  return (
    <div>
      <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text
       font-extrabold text-7xl sm:text-8xl tracking-tighter  font-extrabold text-6xl sm:text-7xl text-center pb-8 ">Latest Jobs</h1>

       {/* filters */}
       <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3  bg-gray-950">
       <Input type="text" placeholder="Search Jobs by Title.."
              name="search-query"
              className="h-full flex-1 px-4 text-md bg-gray-950 " 
        />

        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
       </form>

       <div className="flex flex-col sm:flex-row gap-2 bg-gray-950">
       <Select value={location} onValueChange={(value)=>setSLocation(value)} >
      <SelectTrigger className="w-full" >
        <SelectValue placeholder="Filter by Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry("IN").map(( {name} )=>{
          return(
          <SelectItem key={name} value={name} > {name}
          </SelectItem>
          );
        })}
        </SelectGroup>
      </SelectContent>
    </Select>

     

    <Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {companies?.map(( {name, id} )=>{
          return(
          <SelectItem key={id} value={id}>{name}
          </SelectItem>
          );
        })}
        </SelectGroup>
      </SelectContent>
    </Select>


    <Button variant='destructive' className="w-28 " onClick={clearFilters}>Clear Filter</Button>

     </div>


       {loadingJobs && (
        <BarLoader  className='mb-4' width={"100%"} color=' #708090'/>
       )}

       {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Jobs?.length ?(
             Jobs.map((job)=>{
              return <JobCard key={job.id} job={job}
              savedInit={job?.saved?.length>0}
              />
              // return <span>{job.title}</span>
              
             })
          ) :(
            <div>No Jobs Found 😥</div>
          )}
          </div>
       )}
    </div>
  )
}

export default JobListing
