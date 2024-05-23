export default function Footer() {
  return (
    <div className='w-screen py-10 flex flex-col items-center justify-center'>
      <div className='flex flex-col lg:flex-row md:flex-col px-10 lg:px-20 w-full max-w-[1200px] justify-between items-start lg:items-center'>
        <div className='flex flex-col gap-6 mb-10 lg:mb-0'>
          <p className='uppercase font-bold'>About</p>
          <p className='text-sm'>Partners</p>
          <p className='text-sm'>How-to</p>
          <p className='text-sm'>Community</p>
        </div>
        <div className='flex flex-col gap-6 mb-10 lg:mb-0'>
          <p className='uppercase font-bold'>Report Violations</p>
          <p className='text-sm'>Policy</p>
          <p className='text-sm'>Disclaimer</p>
          <p className='text-sm'>Missionary</p>
        </div>
        <div className='flex flex-col gap-6 '>
          <p className='uppercase font-bold'>Our Office</p>
          <p className='text-sm w-full lg:w-52'>
            Jalan Rambu Raya Timur No. 18, Kota Administrasi, Jakarta Pusat. ZIP: 10000
          </p>
          <p className='text-sm'>2024 © Emmanuella & Laja's Platform.</p>
        </div>
      </div>
    </div>
  );
}
