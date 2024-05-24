import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="min-h-screen flex bg-[#F7FAFC] items-center justify-center w-full">
     
      
        <div className="lg:w-[600px] w-[360px] rounded-xl h-[700px] md:h-[600px] lg:h-[600px] flex-col py-10 rounded- border-2 flex items-center justify-center bg-white shadow-xl">
        <h2 className="text-2xl font-bold  mb-10">ThriveFund.</h2>
          <div className="w-3/4">
            {/* Your Sign In form can be placed here */}
            <h2 className="text-xl  mb-4">Sign In</h2>
            <form>
              <div className="mb-4">
              <div className="">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe@gmail.com" required />
    </div>
              </div>
              <div className="mb-6">
            <div className="">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
    </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="gap-1 flex-row items-center justify-center pt-5 flex"><p className="text-sm">Dont have an account?</p><Link to='/SignUp'><p className="underline text-sm text-blue-500 hover:text-blue-800">Sign Up</p></Link></div>
            </form>
          </div>
        </div>
      </div>
  
  );
}
