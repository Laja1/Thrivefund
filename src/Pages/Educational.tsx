import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "@/customHook/useFetch";
import FundCard from "@/components/FundCard";
import { Fundraiser } from "./type";

export default function Educational() {
  const { data, isLoading, error } = useFetch<Fundraiser[]>({
    url: `${import.meta.env.VITE_BASE_URL}/fundraiser/Education`,
    queryKey: ["educationFundraisers"],
  });
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!data || data.length === 0) {
    return <NoDataState />;
  }

  return (
    <div className="min-h-screen flex bg-[#F7FAFC] flex-col container mx-auto w-full p-10">
      <Link to="/">
        <div className="flex-row flex gap-1 p-2 w-[100px] rounded-md items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <p>Back</p>
        </div>
      </Link>
      <h1 className="text-3xl pt-3 text-center font-bold">
        Educatioinal Cases
      </h1>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center pb-10 pt-3"
        initial={{ opacity: 0.5, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {data.map((item) => (
          <Link to={`/details/${item._id}`} key={item._id}>
            <FundCard
              width={(item.amountRaised / item.goal) * 100}
              goal={item.goal}
              amountRaised={item.amountRaised}
              image={
                item.fundingMedia.length > 0
                  ? item.fundingMedia[0].pathToFile
                  : ""
              }
              title={item.fundraiserTitle}
              donations={item.donations}
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex bg-[#F7FAFC] justify-center items-center">
      <p>Loading...</p>
    </div>
  );
}

function ErrorState({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex bg-[#F7FAFC] justify-center items-center">
      <p>Error: {error.message}</p>
    </div>
  );
}

function NoDataState() {
  return (
    <div className="min-h-screen flex bg-[#F7FAFC] justify-center items-center">
      <p>No applicants found for this category</p>
    </div>
  );
}
