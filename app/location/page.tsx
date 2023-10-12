'use client'
import React from 'react';
import DashLayout from '@/app/components/Sidebar';
import Bars from "../components/RegistrationData";
import Image from "next/image";
import Link from "next/link";
import LocationInfo from '../components/locationInfo';

const cards = [
  { name: 'Registered Children', href: '#', amount: '400' },
  { name: 'Children Recovered', href: '#', amount: '234' },
  { name: 'Total Active CHVS', href: '#', amount: '154' },
];

function Location() {
  return (
    <div className='bg-white'>
      <div>
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-between">
                      <h1 className="ml-3 text-3xl font-bold leading-7 text-orange-500 sm:leading-9">
                        Overview
                      </h1>
                      <div style={{ marginLeft: '880px' }}>
                        <Link href='/profile'>
                          <Image src='/profile.png' alt='profile' width={45} height={45} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <dl className="flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                      Hello, Welcome to Mwanga Dashboard
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            {cards.map((card) => (
              <div key={card.name} className="h-[130px] overflow-hidden w-[350px] rounded-3xl bg-[#FD620B] shadow-lg border border-orange-500 sm:min-h-[130px] sm:w-[350px]">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 orange-border" />
                    <div className="w-0 flex-1  flex items-center">
                      <div>
                        <Image src='/q-child-care.png' alt='' width={50} height={100} objectFit="contain" />
                      </div>
                      <div>
                          <p  className="text-3xl font-bold text-white text-center mt-4 mr-10">
                           {card.amount}
                          </p>
                          <p className="truncate text-lg font-medium text-white text-center ml-20">
                            {card.name}
                          </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="border-t-1 w-[70%] border border-orange-500 mt-10 mb-10 mx-60" />
        <div className='grid grid-cols-2 '>
          <div className=''>
            <LocationInfo />
          </div>
          <div>
            <div className="shadow sm:hidden">
              <ul role="list" className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                <Bars />
              </ul>
            </div>
            <div className="hidden sm:block p-4">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                    <div className="grid grid-cols-1  h-[400px]">
                      <article>
                        <Bars />
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyOverview() {
  return (
    <DashLayout>
      <Location />
    </DashLayout>
  );
}
