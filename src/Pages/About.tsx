import Footer from '@/Components/HomeComponents/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion'
import {motion} from 'framer-motion'

 
export default function About() {
  return (
    <div className="min-h-screen flex bg-[#F7FAFC] items-center  flex-col container mx-auto w-full  justify-center p-10">
         <div className="relative w-full">
           <motion.div  initial={{scale:1.5,}} animate={{scale:1}} transition={{duration:1,ease:"easeIn"}}>
             <img src="pictures/About.jpg" className="w-full lg:h-full md:h-[50vh] h-[40vh] rounded-md object-cover" alt="About" />
             </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <p className="lg:text-6xl text-3xl md:text-3xl font-bold">THRIVE FUND</p>
        </div>
      </div>

      <div >
        <p className="font-bold  pt-10 pb-5 lg:text-4xl text-2xl md:text-3xl">Our Vision</p>
        <p className='text-sm'>We believe that everyone has the right to live a healthy and fulfilling life. We are committed to providing support to individuals with medical conditions, ensuring that every child has the opportunity to learn and grow, and helping families in need of immediate assistance.</p>
      </div>
         <div>
        <p className="font-bold  pt-10 pb-5 lg:text-4xl text-2xl md:text-3xl">Our Mission</p>
        <p className='text-sm'>Our mission is to provide a platform for individuals who have medical needs, educational aspirations, or immediate needs. We connect them with individuals and organizations that are willing to offer financial assistance. Our goal is to make it easier for people to get the help they need, when they need it.</p>
      </div>
      <div>
      <p className="font-bold  pb-5  pt-10 lg:text-4xl text-2xl md:text-3xl">How We Help</p>
      <div className='flex gap-4 flex-col  md:flex-row lg:flex-row py-5'>
       <div className='w-[320px] h-[150px] shadow-xl flex flex-col justify-center border-2  px-8  rounded-lg' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
<p className='font-bold'>Medical</p>
<p>Support for medical bills, treatment, and therapy</p>
       </div>
           <div className='w-[320px] h-[150px] shadow-xl flex flex-col justify-center border-2  px-8  rounded-lg' >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>

<p className='font-bold'>Education</p>
<p>Help with school fees, supplies, and tuition</p>
       </div>
       
           <div className='w-[320px] h-[150px] shadow-xl flex flex-col justify-center border-2  px-8  rounded-lg' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
<p className='font-bold'>Medical</p>
<p>Support for medical bills, treatment, and therapy</p>
       </div>
         <div className='w-[320px] h-[150px] shadow-xl flex flex-col justify-center border-2  px-8  rounded-lg' >
     <img src='icons/rice.svg' className='w-8 h-8'/>
<p className='font-bold'>Other needs</p>
<p>Assistance with food, shelter, and other essentials</p>
       </div>
       </div>
      </div>
       <p className="font-bold  pb-5  pt-10 lg:text-4xl text-2xl md:text-3xl">Frequently Asked Questions</p>
       
       <div>
<Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="item-1">
        <AccordionTrigger>Do we stand to benefit?</AccordionTrigger>
        <AccordionContent>
          No. We have a 0% platform fee for organizers. Except you decide to leave an optional amount.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is my donation tax-deductible?</AccordionTrigger>
        <AccordionContent>
          Yes, your donation may be tax-deductible. Please consult with your tax advisor for more information.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How can I become a fundraiser organizer?</AccordionTrigger>
        <AccordionContent>
         To become a fundraiser organizer, please contact us through our website or email us at organizer@example.com.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
       </div>
      <Footer />
    </div>
  )
}
