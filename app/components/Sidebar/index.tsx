"use client"

import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog,  Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import Link from "next/link";
import { HiDocumentReport } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { BsFillHouseCheckFill } from "react-icons/bs";
import React from "react";

const navigation = [
  { name: "Home", href: "/location", icon: RxDashboard, current: true },
  { name: "Reporting", href: "/geolocation", icon: HiDocumentReport, current: false },
  { name: "Household Units", href: "/householdTable", icon: BsFillHouseCheckFill, current: false },
  { name: "CHVS", href: "/ChvTables", icon: LuUsers, current: false },
  { name: "Add CHV", href: "/addCHV", icon: LuUsers, current: false },

];

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DashLayoutProps {
  children: React.ReactNode;
}

export default function DashLayout({ children }: DashLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <div className="min-h-full " >
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0  bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[ border-orange-500] pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <h3 className="font-bold text-3xl text-orange-500">Mwanga</h3>
                  </div>
                  <nav
                    className="mt-5 h-full flex-shrink-0  overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? "border-b-5 border-orange-500 bg-white text-gray-800"
                              : "text-white hover:text-white",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              pathname === item.href ? "text-gray-400" : "text-white",
                              "mr-4 h-6 w-6 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto bg-[#fde4ccec]">
            <div >
              <div className="ml-5 mt-20">
                <Image src="/mwangaLogo.png" alt="logo" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-black ml-6 pb-20">MWANGA</h3>
              </div>
            </div>
            <nav className="mt-5 flex flex-1 flex-col divide-y  overflow-y-auto" aria-label="Sidebar">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "border-b-5 border-orange-500 bg-white"
                        : "text-black hover:text-orange-600",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        pathname === item.href ? "text-gray-400" : "text-black",
                        "mr-4 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="p-10">{children}
          </div>
        </div>
      </div>
    </>
  );
}
