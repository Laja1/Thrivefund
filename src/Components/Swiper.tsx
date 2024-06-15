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
  return (
    <div className="p-4 w-[350px] items-center justify-center md:w-[640px] lg:w-full">
       
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        autoplay={{ delay: 3000 }}
        
        centeredSlides
        pagination={{ clickable: true }}
         breakpoints={{
    // On screens smaller than 640px, show 1 slide
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // On screens between 640px and 768px, show 2 slides
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    // On screens larger than 768px, show 3 slides
    768: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  }}
>
        {donors.length === 0 ? (
          <SwiperSlide>No donors found.</SwiperSlide>
        ) : (
          donors.map((donor, index) => (
            <SwiperSlide key={index}  className="bg-white  p-4 rounded-lg shadow-md">
            <div className=''>  <div className="mb-2 ">
                <span className="font-bold">Name:</span> {donor.anonymity === "anonymous" ? "Anonymous" : donor.donorName || "N/A"}
              </div>
              <div className="mb-2">
                <span className="font-bold">Amount:</span> ₦ {donor.amount.toLocaleString()}
              </div>
              <img src='/pictures/donate.png' alt='Donation' className='mt-2' /></div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
