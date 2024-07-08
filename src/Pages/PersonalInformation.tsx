import React from 'react';
import { FaUser, FaEnvelope, FaEdit } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

export default function PersonalInformation() {
  const { dashboardData, fundraisersData } = useOutletContext<any>();

  return (
    <div className="bg-white w-full p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Personal Information</h1>
        <div className="bg-white rounded-xl shadow-lg p-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard icon={<FaUser />} title="Name" value={dashboardData?.firstname && dashboardData?.lastname ? `${dashboardData.firstname} ${dashboardData.lastname}` : 'N/A'}  />
            <InfoCard icon={<FaEnvelope />} title="Email" value={dashboardData?.email || 'N/A'} />
          </div>
          <div className="mt-4 text-right">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center text-sm float-right">
              <FaEdit className="mr-2" />
              Edit Information
            </button>
          </div>
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