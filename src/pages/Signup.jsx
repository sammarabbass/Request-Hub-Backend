import React, { useState } from 'react'
import { signupUser } from '../api/auth';
import {Link} from 'react-router-dom'
const Signup = () => {
    const [form, setForm] = useState({
        email: "",
        password : ""
    });

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await signupUser(form)
            alert("SignUp successfully")
        }catch(err){
            alert(err.response?.data?.message)

        }
    }
  return (
<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10">

  {/* ================= BACKGROUND ================= */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Soft gradient glow */}
    <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
    <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-300/30 blur-3xl" />

    {/* Hardware */}
    <div className="absolute left-[5%] top-[18%] hidden animate-[bounce_6s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-md lg:block">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
          💻
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            Hardware
          </p>
          <p className="text-xs text-slate-400">
            Technical Support
          </p>
        </div>
      </div>
    </div>

    {/* Software */}
    <div className="absolute right-[5%] top-[20%] hidden animate-[bounce_7s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-md lg:block">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
          ⚙️
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            Software
          </p>
          <p className="text-xs text-slate-400">
            Software Solutions
          </p>
        </div>
      </div>
    </div>

    {/* Network */}
    <div className="absolute bottom-[18%] left-[5%] hidden animate-[bounce_8s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-md lg:block">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-xl">
          🌐
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            Network
          </p>
          <p className="text-xs text-slate-400">
            Network Support
          </p>
        </div>
      </div>
    </div>

    {/* Account */}
    <div className="absolute bottom-[18%] right-[5%] hidden animate-[bounce_9s_ease-in-out_infinite] rounded-2xl border border-white/80 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-md lg:block">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
          👤
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            Account
          </p>
          <p className="text-xs text-slate-400">
            Account Services
          </p>
        </div>
      </div>
    </div>

    {/* Other Services */}
    <div className="absolute left-[23%] top-[8%] hidden animate-pulse rounded-full border border-white/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-500 shadow-md backdrop-blur-md xl:block">
      ✨ Other Services
    </div>

    {/* Decorative dots */}
    <div className="absolute left-[22%] top-[48%] h-2 w-2 animate-pulse rounded-full bg-blue-400/60" />
    <div className="absolute right-[22%] top-[48%] h-3 w-3 animate-pulse rounded-full bg-indigo-400/50" />
    <div className="absolute bottom-[30%] left-[28%] h-2 w-2 animate-pulse rounded-full bg-cyan-400/50" />
    <div className="absolute bottom-[30%] right-[28%] h-2 w-2 animate-pulse rounded-full bg-violet-400/50" />

  </div>


  {/* ================= SIGNUP CARD ================= */}
  <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-10">

    {/* Branding */}
    <div className="mb-8 text-center">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
        SH
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Service<span className="text-blue-600">Hub</span>
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Create your account and get started.
      </p>

    </div>


    {/* Signup Form */}
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Email */}
      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

      </div>


      {/* Password */}
      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Password
        </label>

        <input
          type="password"
          placeholder="Create a password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

      </div>


      {/* Signup Button */}
      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white shadow-md shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0"
      >
        Create Account
      </button>

    </form>


    {/* Login Link */}
    <div className="mt-7 text-center">

      <p className="text-sm text-slate-500">

        Already have an account?

        <Link
          to="/"
          className="ml-1 font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
        >
          Login
        </Link>

      </p>

    </div>


    {/* Footer */}
    <div className="mt-7 border-t border-slate-100 pt-5 text-center">

      <p className="text-xs text-slate-400">
        Join Service Hub and manage your services easily.
      </p>

    </div>

  </div>

</div> )
}

export default Signup
