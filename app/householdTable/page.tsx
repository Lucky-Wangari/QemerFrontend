'use client'
import React, { useState, ChangeEvent } from "react";
import ReusableTable from "../ atoms/TableAtom";
import SearchAtom from "../ atoms/SearchAtom";
import DashLayout from "../components/Sidebar";
import Link from "next/link";
import Image from "next/image";
import useGetGuardian from "../hooks/getHouseholds";
import { ColumnType } from "../types";

interface GuardianData {
  eligibility: any;
  name: any;
  parent_name: string;
  location: string;
  is_eligible: string;
  created_at: string;
}

const DisplayPage = () => {
  const result = useGetGuardian(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  if (!result || !result.success) {
    return <div>Error loading data.</div>;
  }

  const success = Array.isArray(result.success) ? result.success : [];
  const columns: ColumnType[] = [
    { title: "ParentName", key: "parent_name" },
    { title: "Location", key: "location" },
    { title: "Date", key: "created_at" },
    {
      title: "Eligibility",
      key: "is_eligible",
      render: (_column: ColumnType, item: any) => {
        const eligibityType = () => {
          switch (String(item.is_eligible.toString()).toLowerCase()) {
            case 'true':
              return "bg-green-600";
            case "false":
              return "bg-rose-600";
            default:
              return "bg-[#e2e2e2]";
          }
        };

        const eligibilityStatus = eligibityType();

        return (
          <div className={`${eligibilityStatus} rounded-2xl w-2/6 h-20px text-[#ffffff] border border-[#c2c2c2] flex justify-center py-1`}>
            <span className=""> {item.is_eligible.toString()}</span>
          </div>
        );
      },
    },
  ];

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const columnWidths = [70, 70, 70, 70];
  const tableClassName = 'w-full';

  const filteredData: GuardianData[] = success.filter((item: GuardianData) => {
    const searchTerm = searchQuery.toLowerCase();
    const lowercaseParentName = item.parent_name.toLowerCase();
    const lowercaseLocation = item.location.toLowerCase();
    const lowercaseCreatedAt = item.created_at.toLowerCase();
    const lowercaseIsEligible = item.is_eligible.toLowerCase();

    return (
      lowercaseParentName.includes(searchTerm) ||
      lowercaseLocation.includes(searchTerm) ||
      lowercaseCreatedAt.includes(searchTerm) ||
      lowercaseIsEligible.includes(searchTerm)
    );
  }).map((item: GuardianData) => ({
    ...item,
    created_at: new Date(item.created_at).toLocaleDateString(),
  }));

  const handleRowClick = (item: { id: any }) => {
    window.location.href = `/singleHousehold/${item.id}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="page-heading mb-6 mt-6 text-orange-500" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }}>
          All Households
        </h1>
        <div>
          <Link href="/profile">
            <Image src="/profile.png" alt="profile" width={45} height={45} className="mr-4" />
          </Link>
        </div>
      </div>
      <SearchAtom
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        placeholder="Search"
      />

      <ReusableTable
        columns={columns}
        data={filteredData}
        columnWidths={columnWidths}
        tableClassName={tableClassName}
      />
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