import React, { useState, useEffect } from "react";
import { getSingleHousehold } from '../utilities/utils';
import { BsX } from "react-icons/bs";

interface SingleHouseholdProps {
  onClose: () => void;
  householdId: number;
}
const SingleHousehold = ({ onClose, householdId }: SingleHouseholdProps) => {
  const [household, setHousehold] = useState<any>({});
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const householdData = await getSingleHousehold(householdId);
        setHousehold(householdData);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching household details:", error);
        setLoading(false)
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
           <span className="text-orange-600">Parent Name:</span>  {household.parent_name}
            <br />
            <span className="text-orange-600">National ID: </span>{household.national_id}
            <br />
           <span className="text-orange-600">Phone Number:</span>  {household.phone_number}
            <br />
            <span className="text-orange-600">Is Eligible: </span>{household.is_eligible ? "Yes" : "No"}
            <br />
           <span className="text-orange-600">Location: </span> {household.location}
          </p>
          {household.children && household.children.length > 0 && (
            <div>
              <p className="text-2xl text-white mt-4 mb-2">Children:</p>
              <ul>
                {household.children.map((child: any) => (
                  <li key={child.id} className="text-gray-600">
                    <span className="font-semibold text-orange-500">Child Name:</span> {child.child_name}
                    <br />
                    <span className="font-semibold">Date of Birth:</span> {child.date_of_birth}
                    <br />
                    <span className="font-semibold">Sex:</span> {child.sex}
                    <br />
                    <span className="font-semibold">Delayed Milestones:</span> {child.delayed_milestones}
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







