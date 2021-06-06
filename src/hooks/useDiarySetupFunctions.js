import { useState } from "react";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../App";
import NotificationManager from "react-notifications/lib/NotificationManager";

import IssueTag from "../components/elements/IssueTag";

const BASE_URL = "http://localhost:3000";

export default function useDiaryFunctions() {
  const [diaryConfig, setDiaryConfig] = useState(null);

  const uInfo = useContext(UserContext);

  const getVersions = (uuid) => {
    const headers = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_API_URL + "/api/versions/" + uuid, headers)
      .then((resp) => {
        setDiaryConfig(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocations = (uuid) => {
    const headers = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_API_URL + "/api/locations/" + uuid, headers)
      .then((resp) => {
        setDiaryConfig(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTypes = (uuid) => {
    const headers = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_API_URL + "/api/types/" + uuid, headers)
      .then((resp) => {
        setDiaryConfig(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // helpers
  const renderTags = (tags) => {
    if (Array.isArray(tags)) {
      return tags.map((tag) => {
        return <IssueTag key={tag.id}>{tag.name}</IssueTag>;
      });
    }
  };

  return {
    uInfo,
    diaryConfig,
    getVersions,
    getLocations,
    getTypes,
    renderTags,
  };
}
