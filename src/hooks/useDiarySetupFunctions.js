import { useState } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";
import IssueTag from "../components/elements/IssueTag";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function useDiaryFunctions(context) {
  const [diaryConfig, setDiaryConfig] = useState(null);
  const getVersions = async (uuid) => {
    const headers = {
      headers: {
        authorization: `Bearer ${context.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(BASE_URL + "/api/diaries/issues/versions/" + uuid, headers)
      .then((resp) => {
        setDiaryConfig(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocations = async (uuid) => {
    const headers = {
      headers: {
        authorization: `Bearer ${context.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(BASE_URL + "/api/diaries/issues/locations/" + uuid, headers)
      .then((resp) => {
        setDiaryConfig(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTypes = async (uuid) => {
    const headers = {
      headers: {
        authorization: `Bearer ${context.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(BASE_URL + "/api/diaries/issues/types/" + uuid, headers)
      .then((resp) => {
        setDiaryConfig(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createVersion = async (values) => {
    console.log("creating");
    const headers = {
      headers: {
        authorization: `Bearer ${context.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(BASE_URL + "/api/diaries/issues/versions", values, headers)
      .then((resp) => {
        if (!resp.data.error) {
          NotificationManager.success("New version created!");
        } else {
          console.log(resp.data.error);
        }
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const createLocation = async (values) => {
    console.log("creating");

    const headers = {
      headers: {
        authorization: `Bearer ${context.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(BASE_URL + "/api/diaries/issues/locations", values, headers)
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

  const createType = async (values) => {
    console.log("creating");

    const headers = {
      headers: {
        authorization: `Bearer ${context.jwt}`,
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(BASE_URL + "/api/diaries/issues/types", values, headers)
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
    context,
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
