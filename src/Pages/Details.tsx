import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog } from '@headlessui/react';
// import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import axios from "axios";

type DetailsProps = {
  _id: string;
  amountRaised: number;
  goal: number;
  fundingMedia: { pathToFile: string }[];
  fundraiserTitle: string;
  donations: number;
};

export default function Details() {
  const [complete, setComplete] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<DetailsProps | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    axios.get(`${import.meta.env.VITE_BASE_URL}/fundraiser/${id}`)
      .then(res => {
        setData(res.data);
        if (res.data?.amountRaised >= res.data?.goal) {
          setComplete(true);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const progressPercentage = (data.amountRaised / data.goal) * 100;

  return (
    <div className="min-h-screen flex bg-[#F7FAFC] flex-col container mx-auto w-full justify-center p-10">
      <Link to='/Medical'>
        <div className="flex-row flex gap-1 p-2 w-[100px] rounded-md items-start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <p>Back</p>
        </div>
      </Link>
      <div className="pb-3" />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={data.fundingMedia[0]?.pathToFile} alt={data.fundraiserTitle} className="w-full h-full object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{data.fundraiserTitle}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Description: Add your description here</p>
          <div className="mb-4">
            <div className="text-gray-600 mb-2">Goal: ₦{data.goal}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-600">Amount Raised: ₦{data.amountRaised}</div>
            <div className="text-gray-600">Donations: {data.donations}</div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setIsOpen(true)} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Donate Now</button>
            <div className="p-2 border-2 rounded-md shadow-xl">{complete ? <p className="text-sm">Complete</p> : <p className="text-sm">Goal not reached</p>}</div>
          </div>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 lg:px-12">
                <img src={data.fundingMedia[0]?.pathToFile} alt={data.fundraiserTitle} className="w-full h-full object-cover" />
                <Dialog.Title className="text-xl font-bold text-gray-900">{data.fundraiserTitle}</Dialog.Title>
                <Dialog.Description className="mt-2 text-gray-700">
                  Amount Remaining: {data.goal - data.amountRaised}
                </Dialog.Description>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Name Field */}
                    <div className="flex items-center gap-4">
                      <Label htmlFor="name" className="w-1/4 text-right text-gray-700">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" className="w-3/4 border rounded-md p-2" />
                    </div>
                    {/* Amount Field */}
                    <div className="flex items-center gap-4">
                      <Label htmlFor="amount" className="w-1/4 text-right text-gray-700">Amount</Label>
                      <div className="relative w-3/4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₦</span>
                        <Input id="amount" defaultValue="1000" className="col-span-3 pl-7" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="tip" className="w-1/4 text-right text-gray-700">Tip ThriveFund.</Label>
                      <div className="relative w-3/4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₦</span>
                        <Input id="tip" defaultValue="100" className="col-span-3 pl-7" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center mb-4">
                    <input id="anonymous" type="radio" value="" name="anonymous" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="anonymous" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remain Anonymous</label>
                  </div>
                  <div className="flex items-center">
                    <input id="display-name" type="radio" value="" name="anonymous" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" defaultChecked />
                    <label htmlFor="display-name" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Display My Name</label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cancel
                  </button>
                  <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Proceed To Payment
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

