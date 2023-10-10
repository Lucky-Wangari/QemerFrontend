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
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex-1 lg:block bg-white min-h-[1100px]">
          <div className="flex flex-col w-full h-full gap-6 justify-center items-center text-orange-500">
            <Image src="/logo.jpeg" className="" alt="logo" width={300} height={300} />
            <h1 className="text-5xl font-bold">MWANGA</h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#fde4ccec]">
          <div className="mx-auto w-full max-w-sm lg:w-96 border border-black-300">
            <div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#FD620B]">
                Login
              </h2>
            </div>

            <div className="mt-8">
              <div></div>

              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="name"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
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
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
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
                    className="flex justify-center rounded-md  bg-[#FD620B] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#c8855e] focus:outline-none focus:ring-2 focus:ring-[#876754] focus:ring-offset-2"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  {successMessage && (
                    <div className="bg-[#FD620B] text-white px-4 py-2 rounded-md mt-10">
                      {successMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
