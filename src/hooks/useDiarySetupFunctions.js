import { useState } from "react";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../App";
import NotificationManager from "react-notifications/lib/NotificationManager";

import IssueTag from "../components/elements/IssueTag";

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

  const createVersion = (values) => {
    const headers = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/versions/", values, headers)
      .then((resp) => {
        if (!resp.data.error) {
          NotificationManager.success("New version created!");
        } else {
          console.log(resp.data.error);
        }
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

  const createLocation = (values) => {
    const headers = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/locations/", values, headers)
      .then((resp) => {
        if (!resp.data.error) {
          NotificationManager.success("New location created!");
        } else {
          console.log(resp.data.error);
        }
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

  const createType = (values) => {
    const headers = {
      headers: {
        authorization: `Bearer ${uInfo.jwt}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/types/", values, headers)
      .then((resp) => {
        if (!resp.data.error) {
          NotificationManager.success("New type created!");
        } else {
          console.log(resp.data.error);
        }
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
    createVersion,
    getLocations,
    createLocation,
    getTypes,
    createType,
    renderTags,
  };
}
