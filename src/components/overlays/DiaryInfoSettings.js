import TwoColumnLayout from "../layouts/TwoColumnLayout";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import DiaryInfoForm from "../forms/DiaryInfoForm";

import DiarySettingsSidebar from "../sidebars/DiarySettingsSidebar";

export default function DiaryInfoSettings(props) {
  

  return (
    <TwoColumnLayout preset="confined" aside={<DiarySettingsSidebar />}>
      <WhiteBgContainer>
        <DiaryInfoForm
          targetDiary={props.targetDiary}
        />
      </WhiteBgContainer>
    </TwoColumnLayout>
  );
}
