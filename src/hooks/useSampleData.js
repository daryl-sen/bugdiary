export default function useSampleData() {
  const sampleIssues = [
    {
      id: 1,
      reference: "101",
      details: "Sample issue #101",
      status: "Pending",
      reporter_name: "Anonymous",
      reporter_email: "None",
      report_date: "",
      resolve_data: null,
      version: "v1.0.1", // join on `version`
      location: "Homepage", // join on `location`
      type: "Typo", // join on `type`
      priority: 5, // max 10, min 0, default 5
    },
    {
      id: 2,
      reference: "102",
      details: "Sample issue #102",
      status: "Pending",
      reporter_name: "Anonymous",
      reporter_email: "None",
      report_date: "",
      resolve_data: null,
      version: "v1.0.1",
      location: "Homepage",
      type: "Typo",
      priority: 5,
    },
    {
      id: 3,
      reference: "103",
      details: "Sample issue #103",
      status: "Pending",
      reporter_name: "Anonymous",
      reporter_email: "None",
      report_date: "",
      resolve_data: null,
      version: "v1.0.1",
      location: "Homepage",
      type: "Typo",
      priority: 5,
    },
  ];
  return {
    sampleIssues,
  };
}
