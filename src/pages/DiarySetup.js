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

  const steps = [
    <DiaryVersionSetup nextStep={nextStep} />,
    <DiaryLocationsSetup nextStep={nextStep} />,
    <DiaryTypesSetup nextStep={nextStep} />,
  ];

  const renderStep = (step) => {
    return steps[step];
  };

  return (
    <SingleColumnLayout
      styleOverride={{
        maxWidth: "500px",
        margin: "auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <WhiteBgContainer>
        <h1>Diary Setup</h1>
        <p>
          Your diary is created! Let's add some basic labels to help you
          organize your project's issues.
        </p>
        <hr />
        {renderStep(currentStep)}
        {/* <DiaryTypesSetup /> */}
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
