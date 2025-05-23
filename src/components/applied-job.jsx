
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {z} from "zod"
import useFetch from '@/hooks/use.fetch'
import {zodResolver} from "@hookform/resolvers/zod"
import { Controller, useForm } from 'react-hook-form'
import { applyToJob } from '@/api/apiApplications'
import { BarLoader } from 'react-spinners'


const schema = z.object({
  experience:z.number().min(0, {message:"Experience must be atleast 0"}).int(),
  skills: z.string().min(1, {message:"Skills are required"}),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message:"Education is required",
  }),
  resume:z.any().refine(File=>File[0] &&
    (File[0].type === "application/pdf" || 
      File[0].type === "application/msword"  ),
      {message:"Only PDF and Word Documents are allowed"}
  )
})


export function AppliedJobDrawer  ({user ,job, applied=false,fetchJob}) {



  const {register, handleSubmit, control, formState:{errors},reset} = useForm({
    resolver:zodResolver(schema),
  });

  const {
    loading:loadingApply,
    error: errorApply,
    fn:fnApply,
  }=useFetch(applyToJob)


  // const [localApplied, setLocalApplied] = React.useState(applied);
  const onSubmit =(data)=>{
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id:user.id,
      name:user.fullName,
      status:"applied",
      resume:data.resume[0],


    }).then(()=>{
      fetchJob();
      // setLocalApplied(true);
      reset();
    })

  }
    
  return (
    <Drawer direction="bottom" open={applied?false:undefined}>
  <DrawerTrigger asChild>
    <Button 
    size="lg"
    variant={job?.isOpen && !applied? "blue" : "destructive"} 
    disabled= {!job?.isOpen || applied}
    >
      {job?.isOpen? (applied? 'Applied' : 'Apply') : 'Hiring closed'}
    </Button>
  </DrawerTrigger>
  <DrawerContent className="z-[9999]">
    <DrawerHeader>
      <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
      <DrawerDescription>Please Fill the form below. </DrawerDescription>
    </DrawerHeader>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 pb-0'>
       <Input
       type="number"
       placeholder="Years of Experience"
       className="flex-1"
       {...register("experience" ,{
        valueAsNumber:true,
       })}
       />
       {errors.experience && (
        <p className="text-red-500">{errors.experience.message}</p>
       )}



      <Input
       type="text"
       placeholder="Skills (Comma Seperate)"
       className="flex-1"
       {...register("skills")}
       /> 
       {errors.skills && (
        <p className="text-red-500">{errors.skills.message}</p>
       )}
      

      <Controller
      name='education'
      control={control}
      render={({field})=>(
        <RadioGroup 
        onValueChange={field.onChange}
        {...field}>

        <div className="flex items-center space-x-2">
           <RadioGroupItem value="Intermediate" id="intermediate" />
             <Label htmlFor="intermediate">Intermediate</Label>
        </div>
        <div className="flex items-center space-x-2">
           <RadioGroupItem value="Graduate" id="graduate" />
              <Label htmlFor="graduate">Graduate</Label>
         </div>
         <div className="flex items-center space-x-2">
           <RadioGroupItem value="Post Graduate" id="post-graduate" />
              <Label htmlFor=" post-graduate">Post Graduate</Label>
         </div>   
     </RadioGroup>
      )}
      />
      {errors.education && (
        <p className="text-red-500">{errors.education.message}</p>
      )}
     

      <Input
      type="file"
      accept=".pdf, .doc, .docx"
      className="flex-1 file:text-gray-500"
      {...register("resume")}
      />
      {errors.resume && (
        <p className="text-red-500">{errors.resume.message}</p>
      )}
      {errorApply?.message && (
        <p className='text-red-500'>{errorApply?.message}</p>
      )}
      {loadingApply && <BarLoader width={'100%'} color='#708090'/>}

    <Button variant="blue" type="submit" size="lg">Apply</Button>


    </form>
    <DrawerFooter>
     
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}

  
export default AppliedJobDrawer
