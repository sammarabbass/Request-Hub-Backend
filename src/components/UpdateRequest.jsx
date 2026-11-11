import { useState } from "react";
import { updateReqest } from "../api/request";
import { useNavigate, useParams } from "react-router-dom";


const UpdateRequest = () => {
  const { id } = useParams()
  const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "",
      })
const handleSubmit=async(e)=>{
    e.preventDefault()
try{
    setLoading(true)

const res=await updateReqest(id,form)
setForm(res?.data)
alert("request updated")
navigate('/dashboard')
} catch (error) {
      // alert(error.response?.data?.message || "Request Denied");
        console.log(error.message);
        
    } finally {
      setLoading(false);
    }

}

	return(
<>
  <div className="min-h-screen bg-slate-50">

    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Service Hub
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          Update Service Request
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update the details of your service request.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Request Title
            </label>

            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Enter request title"
              value={form.title || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows="6"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Describe your service request..."
              value={form.description || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Priority */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Priority
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={form.priority || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value,
                })
              }
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
            </select>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "creating" : "Create Request"}
          </button>

        </form>
      </div>
    </div>
  </div>
    </>
    )
};

export default UpdateRequest;
