import {motion} from 'framer-motion'

export default function Fundraising() {
  return (
    <div className='w-screen py-6 flex flex-col items-center justify-center bg-white'>
 <div className='lg:flex-row flex-col md:flex-col flex px-20 gap-10 items-center'>
    <motion.div  initial={{opacity:0.5, x:60}} whileInView={{opacity:1,x:0}} transition={{duration:1,}}><p className='lg:text-5xl md:text-4xl text-3xl font-bold'>“Fundraising is the gentle art of teaching the joy of giving.”</p></motion.div>
 <motion.div  initial={{opacity:0.5, x:-60}} whileInView={{opacity:1,x:0}} transition={{duration:1,}}><img src='pictures/Video.png'/></motion.div>
 </div> 
 <motion.div  initial={{opacity:0.5, y:-60}} whileInView={{opacity:1,y:0}} transition={{duration:1,}}>
    <div className='lg:flex-row flex-col md:flex-col  flex gap-10 pt-10 items-center'>
     <div className='flex-row flex gap-3'>
        <img src='icons/quickfundraising.svg'/>
 <div className='flex-col flex gap-2 '>
    <p className='loraa'>Quick Fundraising</p>
    <p className='lora text-sm w-52'>Find and support the causes you care about with ease.</p>
 </div>
 </div>
  <div className='flex-row flex gap-3'><img src='icons/startDonating.svg'/>
 <div className='flex-col flex gap-2 '>
    <p className='loraa'>Start Donating</p>
    <p className='lora text-sm w-52'>Make an impact today.</p>
 </div>
 </div>
</div></motion.div>
    </div>
  )
}
