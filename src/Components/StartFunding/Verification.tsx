import { Link } from "react-router-dom";

export default function Verification() {
  return (
    <div className="min-h-screen lg:w-[1000px] w-[350px] rounded-xl  flex bg-[#F7FAFC] flex-col container mx-auto p-10">
  
        <p className="font-bold   pb-5  text-2xl ">Thank you!, Your form has been recieved. Our team is currently reviewing it.</p>
    <img src="https://images.unsplash.com/photo-1493135637657-c2411b3497ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D" className="h-[100%] rounded-md"/>
    <p>Review in progress</p>
    <p className="py-2">While you wait, you can learn more about our review process or check out our latest news and updates.</p>
   <Link to='/'>
    <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                             Return Home
                            </button></Link>
    </div>
  )
}
