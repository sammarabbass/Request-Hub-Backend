import React, { useEffect,useState } from 'react'
import { getAllRequests, updateReqest, updateStatus } from '../api/request'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Navbar from '../components/Navbar';

const AdminDashboard = () => {

    const [requests, setRequests] = useState([])
    const loadRequests = async()=>{
        try{
            const res = await getAllRequests();
            setRequests(res.data)
        }catch(error){
               alert(error.response?.data?.message || "Access Denied")
        }
    };

     useEffect(() => {
           loadRequests();
        }, [])

        // change status
        const changeStatus = async(id,status)=>{
            try{
                await updateStatus(id,status)
                loadRequests()
            }catch(error){
                   alert(error.response?.data?.message || "Update Failed")
            }
        }
  return (
   <div className="min-h-screen bg-slate-50">
  <Navbar/>

  <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">

    {/* Header */}
    <div className="mb-8">
      

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor all service requests.
          </p>
        </div>

        {/* Total Requests */}
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total Requests
          </p>

          <p className="mt-1 text-3xl font-bold text-blue-600">
            {requests.length}
          </p>
        </div>
      </div>
    </div>

    {/* Requests */}
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((request) => (
        <div
          key={request._id}
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >

          {/* Request Header */}
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Service Request
            </p>

            <h3 className="text-xl font-bold text-slate-900">
              {request.title}
            </h3>
          </div>

          {/* User */}
          <div className="mb-4 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Requested By
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-700">
              {request.user?.email}
            </p>
          </div>

          {/* Request Information */}
          <div className="space-y-3">

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Priority
              </span>

              <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {request.priority}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Current Status
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {request.status}
              </span>
            </div>

          </div>

          {/* Status Control */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Update Status
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={request.status}
              onChange={(e) =>
                changeStatus(request._id, e.target.value)
              }
            >
              <option>IN_PROGRESS</option>
              <option>RESOLVED</option>
              <option>CANCELLED</option>
            </select>
          </div>

          {/* View Details */}
          <div className="mt-5 border-t border-slate-100 pt-5">
            <Link
              to={`/requests/${request?._id}`}
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Details
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

        </div>
      ))}
    </div>

  </div>
</div>
    // component
  )
}

export default AdminDashboard