import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from '../validation/schemas';
import { useState } from "react";
export default function SignUp() {
     const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    type SignupForm = {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        password: string;
    };

    const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
        resolver: yupResolver(SignUpSchema)
    });

    const onSubmit: SubmitHandler<SignupForm> = (data) => {
        console.log(data);
        axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, data)
            .then((res) => {
                console.log(res)
                navigate('/SignIn')})
         .catch((err) => {
            if (err.response.data.message==='This email belongs to an account.'){
 setErrorMessage(err.response.data.message)
            }   
           else{console.log(err)}
            })
    };

    return (
        <div className="min-h-screen flex bg-[#F7FAFC] items-center justify-center w-full">
            <div className="lg:w-[600px] w-[350px] rounded-xl h-[700px] md:h-[600px] lg:h-[600px] mx-auto flex-col py-10 rounded- border-2 flex items-center justify-center bg-white shadow-xl">
                <h2 className="text-2xl font-bold mb-10">ThriveFund.</h2>
                <div className="w-3/4">
                    <h2 className="text-xl mb-4">Welcome, Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" id="first_name" {...register("firstname")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                                {errors.firstname && <p className="text-red-600 text-sm">{errors.firstname.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" id="last_name" {...register("lastname")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                                {errors.lastname && <p className="text-red-600 text-sm">{errors.lastname.message}</p>}
                            </div>
                        </div>
                        <div className="flex-col flex gap-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input type="tel" {...register("phone")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required />
                                {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
                                
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input type="email" id="email" {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe@gmail.com" required />
                                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                                 {errorMessage && (
                        <div className="text-red-600 ">{errorMessage}</div>
                    )}
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" id="password" {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*******" required />
                                {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 items-center justify-between">
                            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign Up
                            </button>
                            <div className="gap-1 flex-row items-center justify-center flex">
                                <p className="text-sm">Already have an account?</p>
                                <Link to='/SignIn'>
                                    <p className="underline text-sm text-blue-500 hover:text-blue-800">Sign In</p>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
