import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLeadStore } from "../store/useLeadStore";

export default function CreateLeadPage() {

    const { createLead, isLeadsLoading } = useLeadStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "",
    status: "",
    score: 0,
    leadValue: 0,
    lastActivityAt: "",
    isQualified: false,
  });


    

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await createLead(formData);
    const data = res
    
    if(data.success){
      setMessage({ type: "success", text: data.message });
      setFormData({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "",
    status: "",
    score: 0,
    leadValue: 0,
    lastActivityAt: "",
    isQualified: false,
  })
    }else{
      setMessage({ type: "error", text: data.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Lead
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm font-medium text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", name: "firstName", type: "text", required: true, placeholder: "John" },
            { label: "Last Name", name: "lastName", type: "text", required: true, placeholder: "Doe" },
            { label: "Email", name: "email", type: "email", required: true, placeholder: "example@gmail.com" },
            { label: "Phone", name: "phone", type: "text", placeholder: "0123456789" },
            { label: "Company", name: "company", type: "text", placeholder: "abc pvt ltd." },
            { label: "City", name: "city", type: "text", placeholder: "Kolkata" },
            { label: "State", name: "state", type: "text", placeholder: "West Bengal" },
            { label: "Score (0-100)", name: "score", type: "number", min: 0, max: 100, placeholder: "50" },
            { label: "Lead Value", name: "leadValue", type: "number" },
            { label: "Last Activity At", name: "lastActivityAt", type: "datetime-local" },
          ].map(({ label, name, type, ...rest }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                {...rest}
                className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          ))}

          {/* Source */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Source</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Source</option>
              {["website", "facebook_ads", "google_ads", "referral", "events", "other"].map(
                (opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Status</option>
              {["new", "contacted", "qualified", "lost", "won"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Is Qualified */}
          <div className="flex items-center space-x-2 md:col-span-2">
            <input
              type="checkbox"
              name="isQualified"
              checked={formData.isQualified}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Is Qualified</label>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Create Lead"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
