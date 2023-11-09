// 'use client'
// import React, { useState, ChangeEvent } from "react";
// import ReusableTable from "../ atoms/TableAtom";
// import SearchAtom from "../ atoms/SearchAtom";
// import DashLayout from "../components/Sidebar";
// import Link from "next/link";
// import Image from "next/image";
// import useGetGuardian from "../hooks/getHouseholds";
// import { ColumnType } from "../types";

// interface GuardianData {
//   eligibility: any;
//   name: any;
//   parent_name: string;
//   location: string;
//   is_eligible: string;
//   created_at: string;
// }

// const DisplayPage = () => {
//   const result = useGetGuardian(); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   if (!result || !result.success) {
//     return <div>Error loading data.</div>;
//   }

//   const success = Array.isArray(result.success) ? result.success : [];
//   const columns: ColumnType[] = [
//     { title: "ParentName", key: "parent_name" },
//     { title: "Location", key: "location" },
//     { title: "Date", key: "created_at" },
//     {
//       title: "Eligibility",
//       key: "is_eligible",
//       render: (_column: ColumnType, item: any) => {
//         const eligibityType = () => {
//           switch (String(item.is_eligible.toString()).toLowerCase()) {
//             case 'true':
//               return "bg-green-600";
//             case "false":
//               return "bg-rose-600";
//             default:
//               return "bg-[#e2e2e2]";
//           }
//         };

//         const eligibilityStatus = eligibityType();

//         return (
//           <div className={`${eligibilityStatus} rounded-2xl w-2/6 h-20px text-[#ffffff] border border-[#c2c2c2] flex justify-center py-1`}>
//             <span className=""> {item.is_eligible.toString()}</span>
//           </div>
//         );
//       },
//     },
//   ];

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//   };

//   const columnWidths = [70, 70, 70, 70];
//   const tableClassName = 'w-full';

//   const filteredData: GuardianData[] = success.filter((item: GuardianData) => {
//     const searchTerm = searchQuery.toLowerCase();
//     const lowercaseParentName = item.parent_name.toLowerCase();
//     const lowercaseLocation = item.location.toLowerCase();
//     const lowercaseCreatedAt = item.created_at.toLowerCase();
//     // const lowercaseIsEligible = item.is_eligible.toLowerCase();


//     const lowercaseIsEligible =typeof item.is_eligible === "string" ? item.is_eligible.toLowerCase() : "";

//     return (
//       lowercaseParentName.includes(searchTerm) ||
//       lowercaseLocation.includes(searchTerm) ||
//       lowercaseCreatedAt.includes(searchTerm) ||
//       lowercaseIsEligible.includes(searchTerm)
//     );
//   }).map((item: GuardianData) => ({
//     ...item,
//     created_at: new Date(item.created_at).toLocaleDateString(),
//   }));

//   const handleRowClick = (item: { id: any }) => {
//     window.location.href = `/singleHousehold/${item.id}`;
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <h1 className="page-heading mb-6 mt-6 text-orange-500" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }}>
//           All Households
//         </h1>
//         <div>
//           <Link href="/profile">
//             <Image src="/profile.png" alt="profile" width={45} height={45} className="mr-4" />
//           </Link>
//         </div>
//       </div>
//       <SearchAtom
//         searchQuery={searchQuery}
//         handleSearchChange={handleSearchChange}
//         placeholder="Search"
//       />

//       <ReusableTable
//         columns={columns}
//         data={filteredData}
//         columnWidths={columnWidths}
//         tableClassName={tableClassName}
//       />
//     </div>
//   );
// };

// const MyOverview = () => {
//   return (
//     <DashLayout>
//       <DisplayPage />
//     </DashLayout>
//   );
// };

// export default MyOverview;

'use client'
import React, { useState, ChangeEvent, useEffect } from "react";
import ReusableTable from "../ atoms/TableAtom";
import SearchAtom from "../ atoms/SearchAtom";
import DashLayout from "../components/Sidebar";
import Link from "next/link";
import Image from "next/image";

interface GuardianData {
  eligibility: any;
  name: any;
  parent_name: string;
  location: string;
  is_eligible: string;
  created_at: string;
}

const DisplayPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Function to convert coordinates to a street name
  const convertCoordinatesToStreetName = async (latitude: string, longitude: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data.address && data.address.road) {
        return data.address.road;
      } else {
        return "Street Name Not Found";
      }
    } catch (error) {
      console.error("Error fetching street name", error);
      return "Street Name Not Found";
    }
  };

  // State variables for data
  const [success, setSuccess] = useState<GuardianData[]>([]);
  const [filteredData, setFilteredData] = useState<GuardianData[]>(success);

  // Function to update location data
  const updateLocationData = async () => {
    const updatedData: GuardianData[] = [];

    for (const item of success) {
      const [latitude, longitude] = item.location.split(", ");
      const streetName = await convertCoordinatesToStreetName(latitude, longitude);

      updatedData.push({
        ...item,
        location: streetName,
      });
    }

    setFilteredData(updatedData);
  };

  useEffect(() => {
    // Fetch your data and set it to 'success' here
    // Example:
    setSuccess([
      {
        eligibility: "Eligible",
        name: "Name 1",
        parent_name: "Parent 1",
        location: "1.234567, 2.345678",
        is_eligible: "true",
        created_at: "2023-11-08T07:34:37.788844Z",
      },
      // Add more data as needed
    ]);

    // Call the function to update location data
    updateLocationData();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // Define column widths and table class
  const columnWidths = [70, 70, 70, 70];
  const tableClassName = "w-full";

  // Define columns
  const columns = [
    { title: "ParentName", key: "parent_name" },
    { title: "Location", key: "location" },
    { title: "Date", key: "created_at" },
    {
      title: "Eligibility",
      key: "is_eligible",
      render: (_column: any, item: any) => {
        const eligibilityStatus =
          String(item.is_eligible.toString()).toLowerCase() === "true"
            ? "bg-green-600"
            : String(item.is_eligible.toString()).toLowerCase() === "false"
            ? "bg-rose-600"
            : "bg-[#e2e2e2]";

        return (
          <div className={`${eligibilityStatus} rounded-2xl w-2/6 h-20px text-[#ffffff] border border-[#c2c2c2] flex justify-center py-1`}>
            <span className=""> {item.is_eligible.toString()}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="page-heading mb-6 mt-6 text-orange-500" style={{ fontSize: "24px", fontWeight: "bold", textAlign: "left" }}>
          All Households
        </h1>
        <div>
          <Link href="/profile">
            <Image src="/profile.png" alt="profile" width={45} height={45} className="mr-4" />
          </Link>
        </div>
      </div>
      <SearchAtom searchQuery={searchQuery} handleSearchChange={handleSearchChange} placeholder="Search" />

      <ReusableTable columns={columns} data={filteredData} columnWidths={columnWidths} tableClassName={tableClassName} />
    </div>
  );
};

const MyOverview = () => {
  return (
    <DashLayout>
      <DisplayPage />
    </DashLayout>
  );
};

export default MyOverview;
