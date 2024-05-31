import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FundCard from "@/Components/FundCard";
import { motion } from 'framer-motion';

type Fundraiser = {
  id: string;
  amountRaised: number;
  goal: number;
  image: string;
  title: string;
  donations: number;
};

export default function Others() {
  const [data, setData] = useState<Fundraiser[]>([]);
  const { link } = useParams<{ link: string }>();
console.log(link)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/fundraiser/${link}`)
      .then(res => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, [link]);

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
      <h1 className="text-3xl pt-3 text-center font-bold">Others Cases</h1>
      <motion.div className="flex-row items-center justify-center pb-10 pt-3 flex flex-wrap gap-3" initial={{ opacity: 0.5, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        {data.map((item) => (
          <Link to={`/details/${item.id}`} key={item.id}>
            <FundCard
              width={(item.amountRaised / item.goal) * 100}
              goal={item.goal}
              amountRaised={item.amountRaised}
              image={item.image}
              title={item.title}
              donations={item.donations}
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
