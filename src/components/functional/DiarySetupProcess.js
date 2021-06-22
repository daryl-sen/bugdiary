import { useState } from "react";

import SingleColumnLayout from "../layouts/SingleColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";

import DiaryVersionSetup from "../forms/DiaryVersionSetup";
import DiaryLocationsSetup from "../forms/DiaryLocationsSetup";
import DiaryTypesSetup from "../forms/DiaryTypesSetup";
import { useHistory, useParams } from "react-router-dom";
import { useDiaryContext } from "../../AppContext";

export default function DiarySetupProcess(props) {
  const history = useHistory();
  const uuid = useParams().uuid;
  const [currentStep, setCurrentStep] = useState(0);
  const { setDiaryContext } = useDiaryContext();

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

  const redirectToDiary = () => {
    console.log("redirecting");
    history.push("/diary/" + uuid);
  };

  const switchDiaryMode = () => {
    console.log("switching");
    setDiaryContext((prev) => {
      return {
        ...prev,
        mode: "show",
      };
    });
  };

  const steps = [
    <DiaryVersionSetup nextStep={nextStep} prevStep={prevStep} />,
    <DiaryLocationsSetup nextStep={nextStep} prevStep={prevStep} />,
    <DiaryTypesSetup
      nextStep={nextStep}
      prevStep={prevStep}
      end={props.initiated ? switchDiaryMode : redirectToDiary}
    />,
  ];

  const renderStep = (step) => {
    return steps[step];
  };

  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer styleOverride={{ textAlign: "left" }}>
        {props.initiated ? (
          <h1>Versions, Locations, Types</h1>
        ) : (
          <>
            <h1>Diary Setup ({currentStep + 1}/3)</h1>
            <p>
              Let's add some basic labels to help you organize your project's
              issues.
            </p>
          </>
        )}
        <hr />
        {renderStep(currentStep)}
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
