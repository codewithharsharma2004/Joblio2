import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase =  await supabaseClient(token);

    const{data,error} = await supabase.from("companies").select("*");

    if (error) {
        console.error("Error Fetching Companies:" ,error)
        
    }
    return data;
    
}





export async function addNewCompany(token,_,CompanyData) {
    const supabase =  await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${CompanyData.name}`;

    const {error:storageError} = await supabase.storage.from("resumes").upload(fileName, CompanyData.logo)


    if (storageError) {
        console.error("Error Uploading Company Logo" ,storageError);
        return null;
    }

    const logo_url = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;


    const{data,error} = await supabase.from("companies")
    .insert([{
        name:CompanyData.name,
        logo_url,
    }])
    .select();

    if (error) {
        console.error("Error Submiting Company" ,error)
        
    }
    return data;
    
}
