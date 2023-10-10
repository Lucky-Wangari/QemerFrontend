
'use client'
import React, { useEffect, useState } from 'react';
import cookie from 'cookiejs';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';

const Home = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Boolean(cookie.get('LoginToken'));
    setIsUserLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      router.push('/location');
    } else {
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [router]);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-10 justify-center p-24 mytext">
      <Image src='/mwangaLogo.png' className="w-[120px]" alt="logo" width={200} height={200} />
      <h1 className="font-bold text-6xl text-orange-500">MWANGA</h1>
      <div className="flex gap-3">
      </div>
    </main>
  );
};

export default Home;

