
import { BsWallet2, FaAddressCard, LuPlusCircle } from '@/assets/react_icons';
import { Dialog, DialogTitle, DialogDescription } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import { EmailProps } from "./type";
import usePatch from "@/customHook/usePatch";
import useFetchHeader from "@/customHook/useFetchHeaders";
import { useOutletContext } from "react-router-dom";
import { AxiosError } from 'axios';

interface Bank {
  code: string;
  name: string;
}

interface FormData extends EmailProps {
  accountNumber: string;
  bankName: string;
  bankCode: string;
}

export default function AccountDetails() {
  const { token } = useOutletContext<any>();
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>();
  const { mutate, isPending: isSubmitting } = usePatch(`${import.meta.env.VITE_BASE_URL}/dashboard/bankDetails`, ['bankDetails'], token);
  
  const { data, isLoading, error } = useFetchHeader(
    `${import.meta.env.VITE_BASE_URL}/dashboard/banks`, ['banks'], token
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Bank details updated successfully!");
        setIsOpen(false);
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          console.error('Error:', error);
          if (error.response?.status === 422 && typeof error.response.data?.message === 'string') {
            setError('accountNumber', { 
              type: 'manual',
              message: error.response.data.message 
            });
            toast.error(error.response.data.message);
          } else {
            toast.error('An unexpected error occurred. Please try again.');
          }
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      },
    });
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = data?.data.simplifiedBanks.find((bank: Bank) => bank.code === e.target.value);
    if (selectedBank) {
      setValue('bankName', selectedBank.name);
      setValue('bankCode', selectedBank.code);
    }
  };

  return (
    <div className="bg-white w-full p-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold loraa text-gray-800 mb-8">Account Details</h1>
        <div className="bg-white items-center gap-10 shadow-xl rounded-md p-6 w-[15rem] flex-row flex">
          <div className="flex-row flex items-center gap-3">
            <FaAddressCard color="#1a56db" size={25} />
            <p className="text-sm">Add New Bank</p>
          </div>
          <LuPlusCircle onClick={() => setIsOpen(true)} className="hover:text-[#1a56db] cursor-pointer" size={25} />
        </div>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className="max-w-lg rounded-md shadow-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">
                <BsWallet2 color="#1a56db" size={40} />
              </DialogTitle>
              <DialogDescription>Add New Bank</DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2209xxxxxx"
                    {...register('accountNumber', { required: 'Account number is required' })}
                  />
                  {errors.accountNumber && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.accountNumber.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select a bank
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('bankCode', { required: 'Bank selection is required' })}
                    onChange={handleBankChange}
                  >
                    <option value="" disabled>Choose a bank</option>
                    {data?.data.simplifiedBanks?.map((item: Bank) => (
                      <option key={item.code} value={item.code}>{item.name}</option>
                    ))}
                  </select>
                  {errors.bankCode && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.bankCode.message}</p>
                  )}
                </div>
                <input type="hidden" {...register('bankName')} />
                <div className="col-span-2 flex justify-end gap-4">
                  <button 
                    type="submit" 
                    className="hover:bg-blue-600 hover:p-2 rounded-md hover:text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Update'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)} 
                    className="hover:bg-blue-600 hover:p-2 rounded-md hover:text-white"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}