import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FundingGoal from '@/Components/StartFunding/FundingGoal';
import PersonalInformation from '@/Components/StartFunding/PersonalInformation';

const steps = ['Personal Information', 'Funding Goal', 'Review'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const totalSteps = () => steps.length;

//   const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => activeStep === totalSteps() - 1;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className='items-center pt-10 min-h-screen mx-auto flex flex-col'>
      <Box className='w-[100%] lg:w-[50%] md:w-[75%]'>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={() => handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={() => setActiveStep(0)}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }} className='justify-center'>
                {activeStep === 0 && <PersonalInformation />}
                {activeStep === 1 && <FundingGoal />}
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                </Box>
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}
