import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalInformation from '@/Components/StartFunding/PersonalInformation';
import FundingGoal from '@/Components/StartFunding/FundingGoal';
import FundingMedia from '@/Components/StartFunding/FundingMedia';
import type { FormData } from '@/Components/StartFunding/types';

export default function StartFundraiser() {
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const token = window.localStorage.getItem('data');

  useEffect(() => {
    if (!token) {
      navigate('/SignIn');
    }
  }, [navigate, token]);

  const handleNextStep = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (data: FormData['fundingMedia']) => {
    console.log('formData:', formData);
    const finalData = {
      ...formData,
      fundingMedia: data.uploads[0] || {},
    } 
    axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, finalData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(res => {
      navigate('/Verification');
      console.log(res);
    })
    .catch(err => console.error(err));
  };

  const renderProgressBar = () => {
    const progressPercentage = (step / 2) * 100; // 3 steps in total

    return (
      <div>
        <p>Step {step + 1} of 3</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };


  const renderStep = () => {
    switch (step) {
      case 0:
        return <PersonalInformation onNext={handleNextStep} />;
      case 1:
        return <FundingGoal onNext={handleNextStep} onPrevious={handlePreviousStep} />;
      case 2:
        return <FundingMedia onSubmit={handleSubmit} onPrevious={handlePreviousStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen lg:w-[1000px] md:w-[650px] w-[350px] rounded-xl h-[700px] flex bg-[#F7FAFC] flex-col container mx-auto p-10">
      {token ? renderProgressBar() : null}
      {token ? renderStep() : null}
    </div>
  );
} 