import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalInformation from '@/Components/StartFunding/PersonalInformation';
import FundingGoal from '@/Components/StartFunding/FundingGoal';
import FundingMedia from '@/Components/StartFunding/FundingMedia';
import { FormData } from '@/Components/StartFunding/types';

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
    const finalData = { ...formData, fundingMedia: { ...data.uploads } };
    axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, finalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      navigate('/Verification');
      console.log(res);
    })
    .catch(err => console.error(err));
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

  return (
    <div className="min-h-screen lg:w-[1000px] md:w-[650px] w-[350px] rounded-xl h-[700px] flex bg-[#F7FAFC] flex-col container mx-auto p-10">
      {token ? renderStep() : null}
    </div>
  );
}
