import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLeadStore } from "../store/useLeadStore";
import { useNavigate } from "react-router-dom";

export default function UpdateForm() {

    const { updateLead, isLeadsLoading } = useLeadStore();
    const navigate = useNavigate();
    const { selectedLead } = useLeadStore();
    

  const [formData, setFormData] = useState({});


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
    const res = await updateLead(selectedLead._id.toString(), formData);
    if(res.success){
      setMessage({ type: "success", text: res.message });
    }else{
      setMessage({ type: "error", text: "Something went wrong!" });
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
          Update Lead
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
            { label: "First Name", name: "first_name", type: "text", placeholder: selectedLead.first_name },
            { label: "Last Name", name: "last_name", type: "text", placeholder: selectedLead.last_name },
            { label: "Email", name: "email", type: "email", value:  selectedLead.email, disabled:true },
            { label: "Phone", name: "phone", type: "text", placeholder: selectedLead.phone },
            { label: "Company", name: "company", type: "text", placeholder: selectedLead.company },
            { label: "City", name: "city", type: "text", placeholder: selectedLead.city },
            { label: "State", name: "state", type: "text", placeholder: selectedLead.state },
            { label: "Score (0-100)", name: "score", type: "number", min: 0, max: 100, placeholder: selectedLead.score },
            { label: "Lead Value", name: "lead_value", type: "number", placeholder: selectedLead.lead_value },
            { label: "Last Activity At", name: "last_activity_at", type: "datetime-local", placeholder: selectedLead.last_activity_at },
          ].map(({ label, name, type, disabled, ...rest }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                {...rest}
                disabled = {disabled}
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
              <option value="">{ selectedLead.source }</option>
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
              <option value="">{ selectedLead.status }</option>
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
              name="is_qualified"
              checked={formData.is_ualified}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Is Qualified</label>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={isLeadsLoading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLeadsLoading ? "Submitting..." : "Update Lead"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
