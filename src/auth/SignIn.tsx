import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../validation/schemas';
import { useState } from "react";
import {jwtDecode} from "jwt-decode";
export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const navigate = useNavigate();
const location = useLocation();
  type SignInForm = {
    email: string;
    password: string;
  };

  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: yupResolver(LoginSchema)
  });

  const onSubmit: SubmitHandler<SignInForm> = (data) => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data)
      .then((res) => {
       const token = res.data.data; // Assuming the server returns a JWT token
    let decodedToken;
    try {
      decodedToken = jwtDecode(token); // Decode the token
    } catch (error) {
      console.error('Error decoding token:', error);
      setErrorMessage('Invalid token received from server.');
      return;
    }

        window.localStorage.setItem('data', JSON.stringify({ token, decodedToken }));

       const redirectPath = location.state?.from?.pathname || '/';
        navigate(redirectPath);
        window.location.reload()
      })
      .catch((err) => {
        if (err.response?.data?.error === 'An unexpected error occurred - This email has not been registered on our system.') {
          setErrorMessage('We could not find an account with this email');
        } else {
          console.error(err.response?.data?.error);
        }
        if (err.response?.data?.error === 'An unexpected error occurred - Invalid password') {
          setPasswordMessage('Password doesnt match this account');
        }
      });
  };


  return (
    <div className="min-h-screen flex mx-auto bg-[#F7FAFC] items-center justify-center w-full">
      <div className="lg:w-[600px] w-[350px] rounded-xl h-[700px] md:h-[600px] lg:h-[600px] flex-col py-10 rounded- border-2 flex items-center justify-center bg-white shadow-xl">
        <h2 className="text-2xl font-bold mb-10">ThriveFund.</h2>
        <div className="w-3/4">
          <h2 className="text-xl mb-4">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input type="email" id="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe@gmail.com" />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
              {errorMessage && (
                <div className="text-red-600 ">{errorMessage}</div>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" {...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
              {passwordMessage && (
                <div className="text-red-600 ">{passwordMessage}</div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
              {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a> */}
            </div>
            <div className="gap-1 flex-row items-center justify-center pt-5 flex">
              <p className="text-sm">Don't have an account?</p>
              <Link to='/signUp'>
                <p className="underline text-sm text-blue-500 hover:text-blue-800">Sign Up</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
