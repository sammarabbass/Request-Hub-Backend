import React, { useEffect, useState } from "react";
import { getMyRequests } from "../api/request";
import RequestCard from "../components/RequestCard";
import API, { authHeader } from "../api/axios";
import Navbar from "../components/Navbar";
// import {Navbar} from "../components/Navbar"


const Dashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response= await getMyRequests()

        console.log("1. WHAT DOES THE SERVER RAW API RETURN?:", response.data);

        //  FIX: Extract the specific array key cleanly. 
        // If your backend puts the array directly in response.data, fall back to it.
        const arrayData = response.data.data || response.data;
        
        if (Array.isArray(arrayData)) {
          setRequests(arrayData); // Only save if it is a real array structure
        } else {
          console.error("CRITICAL: Server data is not an array format!", arrayData);
        } 

        // const res = await getMyRequests();
        // setRequests(res?.data.data||res.data);
        // console.log(res.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    loadRequests()
  }, []);
  return (
   <div className="min-h-screen bg-slate-50">
  <Navbar />

  <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">

    {/* Header */}
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Service Hub
        </p>

        <h2 className="text-3xl font-bold text-slate-900">
          My Service Requests
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          View and manage all your submitted service requests.
        </p>
      </div>

     
    </div>

    {/* Requests */}
    {requests.length === 0 ? (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <span className="text-2xl">📋</span>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          No Request Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          You haven't created any service requests yet.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {requests.map((request) => {
          return (
            <RequestCard
              key={request._id}
              request={request}
            />
          );
        })}
      </div>
    )}
  </div>
</div>
  );
};

export default Dashboard;
