// import Bars from "../../components/RecoveredData";
// import React from "react";

// function LocationInfo() {

// return (
// <div>
//             <div className=" ">
//               <div className="shadow sm:hidden">
//                 <ul role="list" className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
//                   <Bars />
//                 </ul>
//               </div>
//               <div className="hidden sm:block p-4">
//                 <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
//                   <div className=" flex flex-col">
//                     <div className="overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
//                       <div className="grid grid-cols-1  h-[400px]">
//                         <article>
//                           <Bars />
//                         </article>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//         </div>
//     )
// }
// export default LocationInfo;

import React, { useState, useEffect } from "react";
import Chart from "@/app/components/client-libs";
import useGetChildren from "@/app/hooks/useGetChildren";

export default function RecoveredData() {
  const { childrenChart } = useGetChildren();

  // Create a Map to aggregate eligibility data by location
  const locationEligibilityMap = new Map();

  childrenChart.forEach((child) => {
    const { location, is_eligible } = child;
    const eligibility = is_eligible ? "Eligible" : "Not Eligible";

    if (locationEligibilityMap.has(location)) {
      locationEligibilityMap.set(location, locationEligibilityMap.get(location) + is_eligible);
    } else {
      locationEligibilityMap.set(location, is_eligible);
    }
  });

  const data = [["Location", "Eligibility"]];

  locationEligibilityMap.forEach((eligibility, location) => {
    data.push([location, eligibility]);
  });

  const options = {
    chart: {
      title: "Children Eligible for Aid",
    },
    colors: ["#FD620B"],
  };

  return (
    <Chart
      chartType="Bar"
      height="400px"
      data={data}
      options={options}
    />
  );
}

