import React, { useState } from "react";
import { forgotPassword } from "../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await forgotPassword(email);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
<div className="min-h-screen bg-slate-950 px-4">
  <div className="flex min-h-screen items-center justify-center">

    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-white p-8 shadow-2xl sm:p-10">

      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-200">
          SH
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Service<span className="text-blue-600">Hub</span>
        </h1>
      </div>

      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Account Recovery
        </p>

        <h2 className="text-3xl font-bold text-slate-900">
          Forgot Password?
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </form>

      {/* Footer */}
      <div className="mt-8 border-t border-slate-100 pt-5 text-center">
        <p className="text-xs text-slate-400">
          Service Hub • Secure Account Recovery
        </p>
      </div>

    </div>
  </div>
</div>
  );
};

export default ForgotPassword;
