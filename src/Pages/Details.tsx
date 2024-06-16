import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog } from '@headlessui/react';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import axios from "axios";
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swipe from "@/Components/Swiper";

type DetailsProps = {
  _id: string;
  amountRaised: number;
  goal: number;
  fundingMedia: { pathToFile: string }[];
  fundraiserTitle: string;
  donations: number;
  firstname: string;
  lastname: string;
  fundraiserDescription: string;
};

type donateForm = {
  fullname: string;
  amount: number;
  email: string;
  tip: number;
  anonymity: string; // Change to boolean
  fundraiserId?: string;
};
type Donor = {
  amount: number;
  anonymity: string;
  currency: string;
  donorEmail: string;
  donorName: string;
  fundraiserId: string;
  paymentIntentId: string;
};
export default function Details() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [complete, setComplete] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<DetailsProps | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams<{ id: string }>();

  const stripe = useStripe();
  const elements = useElements();

  const { register, handleSubmit } = useForm<donateForm>();

  useEffect(() => {
    if (!id) return;
    axios.get(`${import.meta.env.VITE_BASE_URL}/fundraiser/details/${id}`)
      .then(res => {
        setData(res.data);
        console.log(res.data);
        if (res.data?.amountRaised >= res.data?.goal) {
          setComplete(true);
        }
      })
      .catch(err => console.error(err));

    axios.get(`${import.meta.env.VITE_BASE_URL}/donors/${id}`)
      .then(res => {
         setDonors(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.error("Error fetching donors:", err);
        setDonors([]); // Set donors to empty array on error
      });

  }, [id]);

  const onSubmit: SubmitHandler<donateForm> = async (formData) => {
    // Convert anonymity string to boolean
    const dataToSend = { ...formData, fundraiserId: id,  anonymity: formData.anonymity === 'true' };
console.log(dataToSend)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/create-payment`, dataToSend, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SK_TEST_KEY}`
        }
      });

      const { clientSecret } = response.data;

      if (!stripe || !elements) {
        throw new Error('Stripe or Elements is not initialized');
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card Element is not available');
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.fullname || 'Anonymous',
            email: formData.email || '',
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message || 'An error occurred during the payment process.');
      } else {
        console.log(result, 'Payment successful!');
        window.location.reload();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during the payment process.');
    }
  };

  if (!data) {
    return <div className="bg-white min-h-screen w-full items-center justify-center flex">Loading...</div>;
  }

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const progressPercentage = Math.min((data.amountRaised / data.goal) * 100, 100);

  return (
    <div className="min-h-screen items-center flex bg-[#F7FAFC] flex-col container mx-auto w-screen justify-center py-10 ">
      {/* <div className="flex-row flex gap-1 p-2 w-[100px] rounded-md items-start">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <p>Back</p>
      </div> */}

    
      <div className="max-w-4xl  mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={data.fundingMedia[0]?.pathToFile} alt={data.fundraiserTitle} className="w-full h-full object-cover" />
        <div className="p-6">
          <p className="text-gray-700 lora text-sm leading-relaxed mb-4">{data.firstname} {data.lastname}</p>
          <h2 className="text-3xl font-bold loraa mb-4">{data.fundraiserTitle}</h2>
          <p className="text-gray-700 lora text-sm leading-relaxed mb-4">Description: {data.fundraiserDescription}</p>
          <div className="mb-4">
            <div className="text-gray-600 lora mb-2">Goal: ₦{data.goal.toLocaleString()}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-600 lora">Amount Raised: ₦{data.amountRaised.toLocaleString()}</div>
            <div className="text-gray-600 lora">Donations: {data.donations}</div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setIsOpen(true)} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Donate Now</button>
            <div className="p-2 border  rounded-md shadow-xl">{complete ? <p className="text-sm">Complete</p> : <p className="text-sm">Goal not reached</p>}</div>
          </div>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4 lg:px-12">
                <div className="items-center justify-center flex flex-col">
                  <img src={data.fundingMedia[0]?.pathToFile} alt={data.fundraiserTitle} className="w-[70%] object-cover" />
                </div>
                <Dialog.Title className="text-xl text-center pt-2 font-bold text-gray-900">{data.fundraiserTitle}</Dialog.Title>
               
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-2 space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-4">
                        <Label htmlFor="name" className="w-1/4 text-right text-gray-700">Name</Label>
                        <Input id="name" {...register('fullname')} defaultValue="Ifeoluwa Esther" className="w-3/4 border rounded-md p-2" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Label htmlFor="email" className="w-1/4 text-right text-gray-700">Email</Label>
                        <Input id="email" {...register('email')} defaultValue="ifeoluwa@gmail.com" className="w-3/4 border rounded-md p-2" />
                      </div>
                      {/* Amount Field */}
                      <div className="space-y-2 gap-2">
                        <div className="flex items-center gap-4">
                          <Label htmlFor="amount" className="w-1/4 text-right text-gray-700">Amount</Label>
                          <div className="relative w-3/4">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₦</span>
                            <Input id="amount" defaultValue="1000" {...register('amount')} className="col-span-3 pl-7" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Label htmlFor="tip" className="w-1/4 text-right text-gray-700">Tip</Label>
                          <div className="relative w-3/4">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₦</span>
                            <Input id="tip" defaultValue="10" {...register('tip')} className="col-span-3 pl-7" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 <div className="flex items-center justify-center  pt-4 gap-4">
                        <Label htmlFor="anonymity" className=" text-right text-gray-700">Donate Anonymously</Label>
                        <div className="flex items-center gap-4">
                          <input id="anonymity-true" type="radio" value="true" {...register('anonymity')} name="anonymity" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label htmlFor="anonymity-true" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                        </div>
                        <div className="flex items-center gap-4">
                          <input id="anonymity-false" type="radio" value="false" {...register('anonymity')} name="anonymity" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label htmlFor="anonymity-false" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                        </div>
                      </div>
                  
                  <div className="mt-4">
                    <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                      <CardElement options={cardElementOptions} />
                    </div>
                    <div className="items-center justify-center flex pt-2">
                      {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 lora py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Pay Now
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
           <Swipe donors={donors}/>
      </div>
  
    </div>
  );
}
