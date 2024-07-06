import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "@/customHook/useFetchHeaders";

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error: fetchError } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/dashboard`,
    ['dashboard'],
    token
  );
console.log(data)
  useEffect(() => {
    const tokenData = window.localStorage.getItem("data");
    if (tokenData) {
      const { token, decodedToken } = JSON.parse(tokenData);
      if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000; // current time in seconds
        if (decodedToken.exp > currentTime) {
          setToken(token);
        } else {
          navigate("/signIn", { state: { from: location } });
        }
      } else {
        navigate("/signIn", { state: { from: location } });
      }
    } else {
      navigate("/signIn", { state: { from: location } });
    }
  }, [navigate, location]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message);
    }
  }, [fetchError]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="h-full w-full">
      <div className="flex-row h-14 items-center bg-gray-300 flex">
        <h1 className="text-xl font-bold pl-10">Dashboard</h1>
      </div>
      <div className="flex-row items-center flex">
        <div className="basis-[250px] flex-col min-h-screen flex">
          <div className="pt-5 items-center flex-col flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
                      <p className="font-bold pt-3 loraa"></p>
                      <p className="text-sm pt-0 lora"></p>
          </div>
          <div className="items-start pl-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                 ? "flex-row items-center pt-5 space-x-2 flex "
                  : "flex-row items-center pt-5 space-x-2 flex text-blue-500"
              }
            >
              <p className="font-bold lora text-sm">Personal Information</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </NavLink>
            <NavLink
              to="/dashboard/account-details"
              className={({ isActive }) =>
                isActive
                  ? "flex-row items-center pt-5 space-x-2 flex text-blue-500"
                  : "flex-row items-center pt-5 space-x-2 flex"
              }
            >
              <p className="text-sm pt-0 lora">Account Details</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
            </NavLink>
          </div>
        </div>
        <div className="basis-1/2 min-h-screen flex-grow flex bg-gray-200">
          <Outlet context={data} />
        </div>
      </div>
    </div>
  );
}
