import { Link } from "react-router-dom";

export default function Verification() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="max-w-lg rounded-xl bg-white shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Thank you!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Your form has been received. Our team is currently reviewing it.
        </p>
        <div className="flex justify-center mb-6">
          <img
            src="pictures/review.jpg"
            alt="Review in progress"
            className="w-full max-w-xs rounded-md"
          />
        </div>
        <p className="text-gray-600 mb-2 text-center">Review in progress</p>
        <p className="text-gray-600 mb-8 text-center">
          While you wait, you can learn more about our review process or check
          out our latest news and updates.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
              type="submit"
            >
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}