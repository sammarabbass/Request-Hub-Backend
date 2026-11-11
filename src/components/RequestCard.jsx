import React from "react";
import {Link} from "react-router-dom"

const RequestCard = ({ request }) => {
   if (!request) {
    return <div className="card">Loading details...</div>;
  }
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
  
  {/* Header */}
  <div className="mb-5 flex items-start justify-between gap-4">
    <div>

      <h3 className="text-xl font-bold text-slate-900">
        {request?.title}
      </h3>
    </div>

    {/* Status */}
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
      {request?.status}
    </span>
  </div>

  {/* Request Information */}
  <div className="space-y-3 border-t border-slate-100 pt-4">
    
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">
        Category
      </span>

      <span className="text-sm font-semibold text-slate-800">
        {request?.category}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">
        Priority
      </span>

      <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
        {request?.priority}
      </span>
    </div>
  </div>

  {/* Action */}
  <div className="mt-6 border-t border-slate-100 pt-4">
    <Link
      to={`/requests/${request?._id}`}
      className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      View Details
      <span className="ml-2 transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  </div>

</div>
  );
};

export default RequestCard;
