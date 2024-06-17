import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FundCard from "@/Components/FundCard";
import { motion } from 'framer-motion';
import ClipLoader from "react-spinners/ClipLoader";

type Fundraiser = {
  _id: string;
  amountRaised: number;
  goal: number;
 fundingMedia: { pathToFile: string }[];
  fundraiserTitle: string;
  donations: number;
};

export default function Educational() {
  const [data, setData] = useState<Fundraiser[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { link } = useParams<{ link: string }>();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/fundraiser/Education`)
      .then(res => {
        setData(res.data);
         setTimeout(() => {
          setLoading(false); // Stop loading after 3 seconds
        }, 3000);
     
      })
      .catch(err => console.error(err)) 
       setTimeout(() => {
          setLoading(false); // Stop loading after 3 seconds
        }, 3000);
  }, [link]);


  if (loading) {
    return <div className="bg-white min-h-screen w-full items-center justify-center flex"> <ClipLoader
          color='#000'
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        /></div>;
  }
  
  return (
    <div className="min-h-screen items-center flex bg-[#F7FAFC] flex-col container mx-auto w-full p-10">

      <h1 className="text-3xl pt-3 text-center loraa font-bold">Educational Cases</h1>
      {data.length === 0 ? (
      <div className=" w-full pt-10 items-center justify-center flex">There are currently no campaigns at this moment.</div>
      ) : (
        <motion.div className="items-center justify-center pb-10 pt-3 lg:grid-cols-4 grid md:grid-cols-2 grid-cols-1 gap-3" initial={{ opacity: 0.5, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {data.map((item) => (
            <Link to={`/details/${item._id}`} key={item._id}>
              <FundCard
                width={(item.amountRaised / item.goal) * 100}
                goal={item.goal}
                amountRaised={item.amountRaised}
                image={item.fundingMedia[0].pathToFile}
                title={item.fundraiserTitle}
                donations={item.donations}
              />
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
