import React, { useState } from "react";
import { createRequest } from "../api/request";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CreateRequest = () => {
  const [form, setForm] = useState({
    title: "",
    category: "Hardware",
    description: "",
    priority: "MEDIUM",
  });

  const navigate=useNavigate()
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("priority", form.priority);
    files.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      setLoading(true);
          await createRequest(formData);
      // alert("Request Created Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      
      alert(error.response?.data?.message || "Request Denied");
    } finally {
      setLoading(false);
    }
  };
  return (
   <div className="min-h-screen bg-slate-50">
  <Navbar />

  <div className="flex justify-center px-4 py-12">
    <div className="w-full max-w-3xl">
      
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Service Hub
        </p>

        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Create Service Request
        </h1>

        <p className="mt-2 text-slate-500">
          Tell us what you need and our team will help you resolve it.
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
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Enter your service request title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Category
            </label>

            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option>Hardware</option>
              <option>Software</option>
              <option>Network</option>
              <option>Account</option>
              <option>Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows="6"
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="Describe your problem or service requirement..."
              value={form.description}
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
              value={form.priority}
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

          {/* Files */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Attach Files
            </label>

            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50">
              <input
                type="file"
                multiple
                className="mx-auto block w-full text-sm text-slate-500"
                onChange={(e) => setFiles(Array.from(e.target.files))}
              />

              <p className="mt-2 text-xs text-slate-400">
                Attach screenshots, documents, or other relevant files.
              </p>
            </div>
          </div>

          {/* Submit */}
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
</div>
  );
};

export default CreateRequest;
