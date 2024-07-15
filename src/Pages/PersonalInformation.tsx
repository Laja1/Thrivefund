import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaPhone } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import { Dialog, DialogTitle } from '@headlessui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import usePatch from '@/customHook/usePatch';
import { toast } from 'react-toastify'; 
import { AxiosError } from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  phone: number 
}

export default function PersonalInformation() {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, setError } = useForm<FormData>()
  const { dashboardData, token } = useOutletContext<any>();
  const { mutate, isPending: isSubmitting } = usePatch(`${import.meta.env.VITE_BASE_URL}/dashboard`, ['updateDetails'], token);
  
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
            setError('firstName', { 
              type: 'manual',
              message: error.response.data.message 
            });
            toast.error(error.response.data.message);
          } else {
            toast.error('An unexpected error occurred. Please try again.');
          }
        } 
      },
    });
  };

  return (
    <div className="bg-white w-full p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Personal Information</h1>
        <div className="bg-white rounded-xl shadow-lg p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard icon={<FaUser />} title="Name" value={dashboardData?.firstname && dashboardData?.lastname ? `${dashboardData.firstname} ${dashboardData.lastname}` : 'N/A'}  />
            <InfoCard icon={<FaEnvelope />} title="Email" value={dashboardData?.email || 'N/A'} />
            <InfoCard icon={<FaPhone />} title="Phone" value={dashboardData?.phone || 'N/A'} />
          </div>
          <div className="mt-4 text-right">
            <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center text-sm float-right">
              <FaEdit className="mr-2" />
              Edit Information
            </button>
          </div>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <Dialog.Panel className="max-w-lg rounded-md shadow-lg space-y-4 border bg-white p-12">
                <DialogTitle className="font-bold">Update Information</DialogTitle>
           
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={dashboardData?.firstname}
                      {...register('firstName', { required: 'First Name is required' })}
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={dashboardData?.lastname}
                      {...register('lastName', { required: 'Last Name is required' })}
                    />
                  </div>

                     <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={dashboardData?.phone}
                      {...register('phone', { required: 'Phone Number is required' })}
                    />
                  </div>
               
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
    </div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-md">
      <div className="flex items-center mb-4">
        <div className="text-blue-600  text-lg mr-3">{icon}</div>
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm ">{value}</p>
    </div>
  );
}