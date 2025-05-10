import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import companies from '../data/companies.json'
import Autoplay from 'embla-carousel-autoplay';
import faqs from '../data/faq.json'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { ChevronDown } from "lucide-react";


const Landing = () => {
  return (
   <main className='flex flex-col gap-10 sm:gap-20  sm:py-20 gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl
    py-4'>
    <section className='text-center'>
    <h1 className='text-2xl sm:text-3xl lg:text-4xl mb-4'>find your</h1>

    <h1 className='flex flex-col items-center justify-center'>
      DREAM JOB
      <span className='flex flex-row items-center justify-center gap-4 mt-2 text-2xl sm:text-3xl lg:text-4xl'>
        with </span>
        <img
          src="/logo.png"
          alt="joblio logo"
          className='h-33 sm:h-44 lg:h-55 object-contain'
        />
        <p className=' text-gray-400 text-5xl'>Search, apply and get hired — all in one place.</p>
    </h1>
    <p className='text-white sm:mt-4 text-xs sm:text-xl'> 
    Discover thousands of opportunities that match your skills and goals.
    </p>
  </section>
    <div className='flex gap-6 justify-center'>
      <Link to='jobs'>
      <Button variant="blue" size="xl">Find Jobs</Button>
      </Link>
      <Link to='post-job'>
      <Button variant="destructive" size="xl"> Post a Job</Button>
      </Link>
      
    </div>


    {/* carousel */}

    <Carousel plugins={[
      Autoplay({delay:1000 ,loop:true})
    ]}
      className="w-full py-10"
    >
      <CarouselContent className="felx gap-5 sm:gap-20 items-center">
        
       {companies.map(({name,id,path})=>{
       return <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
        <img 
        src={path}
         alt={name}
         className='h-9 sm:h-14 object-contain' />
       </CarouselItem>
       })}
      </CarouselContent>
    </Carousel>


    {/* banner */}

    <img src="/banner.png" className='w-full' />



    <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 '>
      {/* cards */}

      <Card className="hover:shadow-lg transition-shadow rounded-2xl">
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold">For Job Seekers</CardTitle>
          <CardDescription className="mt-2 text-gray-400">
            Apply smart, get hired quicker and more.
          </CardDescription>
        </CardContent>
      </Card>

<Card className="hover:shadow-lg transition-shadow rounded-2xl">
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold">For Employers</CardTitle>
          <CardDescription className="mt-2 text-gray-400">
          Post a job and discover potential.
          </CardDescription>
        </CardContent>
      </Card>

    </section>

     {/* Accordion */}
     <Accordion type="single" collapsible className="w-full  mx-auto">
  {faqs.map((faq, index) => (
    <AccordionItem
      key={index}
      value={`item-${index + 1}`}
      className="border rounded-2xl mb-3 shadow-sm bg-transparent"
    >
      <AccordionTrigger className="text-sm font-medium px-4 py-3 flex justify-between ">
        <span>{faq.question}</span>
        <ChevronDown className="h-4 w-4" />
      </AccordionTrigger>
      <AccordionContent className="text-xs px-4 pb-3 text-muted-foreground">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>


   </main>
  )
}

export default Landing
