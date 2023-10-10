'use client'
import React, { useState, ChangeEvent } from 'react';
import ReusableTable from '../ atoms/TableAtom';
import SearchAtom from '../ atoms/SearchAtom';
import DashLayout from '../components/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import useGetCHV from '../hooks/getChv';

interface ChvData {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  password: string;
}

const CHVTable = () => {
  const result = useGetCHV();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    { title: 'Username', key: 'username' },
    { title: 'Firstname', key: 'first_name' },
    { title: 'Lastname', key: 'last_name' },
    { title: 'PhoneNumber', key: 'phone_number' },
    { title: 'Gender', key: 'gender' },
    
  ];
  

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const columnWidths = [70, 70, 70, 70];
  const tableClassName = 'w-full';

  const filteredData = result.success.filter((item: ChvData) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      item.username.toLowerCase().includes(searchTerm) ||
      item.first_name.toLowerCase().includes(searchTerm) ||
      item.last_name.toLowerCase().includes(searchTerm) ||
      item.gender.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div >
      <div className="flex items-center justify-between  ">
        <h1 className="page-heading  mb-6 mt-6 text-orange-500" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }}>
          Community Health Volunteers
        </h1>
        <div>
          <Link href="/profile">
            <Image src="/profile.png" alt="profile" width={45} height={45} className='mr-2'/>
          </Link>
        </div>
      </div>
      <SearchAtom
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        placeholder="Search"
      />
      <ReusableTable columns={columns} data={filteredData} columnWidths={columnWidths} tableClassName={tableClassName} />
    </div>
  );
};

export default function MyOverview() {
  return (
    <DashLayout>
      <CHVTable />
    </DashLayout>
  );
  }

