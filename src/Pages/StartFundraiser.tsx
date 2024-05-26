import { useState } from 'react';
import PersonalInformation from '@/Components/StartFunding/PersonalInformation';
import FundingGoal from '@/Components/StartFunding/FundingGoal';
import FundingMedia from '@/Components/StartFunding/FundingMedia';
import { FormData } from '@/Components/StartFunding/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StartFundraiser() {
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(0);
  const navigate = useNavigate()
  const handleNextStep = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (data: FormData['fundingMedia']) => {
    const finalData = { ...formData, fundingMedia: data };
    console.log('Final form data:', finalData);
    axios.post(`${import.meta.env.VITE_BASE_URL}/upload`,finalData).then(res=>{
      navigate('/Verification')
      console.log(res)}).catch(err=>console.log(err))
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <PersonalInformation defaultValues={formData.personalInformation} onNext={handleNextStep} />;
      case 1:
        return (
          <FundingGoal
            defaultValues={formData.fundingGoal}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        );
      case 2:
        return (
          <FundingMedia
            defaultValues={formData.fundingMedia}
            onSubmit={handleSubmit}
            onPrevious={handlePreviousStep}
          />
        );
      default:
        return null;
    }
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

  return (
    <div className="min-h-screen lg:w-[1000px] w-[350px] rounded-xl h-[700px] flex bg-[#F7FAFC] flex-col container mx-auto p-10">
      {renderProgressBar()}
      {renderStep()}
    </div>
  );
}
