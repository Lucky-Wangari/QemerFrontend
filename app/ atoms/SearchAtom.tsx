

import { FaSearch } from 'react-icons/fa';
import React, { ChangeEvent } from 'react';

interface SearchAtomProps {
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchAtom = ({ searchQuery, handleSearchChange, placeholder }: SearchAtomProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-3/6 mb-4 px-10 py-2 border ml-96 border-black rounded-lg text-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-customOrange"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className='ml-[1100px] mt-[-42px] mb-[50px]'><FaSearch /></div>

      <div className="absolute left-3 top-2 pointer-events-none">
      </div>
    </div>
  );
};

export default SearchAtom;
