import {motion} from 'framer-motion'


export default function Fundraising() {
  return (
    <div className='w- py-6 flex flex-col items-center justify-center bg-white'>
      <div className='w- max-w-5xl container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
          <motion.div 
            initial={{ opacity: 0.5, y: 60 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left'>
              “Fundraising is the gentle art of teaching the joy of giving.”
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0.5, y: -60 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className='flex justify-center lg:justify-end'
          >
                 <div className=' '><img src='/pictures/donate2.jpg' className='w-full rounded-xl max-w-lg' /></div>

          </motion.div>
        </div>
      </div>
      <motion.div initial={{opacity:0.5, y:-60}} whileInView={{opacity:1, y:0}} transition={{duration:1}}>
        <div className='flex flex-col lg:flex-row gap-10 pt-10 items-center'>
          <div className='flex flex-row gap-3 items-center'>
            <img src='icons/quickfundraising.svg' className='w-12 h-12'/>
            <div className='flex flex-col gap-2'>
              <a href='#campaigns'>
                <p className='loraa'>Quick Fundraising</p>
                <p className='lora text-sm w-52'>Find and support the causes you care about with ease.</p>
              </a>
            </div>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <img src='icons/startDonating.svg' className='w-12 h-12'/>
            <div className='flex flex-col gap-2'>
              <a href='#campaigns'>
                <p className='loraa'>Start Donating</p>
                <p className='lora text-sm w-52'>Make an impact today.</p>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
  