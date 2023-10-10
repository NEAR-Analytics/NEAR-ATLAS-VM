import React from "react";

export const CohortEl = (props) => {
  const { data, minRowsShown = 5 } = props; // add default value for minRowsShown

  // Ensure data is an array
  if (!Array.isArray(data)) {
    return <div>Error: Data is not an array.</div>;
  }

  // Transform data for easier rendering
  const transformedData = data.reduce((acc, curr) => {
    if (!acc[curr.CREATED_MONTH]) acc[curr.CREATED_MONTH] = [];
    acc[curr.CREATED_MONTH].push(curr);
    return acc;
  }, {});

  const maxMonths = Math.max(...data.map((item) => item.MONTHS_SINCE));

  function getColorForRetentionRate(rate) {
    if (rate <= 0.1) return "bg-teal-200 text-black";
    if (rate <= 0.2) return "bg-teal-300 text-black";
    if (rate <= 0.3) return "bg-teal-400 text-black";
    if (rate <= 0.4) return "bg-teal-500 text-white";
    if (rate <= 0.5) return "bg-teal-600 text-white";
    if (rate <= 0.6) return "bg-teal-700 text-white";
    if (rate <= 0.7) return "bg-teal-800 text-white";
    if (rate <= 0.8) return "bg-teal-900 text-white";
    return "bg-teal-900 text-white"; // default case if rate > 0.8
  }
  const calculatedHeight = `${minRowsShown * 50}px`;
  const minContainerWidth = (maxMonths + 2) * 150;
  const formatNumber = (num) => num.toLocaleString();
  // Determine the maximum cohort size for normalization
  const maxCohortSize = Math.max(...data.map((item) => item.COHORT_SIZE));

// Determine the total cohort size
const totalCohortSize = data.reduce((sum, item) => sum + (item.COHORT_SIZE || 0), 0);
// Function to get gradient color for the entire Users column
const getUsersColumnGradient = () => {
  const averageSize = totalCohortSize / data.length;
  const percentage = (averageSize / maxCohortSize) * 100;
  return `bg-gradient-to-b from-teal-400 via-teal-${Math.min(900, Math.max(400, Math.round(percentage / 10) * 100))} to-teal-400`;
};

return (
  <div className="w-full h-[650px] overflow-x-auto overflow-y-auto border border-gray-700 rounded bg-gray-800 text-white">
    <div style={{ minWidth: `${minContainerWidth}px`, maxHeight: calculatedHeight }}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 p-2 border-t border-gray-600 hover:bg-gray-700">
        <div className="col-span-1 p-2">Time</div>
        <div className={`col-span-1 p-2 ${getUsersColumnGradient()}`}>Users</div>
        {Array.from({ length: maxMonths + 1 }).map((_, idx) => (
          <div className="col-span-1 p-2" key={idx}>
            Month {idx}
          </div>
        ))}
      </div>
      {Object.keys(transformedData)
        .sort((a, b) => new Date(b) - new Date(a))
        .map((cohortMonth) => (
          <div key={cohortMonth} className="border-b border-gray-700">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 p-2 border-t border-gray-600 hover:bg-gray-700">
              <div className="col-span-1 p-2">
                {`${new Date(cohortMonth).toLocaleString("default", { month: "long" })} / ${new Date(cohortMonth).getFullYear()}`}
              </div>
              <div className={`col-span-1 p-2 ${getUsersColumnGradient()}`}>
                {(transformedData[cohortMonth].find((entry) => entry.MONTHS_SINCE === 0)?.COHORT_SIZE || 0).toLocaleString()}
              </div>
              {Array.from({ length: maxMonths }).map((_, idx) => {
                const entry = transformedData[cohortMonth].find((entry) => entry.MONTHS_SINCE === idx + 1);
                return (
                  <div className={`col-span-1 p-2 border border-gray-500 ${entry ? getColorForRetentionRate(entry.RETENTION_RATE) : ""}`} key={idx}>
                    {entry ? Math.round(entry.RETENTION_RATE * 100) + "%" : "-"}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  </div>
);

};
