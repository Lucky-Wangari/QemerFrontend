'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import usePostLogin from "../hooks/usePostLogin";
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, handleSignin } = usePostLogin({ username, password });
  const [token, setToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    handleSignin();
  };

  return (
    <>
      <div className="bg-[#FFA45B] w-full grid-cols-1 md:grid-cols-2 md:w-full min-h-screen flex items-center justify-center">
        <div>
          <div className="absolute inset-0 bg-black bg-opacity-20 ">
            <Image  src='/images/child.png' alt="logo" width={1200} height={50} style={{marginLeft: "20%"}} />
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20 ml-10">
          <div className="w-full fsm:px-6 lg:flex-none lg:px-20 xl:px-24 rounded-xl bg-[#FD620B] pb-10 pt-5">
            <div className="mx-auto rounded-lg max-w-sm lg:w-96">
              <div>
                <h2 className="mt-6 text-5xl font-bold tracking-tight font-[poppins] text-white">
                  Login
                </h2>
              </div>

              <div className="mt-8">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-white"
                    >
                     Enter Your Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="name"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full bg-[#FD620B] appearance-none rounded-2xl border border-gray-300 px-3 py-4  shadow-sm focus:border-white focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-white"
                    >
                      Enter Your Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block bg-[#FD620B] w-full appearance-none rounded-2xl border border-gray-300 px-3 py-4  shadow-sm focus:border-white focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {user && Object.values(user)[0] && user.token ? (
                    'Login successfull'
                  ) : (
                    Object.values(user)[0]
                  )}

                  <div>
                    <button
                      onClick={handleLogin}
                      type="button"
                      disabled={loading}
                      className="flex justify-center rounded-2xl font-[poppins]  bg-[#FFF] py-2 px-10 text-m font-medium  shadow-sm hover:bg-[#FD620B] focus:outline-none focus:ring-2  focus:ring-offset-2"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>

                    {successMessage && (
                      <div className="bg-white text-[#FD620B] px-4 py-2 rounded-md mt-10">
                        {successMessage}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
