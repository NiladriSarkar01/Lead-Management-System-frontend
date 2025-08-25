import React, { useState } from "react";
import { Range } from "react-range";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function LeadFilterNavbar({ onApply }) {
  const enumSources = ["website", "facebook_ads", "google_ads", "referral", "events", "other"];
  const enumStatuses = ["new", "contacted", "qualified", "lost", "won"];

  const [filters, setFilters] = useState({
    status: undefined,
    source: undefined,
    score: {
      min:0,
      max:100
    },
    lead_value: {
      min:0,
      max:100000
    },
    created_at: { startDate: new Date("2024-12-31T00:00:00.000Z"), endDate: new Date(), key: "created_at" },
    last_activity_at: { startDate: new Date("2024-12-31T00:00:00.000Z"), endDate: new Date(), key: "last_activity_at" },
    is_qualified: undefined,
  });

  const [showScore, setShowScore] = useState(false);
  const [showLeadValue, setShowLeadValue] = useState(false);
  const [showCreatedRange, setShowCreatedRange] = useState(false);
  const [showLastActivityRange, setShowLastActivityRange] = useState(false);

  const applyFilters = () => {
    onApply(filters);
  };

  return (
    <div className="w-full bg-white shadow-sm border rounded-lg px-3 py-2 flex flex-wrap items-center gap-4 relative">
      {/* Status */}
      <select
        value={filters.status}
        onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
        className="px-2 py-1 border rounded-md text-xs hover:border-blue-500 transition"
      >
        <option value="">Status</option>
        {enumStatuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Source */}
      <select
        value={filters.source}
        onChange={(e) => setFilters((p) => ({ ...p, source: e.target.value }))}
        className="px-2 py-1 border rounded-md text-xs hover:border-blue-500 transition"
      >
        <option value="">Source</option>
        {enumSources.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Score (Dropdown with Range) */}
      <div className="relative text-xs">
        <button
          onClick={() => setShowScore((p) => !p)}
          className="px-2 py-1 border rounded-md hover:border-blue-500 transition"
        >
          Score: {filters.score.min} - {filters.score.max}
        </button>
        {showScore && (
          <div className="absolute z-50 bg-white shadow-lg rounded mt-2 p-4 w-64">
            <Range
              step={1}
              min={0}
              max={100}
              values={[filters.score.min, filters.score.max]}
              onChange={(values) => setFilters((p) => ({ ...p, score: {
                min:values[0],
                max:values[1]
              } }))}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 bg-gray-200 rounded relative"
                  style={{ ...props.style }}
                >
                  <div
                    className="absolute h-1 bg-blue-500 rounded"
                    style={{
                      left: `${(filters.score.min / 100) * 100}%`,
                      right: `${100 - (filters.score.max / 100) * 100}%`,
                    }}
                  />
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-blue-600 rounded-full shadow cursor-pointer"
                />
              )}
            />
          </div>
        )}
      </div>

      {/* Lead Value (Dropdown with Range) */}
      <div className="relative text-xs">
        <button
          onClick={() => setShowLeadValue((p) => !p)}
          className="px-2 py-1 border rounded-md hover:border-green-500 transition"
        >
          Value: {filters.lead_value.min} - {filters.lead_value.max}
        </button>
        {showLeadValue && (
          <div className="absolute z-50 bg-white shadow-lg rounded mt-2 p-4 w-72">
            <Range
              step={500}
              min={0}
              max={100000}
              values={[filters.lead_value.min, filters.lead_value.max]}
              onChange={(values) => setFilters((p) => ({ ...p, lead_value: {
                min:values[0],
                max:values[1]
              } }))}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 bg-gray-200 rounded relative"
                  style={{ ...props.style }}
                >
                  <div
                    className="absolute h-1 bg-green-500 rounded"
                    style={{
                      left: `${(filters.lead_value.min / 100000) * 100}%`,
                      right: `${100 - (filters.lead_value.max / 100000) * 100}%`,
                    }}
                  />
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-green-600 rounded-full shadow cursor-pointer"
                />
              )}
            />
          </div>
        )}
      </div>

      {/* Created At Range Picker */}
      <div className="relative text-xs">
        <button
          onClick={() => setShowCreatedRange((p) => !p)}
          className="px-2 py-1 border rounded-md hover:border-blue-500 transition"
        >
          Created Between: {filters.created_at.startDate.toLocaleDateString()} -{" "}
          {filters.created_at.endDate.toLocaleDateString()}
        </button>
        {showCreatedRange && (
          <div className="absolute z-50 bg-white shadow-lg rounded mt-2">
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={[filters.created_at]}
              onChange={(item) => setFilters((p) => ({ ...p, created_at: item.created_at }))}
            />
          </div>
        )}
      </div>

      {/* Last Activity Range Picker */}
      <div className="relative text-xs">
        <button
          onClick={() => setShowLastActivityRange((p) => !p)}
          className="px-2 py-1 border rounded-md hover:border-blue-500 transition"
        >
          Last Activity Between: {filters.last_activity_at.startDate.toLocaleDateString()} -{" "}
          {filters.last_activity_at.endDate.toLocaleDateString()}
        </button>
        {showLastActivityRange && (
          <div className="absolute z-50 bg-white shadow-lg rounded mt-2">
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={[filters.last_activity_at]}
              onChange={(item) =>
                setFilters((p) => ({ ...p, last_activity_at: item.last_activity_at }))
              }
            />
          </div>
        )}
      </div>

      {/* Qualified */}
      <select
        value={filters.is_qualified}
        onChange={(e) => setFilters((p) => ({ ...p, is_qualified: e.target.value }))}
        className="px-2 py-1 border rounded-md text-xs hover:border-blue-500 transition"
      >
        <option value="">Qualified?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="ml-auto px-4 py-1 bg-blue-600 text-white text-xs rounded-md shadow-sm hover:bg-blue-700 active:scale-95 transition"
      >
        Apply
      </button>
    </div>
  );
}
