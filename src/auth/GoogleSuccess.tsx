import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundMotifs from "../components/BackgroundMotifs";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <BackgroundMotifs />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-md bg-emerald-600 text-white flex items-center justify-center ring-1 ring-emerald-500/70">
              <span className="text-[12px] font-semibold">AS</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900">AyurSutra</span>
          </div>
          <span className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-6"></span>
          <div className="text-zinc-800 text-lg font-semibold">Completing Sign in...</div>
          <p className="text-zinc-600 text-sm mt-2">Welcome to your wellness journey</p>
        </div>
      </div>
    </>
  );
};

export default GoogleSuccess;