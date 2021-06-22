import { useHistory } from "react-router";
import WhiteBgContainer from "../blocks/WhiteBgContainer";
import useDiaryFunctions from "../../hooks/useDiaryFunctions";
import { NotificationManager } from "react-notifications";
import SingleColumnLayout from "../layouts/SingleColumnLayout";
import { useDiaryContext } from "../../AppContext";
import { useState } from "react";

export default function DiarySettingsIndex(props) {
  const history = useHistory();
  const { setDiaryContext } = useDiaryContext();
  const { extendExpiry } = useDiaryFunctions();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <SingleColumnLayout preset="narrow-centered">
      <WhiteBgContainer>
        <h2>Diary Settings</h2>
        <button
          className="custom"
          onClick={() => {
            setDiaryContext((prev) => {
              return {
                ...prev,
                mode: "diarySetup",
              };
            });
          }}
        >
          Versions, Locations, Types
        </button>
        <button
          className="custom"
          onClick={() => {
            setDiaryContext((prev) => {
              return {
                ...prev,
                mode: "diaryModification",
              };
            });
          }}
        >
          Diary Info, Privacy, Ownership
        </button>
        <button
          className="custom"
          onClick={() => {
            extendExpiry(props.targetDiary.uuid);
            NotificationManager.success(
              "Your diary's expiry data has been extended to 3 months from now."
            );
          }}
        >
          Extend Expiry (
          {new Date(props.targetDiary.expiry_date).toDateString()})
        </button>

        <p style={{ textAlign: "center" }}>
          Your diary will expire in 3 months if it is inactive.{" "}
        </p>

        {deleteConfirmation ? (
          <>
            <p style={{ color: "#ff3939" }}>
              This action is irreversible! All the data in this diary will
              disappear FOREVER. Are you sure?
            </p>
            <button className="custom button-secondary">CONFIRM</button>
          </>
        ) : (
          <button
            className="custom button-secondary"
            onClick={() => {
              setDeleteConfirmation((prev) => !prev);
            }}
          >
            DELETE DIARY
          </button>
        )}
      </WhiteBgContainer>
    </SingleColumnLayout>
  );
}
