import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Footer from "@/Components/HomeComponents/Footer";
import Fundraising from "@/Components/HomeComponents/Fundraising";
import What from "@/Components/HomeComponents/What";
import campaignJson from '../campaigns.json'
import {motion} from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen flex bg-[#F7FAFC]  flex-col container mx-auto w-full items-center justify-center pt-10">
      <div className="relative w-full">
           <motion.div  initial={{scale:1.5,}} animate={{scale:1}} transition={{duration:1,ease:"easeIn"}}> <img src="pictures/Home.png" className="w-full lg:h-full md:h-[75vh] h-[50vh] rounded-md object-cover" alt="Home" /></motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <p className="lg:text-6xl text-3xl md:text-3xl font-bold">THRIVE FUND</p>
          <p className="text-sm text-[#ffffff80] mt-2">We are here to make the world a better place...</p>
          <div className="pt-20 flex justify-center">
            <Button px="20px" py="12px" text="Get Started" to="#"/>
          </div>
        </div>
      </div>
          <What />
        <h1 className="font-bold  pt-10 lg:text-4xl text-2xl md:text-3xl loraa">Campaigns</h1>
    <motion.div className="flex-row items-center justify-center pb-10 pt-3 flex flex-wrap gap-3" initial={{opacity:0.5, y:60}} whileInView={{opacity:1,y:0}} transition={{duration:1,}}>{campaignJson.map((item) => 
    <Card key={item.id} image={item.image} campaignName={item.campaignName} cases={item.cases} text={item.text} link={item.link}/>
  )}</motion.div>  

  <div><Fundraising />
  <Footer /></div>
            </div>
  );
}
