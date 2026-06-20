"use client";

import { useClinic } from "../context/ClinicContext";

export default function SettingsCard() {
  const { state, setState, resetQueue } = useClinic();

  const handleAvgTimeChange = (e) => {
    const value = Number(e.target.value);

    setState((prev) => ({
      ...prev,
      avgTime: value,
    }));
  };

  const handleNextTokenChange = (e) => {
    const value = Number(e.target.value);

    setState((prev) => ({
      ...prev,
      nextToken: value,
    }));
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="text-sm font-semibold uppercase text-slate-500 mb-4">
        Settings
      </h3>

      <div className="space-y-4">
        {/* Avg Consultation Time */}
        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-600">
            Avg. Consultation Time
          </label>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="60"
              value={state.avgTime}
              onChange={handleAvgTimeChange}
              className="w-20 border rounded-lg px-2 py-1 text-center font-light text-black"
            />
            <span className="text-sm text-slate-500">
              min
            </span>
          </div>
        </div>

        {/* Next Token */}
        {/* <div className="flex items-center justify-between">
          <label className="text-sm text-slate-600">
            Next Token #
          </label>

          <input
            type="number"
            min="1"
            value={state.nextToken}
            onChange={handleNextTokenChange}
            className="w-20 border rounded-lg px-2 py-1 text-center font-light text-black"
          />
        </div> */}

        {/* Reset Queue */}
        <div className="pt-4 border-t flex items-center justify-between">
          <button
            onClick={resetQueue}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
          >
            Reset Queue
          </button>

          <span className="text-xs text-slate-500">
            Clears all patients
          </span>
        </div>
      </div>
    </div>
  );
}