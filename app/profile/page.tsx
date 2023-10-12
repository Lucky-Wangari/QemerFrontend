import Image from "next/image";
import React from "react";
import Link from "next/link";
import DashLayout from "../components/Sidebar";

const Profile = () => {
  return (
    <div className="float-left">
      <p className="font-20 mb-9  text-orange-600 font-bold text-3xl pl-40">My Profile</p>
      <Image src="/images/Rectangle.png" alt="" width={1000} height={20} className="pl-40"/>
       <div className="relative z-20 h-64 mx-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <label
            htmlFor="cover"
            className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80"
          >
            <input type="file" name="cover" id="cover" className="sr-only" />
            <span>
              <svg
                className="fill-current"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </span>
            <Image src="/images/edit.svg" alt="edit icon" width={90} height={40} />
          </label>
        </div>
      </div>

      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative  mx-auto ml-60 h-32 w-32 max-w-32 rounded-full backdrop-blur sm:h-44 sm:max-w-44 sm:p-3" style={{marginTop: "-330px"}}>
          <div className=" ">
            <Image src="/profile.png" width={400} height={200} alt="profile" />
            <label
              htmlFor="profile"
              className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <svg
                className="fill-current"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
              <input type="file" name="profile" id="profile" className="sr-only" />
            </label>
          </div>
        </div >
        
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-bold text-orange-600 pl-40">Admin: David Mutua</p>
          </div>
          <div>
           <p className="text-orange-600 font-bold text-xl">Resource Manager</p>
          </div>
        </div>
        <hr className="border-t-1 w-[85%] border border-orange-500 mt-10 mb-10 mx-40" />

        <div className="grid grid-cols-1 md:grid-cols-2 justify-between ">
  <div className="mb-4 p-4">
    <p className="text-gray-700 text-lg ml-20">Email: dmutua@gmail.com</p>
    <p className="text-gray-700 text-lg mr-10">City: Nairobi</p>
  </div>
  <div className="mb-4">
    <div className="w-full flex">
      <div className="w-1/2 ml-64 pr-4">
        <div className="border-b pb-2"></div>
        <p className="text-gray-700 text-lg mr-3">Status: Active</p>
        <p className="text-gray-700 text-lg float-right">Last Login: 10:00am</p>
      </div>
    </div>
  </div>
</div>

        </div>

        <div className="flex  justify-center mx-5 items-center">
  <Link href="/login">
    <button
      className="block text-lg  mb-2 bg-orange-600 hover:bg-F7803A text-white font-bold py-3 px-6 rounded-2xl border border-F7803A focus:outline-none focus:shadow-outline"
      type="button"
    >
      Log out
    </button>
  </Link>
</div>

      </div>
  );
};

export default function MyOverview() {
  return (
    <>
      <DashLayout>
        <Profile />
      </DashLayout>
    </>
  );
};
