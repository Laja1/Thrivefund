import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormData } from './types';
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
   phone: yup.string().matches(/^\d{10}$/, 'Invalid Nigerian phone number').required('Phone number is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  address: yup.string().required('Address is required'),
})


interface PersonalInformationProps {
  defaultValues?: FormData['personalInformation'];
  onNext: (data: FormData['personalInformation']) => void;
}
export default function PersonalInformation({ defaultValues, onNext }:PersonalInformationProps) {
    const {register,handleSubmit, formState: { errors }} = useForm<FormData['personalInformation']>({
        resolver: yupResolver(schema),
         defaultValues
    })
const navigate = useNavigate()
    const token = window.localStorage.getItem('token');
    console.log(token)
    if (!token) {
      console.log('Token not found');
      navigate('/SignIn');
    }
  
  
  const onSubmit = handleSubmit((data) => onNext(data));
  return (
    
    <div className="pt-5"> 
    <p className='text-3xl font-bold pb-3'>Your Information</p>
   
<form onSubmit={onSubmit}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input  {...register('firstname')} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
           {errors.firstname && <p className="text-red-600 text-sm">{errors.firstname.message}</p>}
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input {...register('lastname')} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe"  />
           {errors.lastname && <p className="text-red-600 text-sm">{errors.lastname.message}</p>}
        </div>
       
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input  {...register('phone')} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="07051655770"   />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
        </div>

    <div className="">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input  {...register('email')} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com"  />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
    </div>  </div>
     <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
        <textarea  {...register('address')} id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18 Olaide Adeyeye Street"  />
        {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
    </div> 
  <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>Next</button>
   </form>

    </div>
  )
}



