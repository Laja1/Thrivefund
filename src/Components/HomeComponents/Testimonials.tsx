import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
export default function Testimonials() {
  return (
    <div className="py-10 justify-center flex flex-col items-center bg-gray-100 w-screen">
      <p className="text-3xl   loraa">Testimonials</p>
      <p className="text-md lora">Don’t just take our word for it, hear what the people have to say.</p>
      <div>
        


    <div className="p-14 w-screen -center ">
      <Slider {...settings} autoplay={true} autoplaySpeed={2000}  infinite={true} speed={500}
 >
      <div className="items-center flex justify-center">
              <div className="items-center flex justify-center">
                <div className="bg-white px-5 flex-col items-center flex justify-center w-[300px] rounded-md h-[250px]">
                  <img src="/icons/user.svg" className="w-20" />
                  <p className="loraa">Chisom Ifetade</p>
                  <p className="text-[12px]">Lorem Ipsum is simply dummy text of the any an printing and typesetting industryLorem Ipsum is simply dummy</p>
                </div>
              </div>
      </div>
     <div className="items-center flex justify-center">
              <div className="items-center flex justify-center">
                <div className="bg-white px-5 flex-col items-center flex justify-center w-[300px] rounded-md h-[250px]">
                  <img src="/icons/user.svg" className="w-20" />
                  <p className="loraa">Joshua Ifetade</p>
                  <p className="text-[12px]">Lorem Ipsum is simply dummy text of the any an printing and typesetting industryLorem Ipsum is simply dummy</p>
                </div>
              </div>
      </div>
     <div className="items-center flex justify-center">
              <div className="items-center flex justify-center">
                <div className="bg-white px-5 flex-col items-center flex justify-center w-[300px] rounded-md h-[250px]">
                  <img src="/icons/user.svg" className="w-20" />
                  <p className="loraa">Toluwani Ifetade</p>
                  <p className="text-[12px]">Lorem Ipsum is simply dummy text of the any an printing and typesetting industryLorem Ipsum is simply dummy</p>
                </div>
              </div>
      </div>
      
    </Slider>
    </div>

  
      </div>
    </div>
  )
}
