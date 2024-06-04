export default function Footer() {
  return (
    <div className='w-screen py-10 flex flex-col items-center justify-center'>
      <div className='flex flex-col lg:flex-row md:flex-col px-10 lg:px-20 w-full max-w-[1200px] justify-between items-start lg:items-center'>
        <div className='flex flex-col gap-6 mb-10 lg:mb-0'>
          <p className='uppercase font-bold loraa'>About</p>
          <p className='text-sm lora'>Partners</p>
          <p className='text-sm lora'>How-to</p>
          <p className='text-sm lora'>Community</p>
        </div>
        <div className='flex flex-col gap-6 mb-10 lg:mb-0'>
          <p className='uppercase font-bold loraa'>Report Violations</p>
          <p className='text-sm lora'>Policy</p>
          <p className='text-sm lora'>Disclaimer</p>
          <p className='text-sm lora'>Missionary</p>
        </div>
        <div className='flex flex-col gap-6 '>
          <p className='uppercase font-bold loraa'>Our Office</p>
          <p className='text-sm lora w-full lg:w-52'>
            26 Adeyemo Alakija, Victora Island Lagos.
          </p>
          <p className='text-sm lora'>2024 © Emmanuella & Laja's Platform.</p>
        </div>
      </div>
    </div>
  );
}
