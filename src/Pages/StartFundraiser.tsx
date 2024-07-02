import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PersonalInformation from '@/components/StartFunding/PersonalInformation';
import FundingGoal from '@/components/StartFunding/FundingGoal';
import FundingMedia from '@/components/StartFunding/FundingMedia';
// import type { FormData } from '@/components/StartFunding/types';

export default function StartFundraiser() {
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const tokenData = window.localStorage.getItem('data');
  if (tokenData) {
    const { token, decodedToken } = JSON.parse(tokenData);
    if (decodedToken && decodedToken.exp) {
      const currentTime = Date.now() / 1000; // current time in seconds
      if (decodedToken.exp > currentTime) {
        // Token is still valid
        setToken(token);
      } else {
        // Token is expired
        setError('Token expired. Please re-login.');
        navigate('/signIn', { state: { from: location } });
      }
    } else {
      // Decoded token payload is invalid
      setError('Invalid token. Please re-login.');
      navigate('/signIn', { state: { from: location } });
    }
  } else {
    navigate('/signIn', { state: { from: location } });
  }
}, [navigate, location]);

  const handleNextStep = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (data: any) => {
    const finalData = {
      ...formData,
      fundingMedia: data,
    };
    axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, finalData, {
      headers: {
        Authorization: `Bearer ${token}`, // Use the token variable
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
       
        if (res.data.message === "email already exists") {
          setError('Email already exists');
        } else {
          navigate('/review-ongoing');
        }
      })
      .catch(err => {
        console.log(err);
        
        if (err.response.data.error === "Invalid Token.") {
          setError('Please Re-login');
        }
        console.error(err.response.data);
      });
  };

  const renderProgressBar = () => {
    const progressPercentage = (step / 2) * 100; // Based on 3 steps
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
      {error && (
        <div className="text-red-600 text-center py-5">{error}</div>
      )}
      {token ? renderStep() : null}
    </div>
  );
}