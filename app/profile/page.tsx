import Image from "next/image";
import React from "react";
import Link from "next/link";


const Profile = () => {
  return (
    <div className="justify-center">
      <p className="font-20 mb-9 ml-32 text-orange-600 font-bold text-3xl">My Profile</p>

      <div className="relative z-20 h-64 mr-64 ml-64 md:h-64">
        <Image
          src='/images/bgimage.jpg'
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          layout="fill"
        />
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
              >
              </svg>
            </span>
            <Image className=" ml-36 mt-56" src='/images/edit.svg' alt="edit icon" width={30} height={40}/>
          </label>
        </div>
      </div>

      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative z-30 mx-auto -mt-32 h-32 w-32 max-w-32 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative drop-shadow-2">
            <Image src='/profile.png' width={160} height={160} alt="profile" className="rounded-full" />
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
              >
              </svg>
              <input type="file" name="profile" id="profile" className="sr-only" />
            </label>
          </div>
        </div>
        <div>
          <div className="mb-4 p-4 text-center">
            <p className="text-xl font-bold text-orange-600">Admin: David Mutua</p>
            <p className="text-gray-700 text-lg">Email: dmutua@gmail.com</p>
            <p className="text-gray-700 text-lg">City: Nairobi</p>
          </div>

          <div className="mb-4">
  <div className="w-full flex items-center justify-center">
    <div className="w-1/2 pl-4 text-center ">
      <div className="border-b pb-2">
        <p className="text-orange-600 font-bold text-xl">Role: Resource Manager</p>
      </div>
      <p className="text-gray-700 text-lg ">Status: Active</p>
      <p className="text-gray-700 text-lg">Last Login: 10:00am</p>
    </div>
 
  </div>
</div>

        </div>
      </div>

      <div className="flex items-center justify-center">
        <Link href="/login">
        <button
          className="block text-sm mb-2 bg-orange-600 hover:bg-F7803A text-white font-bold py-2 px-4 rounded border border-F7803A focus:outline-none focus:shadow-outline"
          type="button"
        >
          Log out
        </button>

        </Link>
        
      </div>
    </div>
  );
};

export default Profile;
