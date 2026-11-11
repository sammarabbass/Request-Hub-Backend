import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await resetPassword(token, password);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "password reset failed");
    } finally {
      setLoading(false);
    }
  };
  return (
<div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">

  {/* Reset Password Card */}
  <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">

    {/* Branding */}
    <div className="mb-8 text-center">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
        SH
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Service<span className="text-blue-600">Hub</span>
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Create a new password for your account.
      </p>

    </div>


    {/* Reset Password Form */}
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* New Password */}
      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          New Password
        </label>

        <input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

      </div>


      {/* Reset Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white shadow-md shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Reseting..." : "Reset Password"}
      </button>

    </form>


    {/* Footer */}
    <div className="mt-7 border-t border-slate-100 pt-5 text-center">

      <p className="text-xs text-slate-400">
        Securely update your Service Hub account password.
      </p>

    </div>

  </div>

</div>  );
};

export default ResetPassword;
