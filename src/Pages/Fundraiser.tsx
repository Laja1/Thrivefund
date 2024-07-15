import fundraiseFetch from "@/customHook/fundraiseFetch";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function FundraiserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const { data, isLoading, error: fetchError } = fundraiseFetch(
    `${import.meta.env.VITE_BASE_URL}/dashboard/fundraisers`,
    ['userFundraiser'],
    token
  );

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message || "An error occurred");
    }
  }, [fetchError]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex bg-[#F7FAFC] justify-center items-center">
        <ClipLoader color="#000" size={50} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen w-full flex bg-[#F7FAFC] justify-center items-center">{error}</div>;
  }

  if (data?.message === "user has no fundraisers") {
    return <div className="min-h-screen w-full flex bg-[#F7FAFC] justify-center items-center">User has no fundraisers</div>;
  }

  return (
    <div className="min-h-screen w-full flex bg-[#F7FAFC] justify-center items-center">
      {/* Render your fundraiser data here */}
      <div>Fundraiser Data: {JSON.stringify(data)}</div>
    </div>
  );
}
