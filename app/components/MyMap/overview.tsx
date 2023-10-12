import React, { useState, useEffect } from "react";
import { BsX } from "react-icons/bs";

function Overview({ onClose, location }) {
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalEligibleParents, setTotalEligibleParents] = useState(0);

  useEffect(() => {
    const fetchChildrenAndGuardians = async () => {
      try {
        const childrenResponse = await fetch("https://qemer-backend-764e0de661a5.herokuapp.com/api/children/");
        const guardiansResponse = await fetch("https://qemer-backend-764e0de661a5.herokuapp.com/api/guardians/");

        if (!childrenResponse.ok || !guardiansResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const childrenData = await childrenResponse.json();
        const guardiansData = await guardiansResponse.json();

        const filteredChildren = childrenData.filter((child) => child.location === location);
        const filteredEligibleParents = guardiansData.filter(
          (guardian) => guardian.location === location && guardian.is_eligible === true
        );

        const childrenTotal = filteredChildren.length;
        const eligibleParentsTotal = filteredEligibleParents.length;

        setTotalChildren(childrenTotal);
        setTotalEligibleParents(eligibleParentsTotal);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    fetchChildrenAndGuardians();
  }, [location]);

  return (
    <div className="bg-orange-500">
      <div>
        <div className="ml-80 mb-20">
          <button onClick={onClose} className="cursor-pointer">
            <BsX size={24} />
          </button>
        </div>
        <div className="h-[150px] overflow-hidden w-[350px] rounded-lg bg-white shadow-lg border border-orange-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 orange-border" />
              <div className="w-0 flex-1">
                <dl>
                  <dt className="truncate text-m font-medium text-gray-500 text-center text-xl">
                    Total Children
                  </dt>
                  <dd>
                    <div className="text-4xl font-bold text-gray-900 text-center mt-7">
                      {totalChildren}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3" />
        </div>
        <div className="h-[150px] overflow-hidden w-[350px] rounded-lg bg-white shadow-lg border border-orange-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 orange-border" />
              <div className="w-0 flex-1">
                <dl>
                  <dt className="truncate text-m font-medium text-gray-500 text-center text-xl">
                    Total Eligible Parents
                  </dt>
                  <dd>
                    <div className="text-4xl font-bold text-gray-900 text-center mt-7">
                      {totalEligibleParents}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3" />
        </div>
      </div>
    </div>
  );
}

export default Overview;
