import { FaAddressCard } from "react-icons/fa6";
import { LuPlusCircle } from "react-icons/lu";
import { BsWallet2 } from "react-icons/bs";
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import { EmailProps } from "./type";

export default function AccountDetails() {
  const { register, handleSubmit } = useForm<EmailProps>();

  const onSubmit: SubmitHandler<EmailProps> = (data) => {
      console.log(data);
       toast.success("Bank details saved successfully!");
    setIsOpen(false); // Close the dialog on save
  };

  let [isOpen, setIsOpen] = useState<boolean>(false);

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
          <LuPlusCircle onClick={() => setIsOpen(true)} className="hover:text-[#1a56db]" />
        </div>
        <>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="max-w-lg rounded-md shadow-lg space-y-4 border bg-white p-12">
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
                      {...register('accountnumber', { required: true })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Select a bank
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register('bank', { required: true })}
                    >
                      <option value="" selected disabled>Choose a bank</option>
                      <option value="zenith">Zenith Bank</option>
                      <option value="gtb">GTB Bank</option>
                      <option value="opay">Opay Digital Services Limited</option>
                      <option value="palmpay">Palmpay Bank</option>
                    </select>
                  </div>
                  <div className="col-span-2 flex justify-end gap-4">
                    <button type="submit" className="hover:bg-blue-600 hover:p-2 rounded-md hover:text-white">Save</button>
                    <button type="button" onClick={() => setIsOpen(false)} className="hover:bg-blue-600 hover:p-2 rounded-md hover:text-white">Cancel</button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        </>
      </div>
    </div>
  );
}
