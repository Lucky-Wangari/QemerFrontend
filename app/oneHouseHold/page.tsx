'use client'
import React, { useState, useEffect } from "react";
import { getSingleHousehold } from "../utilities/utils";
import { BsX } from "react-icons/bs";



interface LocationData {
    id: number;
    name: string;
    coordinates: [number, number];
  }

interface SingleHouseholdProps {
  onClose: () => void;
  householdId: number;
}

const SingleHousehold = ({ onClose, householdId }: SingleHouseholdProps) => {
  const [householdData, setHouseholdData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleHousehold(householdId);
        setHouseholdData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching household details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [householdId]);

  return (
    <div className="mt-9">
      <div className="ml-64">
        <button onClick={onClose} className="cursor-pointer">
          <BsX size={24} />
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex">
          <div className="ml-16 justify-center text-2xl text-white">
            <p className="text-gray-600">
              <span className="text-orange-600">Parent Name:</span> {householdData.parent_name}
              <br />
              <span className="text-orange-600">National ID: </span>{householdData.national_id}
              <br />
              <span className="text-orange-600">Phone Number:</span> {householdData.phone_number}
              <br />
              <span className="text-orange-600">Is Eligible: </span>{householdData.is_eligible ? "Yes" : "No"}
              <br />
            </p>
            {householdData.children && householdData.children.length > 0 && (
              <div>
                <p className="text-2xl text-white mt-4 mb-2">Children:</p>
                <ul>
                  {householdData.children.map((child: any) => (
                    <li key={child.id} className="text-gray-600">
                      <span className="font-semibold text-orange-500">Child Name:</span> {child.child_name}
                      <br />
                      <span className="font-semibold">Date of Birth:</span> {child.date_of_birth}
                      <br />
                      <span className="font-semibold">Sex:</span> {child.sex}
                      <br />
                      <span className="font-semibold">Delayed Milestones:</span> {child.delayed_milestones}
                      <br />
                      <span className="font-semibold">Recovery Status:</span> {child.isChildRecovered ? 'Recovered' : 'Not Recovered'}
                      <br />
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleHousehold;