
'use client'
import dynamic from "next/dynamic";
import DashLayout from "../components/Sidebar";
import Image from "next/image";
import Link from "next/link";

const MyMap = dynamic(() => import("../components/MyMap"), {
  ssr: false, 
});

const MyOverview = () => {
  return (
    <DashLayout>
      <div >
        <div className="flex items-center justify-between mt-0 ">
          <div
            className="page-heading  mb-6 mt-6 text-orange-500 "
            style={{ fontSize: "24px", fontWeight: "bold", textAlign: "left" }}
          >
            <h2>Geolocation</h2>
          </div>
          <div>
            <Link href="/profile">
              <Image src="/profile.png" alt="profile" width={45} height={45} className="mr-40" />
            </Link>
          </div>
        </div>
      </div>
      <MyMap /> 
    </DashLayout>
  );
};

export default MyOverview;


