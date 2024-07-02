import { lazy, Suspense } from 'react';
import Button from "@/components/Button";
import campaignJson from '../campaigns.json';
import { motion } from 'framer-motion';

// Lazy load the components
const Card = lazy(() => import('@/components/Card'));
const Footer = lazy(() => import('@/components/HomeComponents/Footer'));
const Fundraising = lazy(() => import('@/components/HomeComponents/Fundraising'));
const What = lazy(() => import('@/components/HomeComponents/What'));

export default function Home() {
  return (
    <div className="min-h-screen flex bg-[#F7FAFC] flex-col container mx-auto w-full items-center justify-center pt-10">
      <div className="relative w-full">
        <motion.div initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: "easeIn" }}>
          <img src="pictures/Home.png" className="w-full lg:h-full md:h-[75vh] h-[50vh] rounded-md object-cover" alt="Home" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeIn" }} className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <p className="lg:text-7xl text-3xl md:text-4xl font-bold">THRIVE FUND</p>
          <p className="text-lg text-[#ffffff90] mt-2">We are here to make the world a better place...</p>
          <div className="pt-20 flex justify-center">
            <Button px="20px" py="12px" text="Learn More" to="/about-us" />
          </div>
        </motion.div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <What />
      </Suspense>

      <div id="campaigns" className="items-center flex flex-col">
        <h1 className="font-bold pt-10 lg:text-4xl text-2xl md:text-3xl loraa">Campaigns</h1>
        <motion.div className="flex-row justify-center pb-10 pt-3 flex flex-wrap gap-3" initial={{ opacity: 0.5, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {campaignJson.map((item) => (
            <Suspense key={item.id} fallback={<div>Loading...</div>}>
              <Card image={item.image} campaignName={item.campaignName} text={item.text} link={item.link} />
            </Suspense>
          ))}
        </motion.div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Fundraising />
        <Footer />
      </Suspense>
    </div>
  );
}
