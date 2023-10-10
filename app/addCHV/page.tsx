'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import DashLayout from '@/app/components/Sidebar';
import Link from 'next/link';
import useCreateCHV from '../hooks/useCreateCHV';

const CHVRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const bodyData = {
    username,
    first_name:firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    gender,
    password

  }
const {success, handleCreateCHV} = useCreateCHV(bodyData)
  
  const handleSubmit = async(e:any) => {
    e.preventDefault();
   await  handleCreateCHV()


  }



  return (
    <div >
      <div className="flex items-center justify-between">
        <h1 className='text-orange-600 font-bold text-2xl '>
          Add a Community Health Volunteer
        </h1>
        <div>
          <Link href='/profile'>
            <Image src='/profile.png' alt='profile' width={45} height={45} className="mr-5"/>
          </Link>
        </div>
      </div>
      <div className='flex item-center justify-center'>
        <div className="w-full max-w-md border-black mt-10 item-center">
          <form className="bg-white shadow-md rounded px-20 pt-10 pb-20 " onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col">
              <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="firstName">
                First Name:
              </label>
              <input
                className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-orange-400"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="lastName">
                Last Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-orange-400"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="gender">
                Gender:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline border-orange-400 opacity-70"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="phoneNumber">
                Phone Number:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-orange-400"
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-orange-400 "
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="household">
                Username:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-orange-400"
                id="household"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-10">
              <button
                className="block text-m mb-2 bg-orange-600 hover:bg-F7803A text-white font-bold py-2 px-4 rounded border border-F7803A focus:outline-none focus:shadow-outline"
                type="submit"
               
              >
               
                Add CHV
              </button>
              
            </div>
            {success &&  Object.values(success)[0]}
          </form>
        
        </div>
      </div>
    </div>
  );
};
export default function MyOverview() {
  return (
    <DashLayout>
      <CHVRegistrationForm/>
    </DashLayout>
  );
}

























