import { useState } from "react";

import SingleColumnLayout from "../components/layout/SingleColumnLayout";
import WhiteBgContainer from "../components/elements/WhiteBgContainer";

import DiaryVersionSetup from "../components/forms/DiaryVersionSetup";
import DiaryLocationsSetup from "../components/forms/DiaryLocationsSetup";
import DiaryTypesSetup from "../components/forms/DiaryTypesSetup";

export default function DiarySetup() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => {
      return prev + 1;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      return prev - 1;
    });
  };

  const steps = [
    <DiaryVersionSetup nextStep={nextStep} prevStep={prevStep} />,
    <DiaryLocationsSetup nextStep={nextStep} prevStep={prevStep} />,
    <DiaryTypesSetup nextStep={nextStep} prevStep={prevStep} />,
  ];

  const renderStep = (step) => {
    return steps[step];
  };

  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h1>Diary Setup ({currentStep + 1}/3)</h1>
        <p>
          Let's add some basic labels to help you organize your project's
          issues.
        </p>
        <hr />
        {renderStep(currentStep)}
        {/* <DiaryTypesSetup /> */}
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
