import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FundCard from "@/Components/FundCard";
import { motion } from 'framer-motion';

type BusinessProps = {
  _id: string;
  amountRaised: number;
  goal: number;
  fundingMedia: { pathToFile: string }[];
  fundraiserTitle: string;
  donations: number;
};

export default function Business() {
  const [data, setData] = useState<BusinessProps[]>([]);
  const { link } = useParams<{ link: string }>();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/fundraiser/Business`)
      .then(res => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, [link]);
  if (!data) {
    return <div className="bg-white min-h-screen w-full items-center justify-center flex">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen flex bg-[#F7FAFC] flex-col container mx-auto w-full p-10">
      <Link to='/'>
        <div className="flex-row flex gap-1 p-2 w-[100px] rounded-md items-start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <p>Back</p>
        </div>
      </Link>
      <h1 className="text-3xl pt-3 loraa text-center font-bold">Business Cases</h1>
      <motion.div className="items-center justify-center pb-10 pt-3 lg:grid-cols-3 grid md:grid-cols-2 grid-cols-1 gap-10" initial={{ opacity: 0.5, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      {data.map((item) => {
          const imageUrl = item.fundingMedia.length > 0 ? item.fundingMedia[0].pathToFile : '';
          return (
            <Link to={`/details/${item._id}`} key={item._id}>
              <FundCard
                width={ Math.min((item.amountRaised / item.goal) * 100, 100)}
                goal={item.goal}
                amountRaised={item.amountRaised}
                image={imageUrl}
                title={item.fundraiserTitle}
                donations={item.donations}
              />
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
