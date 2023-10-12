
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
      }, 3000);
    }
  }, [router]);

  return (
    <main className="bg-homescreen pt-40 bg-cover flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="flex gap-3">
      </div>
    </main>
  );
};

export default Home;

