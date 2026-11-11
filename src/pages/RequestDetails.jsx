import  { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { deleteRequest, getRequest } from "../api/request"
import {Link} from 'react-router-dom'
// import Navbar from "../components/Navbar"
import FilePreview from "../components/FilePreview"
import Navbar from '../components/Navbar'
const RequestDetails = () => {

    const { id } = useParams()
    const [request, setRequest] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
         if (!id || id === "undefined") return;
        const load = async () => {
            try {
                const res = await getRequest(id)
                setRequest(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        load();
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm(
            "Delete this Request"
        )) {
            return
        }

        try {
            await deleteRequest(id);
            alert("Deleted");
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Delete Failed")

        }

    }
    if(!request){
        return <p>loading.....</p>
    }
    return (
<div className="min-h-screen bg-slate-50">
  <Navbar />

  <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">

    {/* Header */}
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
        Service Hub
      </p>

      <h2 className="text-3xl font-bold text-slate-900">
        {request.title}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Service Request Details
      </p>
    </div>

    {/* Main Card */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

      {/* Request Information */}
      <div className="grid gap-5 border-b border-slate-100 pb-6 md:grid-cols-2">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Category
          </p>
          <p className="mt-1 font-semibold text-slate-900">
            {request.category}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Priority
          </p>
          <span className="mt-1 inline-block rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
            {request.priority}
          </span>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Status
          </p>
          <span className="mt-1 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {request.status}
          </span>
        </div>

      </div>

      {/* Description */}
      <div className="border-b border-slate-100 py-6">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Description
        </h3>

        <p className="leading-7 text-slate-600">
          {request.description}
        </p>
      </div>

      {/* Attachments */}
      <div className="py-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Attachments
        </h3>

        {request.attachments && request.attachments?.map((file, index) => (
          <div key={index} className="mb-3">
            <FilePreview key={index} file={file} />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">

        <button
          onClick={handleDelete}
          className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Delete Request
        </button>

        <Link
          to={`/update-request/${request?._id}`}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
        >
          Update Request
        </Link>

      </div>

    </div>
  </div>
</div>
    )
}

export default RequestDetails