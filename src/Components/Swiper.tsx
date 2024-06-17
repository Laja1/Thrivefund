import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type Donor = {
  amount: number;
  anonymity: string;
  currency: string;
  donorEmail: string;
  donorName: string;
  fundraiserId: string;
  paymentIntentId: string;
};

export default function Swipe({ donors }: { donors: Donor[] }) {
  if (!donors) {
    return <div>No donors available.</div>;
  }

  return (
    <div className="p-14 w-[330px] items-center justify-center md:w-[640px] lg:w-full">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        centeredSlides
        
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: false, // Hide pagination on small screens
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 40,
            pagination: false, // Hide pagination on medium screens
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 50,
            pagination: { clickable: true }, // Show pagination on large screens
          },
        }}
      >
        {donors.length === 0 ? (
          <SwiperSlide className='items-center flex justify-center'>No donations yet.</SwiperSlide>
        ) : (
          donors.map((donor, index) => (
            <SwiperSlide key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className='flex-row gap-10  items-center justify-center flex'>
               
              <div className='flex-col gap-2 flex'> 
              <div className="text-sm">
               {donor.anonymity === "anonymous" ? "Anonymous" : donor.donorName || "N/A"}
                </div>
                <div className="text-sm">
                ₦ {donor.amount.toLocaleString()}
                </div></div>
               <div className='items-center flex justify-center'><img src='/icons/giving.svg' alt='Donation' className='mt-2 h-[50px]' /></div> 
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
