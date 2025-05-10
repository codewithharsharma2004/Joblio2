    import { getApplications } from '@/api/apiApplications'
    import useFetch from '@/hooks/use.fetch'
    import { useUser } from '@clerk/clerk-react'
    import React, { useEffect } from 'react'
    import { BarLoader } from 'react-spinners'
    import ApplicationCard from '@/components/ApplicationCard';

    const CreatedApplication = () => {
    const {user} = useUser();
        const {
            loading: loadingApplications,
            data: applications = [],
            fn:fnApplications,
        } = useFetch(getApplications,{
            user_id: user.id,
        });


        useEffect(()=>{
            fnApplications();
        }, []);

        if (loadingApplications) {
            return <BarLoader className='mb-4' width={"100%"} color='#708090'/>
            
        }
    return (
        <div className='flex flex-col gap-2'>
        {applications?.map((application) =>{
            return(
                <ApplicationCard key={application.id} application={application} isCandidate />
            )
        })}
        </div>
    )
    }

    export default CreatedApplication





//     import { useEffect } from 'react'; // useEffect instead of useFetch for side effect

// const CreatedApplication = () => {
//   const { user } = useUser();
//   const {
//     loading: loadingApplications,
//     data: applications = [],
//     fn: fnApplications,
//   } = useFetch(getApplications);

//   useEffect(() => {
//     if (user) {
//       fnApplications({ user_id: user.id });
//     }
//   }, [user, fnApplications]); // run only when user is loaded

//   if (loadingApplications) {
//     return <BarLoader className='mb-4' width={"100%"} color='#708090' />;
//   }

//   return (
//     <div className='flex flex-col gap-2'>
//       {applications?.map((application) => (
//         <ApplicationCard key={application.id} application={application} isCandidate />
//       ))}
//     </div>
//   );
// };
// export default CreatedApplication
